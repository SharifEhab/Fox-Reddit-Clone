import appError from '../utils/appError';
import CommunityModel, { Community, CommunityRule, removalReason } from '../model/community.model';
import { Post } from '../model/posts.model';
import { findUserById } from './user.service';
import { findPostById } from './post.service';
import { findCommentById } from './comment.service';
import UserModel from '../model/user.model';

/**
 * Finds a community by its subreddit name.
 *
 * @param {string} name - The subreddit name to search for.
 * @return {Promise<any>} The community object found based on the subreddit name.
 */
export async function findCommunityByName(name: string) {
  try {
    return await CommunityModel.findOne({ name: name });
  } catch (error) {
    console.error('Error in findCommunityByName:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

/**
 * Fetches communities based on the provided array of community IDs.
 *
 * @param {string[]} commIDs - An array of community IDs.
 * @return {Promise<any[]>} A promise that resolves to an array of populated communities.
 */
export async function getUserCommunities(commIDs: string[]) {
  // Fetch communities based on the provided commIDs
  const communities = await CommunityModel.find({ _id: { $in: commIDs } });

  // Return the populated communities
  return communities;
}
/**
 * Finds a comment by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findCommunityByID(id: string) {
  return CommunityModel.findById(id);
}

/**
 * Create subreddit
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function createSubreddit(communityName: string, privacyType: string, over18: boolean, userID: string) {
  const user = await findUserById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!user.canCreateSubreddit) {
    return {
      status: false,
      error: 'this user cannot create subreddit',
    };
  }
  const result = await availableSubreddit(communityName);

  if (!result.state) {
    return {
      errorType: 0,
      status: false,
      error: 'subreddit is already made',
    };
  }
  const moderator = {
    userID: userID,
    role: 'creator',
  };
  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
    },
    isBanned: {
      value: false,
    },
  };

  const mods = [moderator];
  const mems = [memInComm];

  // Create the new community
  const new_community = new CommunityModel({
    privacyType: privacyType,
    over18: over18,
    name: communityName,
    moderators: mods,
    members: mems,
  });

  try {
    const createdCommunity = await createcomm(new_community);
    return {
      createdCommunity,
      status: true,
    };
  } catch {
    return {
      errorType: 1,
      status: false,
      error: 'operation failed',
    };
  }
}
/**
 * Check whether subreddit is available or not
 * @param {string} subreddit
 * @returns {object} {state and subreddit}
 * @function
 */
export async function availableSubreddit(subreddit: string) {
  const subre = await findCommunityByName(subreddit);
  if (subre) {
    return {
      state: false,
      subreddit: subre,
    };
  } else {
    return {
      state: true,
      subreddit: null,
    };
  }
}

/**
 * Creates a new community.
 *
 * @param {Partial<Community>} input - The partial community data to create.
 * @return {Promise<Community>} A promise that resolves to the created community.
 */
export function createcomm(input: Partial<Community>) {
  return CommunityModel.create(input);
}

/**
 * addMemberToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addMemberToCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
    },
    isBanned: {
      value: false,
    },
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $inc: { membersCnt: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * addModeratorToCom
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addModeratorToCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  const moderator = {
    userID: userID,
    role: 'moderator',
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { moderators: moderator } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function removeModeratorFromCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { moderators: { userID: userID } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function removeMemberFromCom(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    const updatedCommunity2 = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $inc: { membersCnt: -1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 * Checks if a user is banned or not in a community and performs the corresponding operation.
 *
 * @param {string} userID - The ID of the user.
 * @param {string} subreddit - The name of the subreddit.
 * @param {string} operation - The operation to perform. Possible values are 'ban' or 'unban'.
 * @return {Promise<{status: boolean, error?: string}>} - A promise that resolves to an object with the status of the operation. If the operation fails, an error message is also included.
 */
export async function updateMemberBanStatusInCommunity(userID: string, subreddit: string, operation: string) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'Community not found',
    };
  }

  const memInComm = {
    userID: userID,
    isMuted: {
      value: false,
    },
    isBanned: {
      value: operation === 'ban',
      date: new Date(),
    },
  };

  try {
    let updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { members: { userID: userID } } },
      { new: true }
    );
    updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { members: memInComm } },
      { upsert: true, new: true }
    );

    return {
      status: true,
    };
  } catch (error) {
    console.error('Error updating member ban status:', error);
    return {
      status: false,
      error: 'Failed to update member ban status',
    };
  }
}
/**
 * Retrieves the users who are banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, bannedTime: Date}[]}>} - A promise that resolves to an object with the status of the operation and the banned users, if successful.
 */
export async function getUsersAsBannedInCommunity(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs and bannedTime of banned users
  const bannedUsers = community.members.filter((member) => member.isBanned?.value === true);
  const userIDs = bannedUsers.map((member) => member.userID);
  const bannedTime = bannedUsers.map((member) => member.isBanned?.date);

  // Fetch the banned users from the database, selecting specific attributes
  const users = await UserModel.find({ _id: { $in: userIDs } }).select('avatar username _id about createdAt');

  // Combine banned users with their bannedTime
  const usersWithBannedTime = users.map((user, index) => ({
    ...user.toObject(),
    bannedTime: bannedTime[index],
  }));

  return { status: true, users: usersWithBannedTime };
}
/**
 * Retrieves the IDs and roles of the moderators of a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, createdAt: Date, modRole: string}[]}>} - A promise that resolves to an object with the status of the operation and the moderators' IDs and roles, if successful.
 */
export async function getCommunityModerators(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.moderators) {
    return { status: false };
  }
  const moderators = community.moderators.filter((member) => member);
  const moderatorsIDs = moderators.map((mod) => mod.userID);
  const modRole = moderators.map((mod) => mod.role);

  const users = await UserModel.find({ _id: { $in: moderatorsIDs } }).select('avatar username _id about createdAt');

  // Combine banned users with their modRole
  const usersWithModRole = users.map((user, index) => ({
    ...user.toObject(),
    modRole: modRole[index],
  }));

  return { status: true, users: usersWithModRole };
}

/**
 * Retrieves the IDs and attributes of the users who are not banned in a community.
 *
 * @param {string} communityName - The name of the community.
 * @return {Promise<{status: boolean, users?: {avatar: string, username: string, _id: string, about: string, createdAt: Date}[]}>} - A promise that resolves to an object with the status of the operation and the not banned users' IDs and attributes, if successful.
 */
export async function getCommunityMembers(communityName: string) {
  // Find the community by name
  const community = await findCommunityByName(communityName);

  // If community is not found, return status false
  if (!community || !community.members) {
    return { status: false };
  }

  // Extract the IDs of not banned users
  const notBannedUsers = community.members.filter((member) => member.isBanned?.value !== true);
  const userIDs = notBannedUsers.map((member) => member.userID);

  // Fetch the not banned users from the database, selecting specific attributes
  const users = await UserModel.find({ _id: { $in: userIDs } }).select('avatar username _id about createdAt');

  return { status: true, users };
}

export async function editCommunityRules(subreddit: string, rules: CommunityRule[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { communityRules: rules },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function editCommunityRemovalReasons(subreddit: string, reasons: removalReason[]) {
  const community = await findCommunityByName(subreddit);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { removalReasons: reasons },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Post
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function markSpamPost(userID: string, subreddit: string, postID: string, type: string) {
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!post) {
    return {
      status: false,
      error: 'post not found',
    };
  }

  const spamPost = {
    spammerID: post.userID,
    postID: post._id,
    spamType: type,
    spamText: post.textHTML,
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { spamPosts: spamPost } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Comment
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function markSpamComment(userID: string, subreddit: string, commentID: string, type: string) {
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!comment) {
    return {
      status: false,
      error: 'comment not found',
    };
  }

  const spamComment = {
    spammerID: comment.authorId,
    postID: comment.postID,
    commentID: comment._id,
    spamType: type,
    spamText: comment.textHTML,
  };

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { spamComments: spamComment } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function approveSpamPost(postID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const post = await findPostById(postID);

  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }

  if (!post) {
    return {
      status: false,
      error: 'post not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { spamPosts: { postID: post._id } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

export async function approveSpamComment(commentID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const comment = await findCommentById(commentID);

  if (!community) {
    return {
      status: false,
      error: 'community not found',
    };
  }

  if (!comment) {
    return {
      status: false,
      error: 'comment not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $pull: { spamComments: { commentID: comment._id } } },
      { new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}

/**
 *  mark Spam Post
 * @param {string} body contain rules details
 * @param {string} user user information
 * @return {Object} state
 * @function
 */
export async function addUserToPending(userID: string, subreddit: string) {
  const community = await findCommunityByName(subreddit);
  const user = await UserModel.findById(userID);

  if (!user) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  if (!community) {
    return {
      status: false,
      error: 'user not found',
    };
  }

  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      community._id,
      { $addToSet: { pendingMembers: user._id } },
      { upsert: true, new: true }
    );
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
  return {
    status: true,
  };
}
