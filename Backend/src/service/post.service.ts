import appError from '../utils/appError';
import PostModel, { Post } from '../model/posts.model';
import UserModel, { User } from '../model/user.model';
import { DocumentType, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { findCommunityByName } from './community.service';
import { QueryOptions } from 'mongoose';
import { shuffle } from 'lodash';
/**
 * Creates a new post.
 *
 * @param input - The post data to create.
 * @returns A promise that resolves to the created user.
 */
export function createPost(input: Partial<Post>) {
  return PostModel.create(input);
}
/**
 * Finds a post by their ID.
 *
 * @param id - The ID of the post to find.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export function findPostById(id: string) {
  return PostModel.findById(id);
}

// export async function findPostsByCommunity(community: string): Promise<Post[]> {
//   try {
//     const communityObject = await findCommunityByName(community);

//     const posts = await PostModel.aggregate([
//       // Match documents by the community ID
//       { $match: { communities: communityObject?.id } },
//       // Sample documents randomly
//       { $sample: { size: 10 } }, // Adjust the size as needed
//     ]).exec();

//     return posts;
//   } catch (error) {
//     throw new Error('Error finding posts by community');
//   }
// }

/**
 * Finds the top posts from a specified community.
 *
 * @param community - The name of the community to find the top posts for.
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The number of posts to skip (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the top posts from the specified community.
 * @throws Error if the community is not found or if there is an error finding the top posts.
 */
export async function findBestPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { bestFactor: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the best posts by random.
 *
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The total count of posts (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the best posts.
 * @throws Error if there is an error finding the posts.
 */
export async function findBestPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { bestFactor: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({}, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the top posts from a specified community.
 *
 * @param community - The name of the community to find the top posts for.
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The number of posts to skip (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the top posts from the specified community.
 * @throws Error if the community is not found or if there is an error finding the top posts.
 */
export async function findHotPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { hotnessFactor: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the hot posts by random.
 *
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The total count of posts (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the hot posts.
 * @throws Error if there is an error finding the posts.
 */
export async function findHotPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { hotnessFactor: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({}, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the top posts from a specified community.
 *
 * @param community - The name of the community to find the top posts for.
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The number of posts to skip (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the top posts from the specified community.
 * @throws Error if the community is not found or if there is an error finding the top posts.
 */
export async function findNewPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { createdAt: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the newest posts by random.
 *
 * @param limit The maximum number of posts to retrieve. Default is 10.
 * @param page The page number of the posts to retrieve. Default is 1.
 * @param count The total count of posts. Default is 0.
 * @returns A promise that resolves to an array of Post objects representing the newest posts.
 * @throws Error if there is an error finding the posts.
 */
export async function findNewPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { createdAt: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({}, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the top posts from a specified community.
 *
 * @param community - The name of the community to find the top posts for.
 * @param limit - The maximum number of posts to retrieve (default is 10).
 * @param page - The page number of the results to retrieve (default is 1).
 * @param count - The number of posts to skip (default is 0).
 * @returns A promise that resolves to an array of Post objects representing the top posts from the specified community.
 * @throws Error if the community is not found or if there is an error finding the top posts.
 */
export async function findTopPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    const queryOptions: QueryOptions = { sort: { votesCount: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({ communities: communityObject?.id }, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds the top posts by random.
 *
 * @param limit The maximum number of posts to retrieve. Default is 10.
 * @param page The page number of the posts to retrieve. Default is 1.
 * @param count The total count of posts. Default is 0.
 * @returns A promise that resolves to an array of Post objects representing the top posts.
 * @throws Error if there is an error finding the posts by community.
 */
export async function findTopPostsByRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = { sort: { votesCount: -1 } };

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Apply skip and limit
    queryOptions.skip = skip;
    queryOptions.limit = limit;

    const posts = await PostModel.find({}, null, queryOptions).exec();

    return posts;
  } catch (error) {
    throw new Error('Error finding posts by community');
  }
}

/**
 * Finds random posts from a specified community.
 *
 * @param community - The name of the community.
 * @param limit - The maximum number of posts to return (default: 10).
 * @param page - The page number of the results (default: 1).
 * @param count - The number of posts to skip (default: 0).
 * @returns A promise that resolves to an array of Post objects.
 * @throws Error if the community is not found or if there is an error finding the random posts.
 */
export async function findRandomPostsByCommunity(
  community: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const communityObject = await findCommunityByName(community);

    if (!communityObject) {
      throw new Error('Community not found');
    }

    // Find posts that belong to the specified community
    const posts = await PostModel.find({ communities: communityObject.id });

    // Shuffle the array of posts
    let shuffledPosts = shuffle(posts);

    // Apply count as skip (offset)
    if (count > 0) {
      shuffledPosts = shuffledPosts.slice(count);
    }

    // Calculate the start index based on the page number and limit
    const startIndex = (page - 1) * limit;

    // Check if the start index exceeds the total number of records
    if (startIndex >= shuffledPosts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the shuffled array with the specified limit and start index
    return shuffledPosts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding random posts by community');
  }
}

/**
 * Retrieves a list of random posts up to the specified limit, with optional pagination.
 *
 * @param limit - The maximum number of posts to retrieve. Defaults to 10.
 * @param page - The page number to retrieve (for pagination). Defaults to 1.
 * @param count - The total number of posts (for pagination). Defaults to 0.
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function findRandomPostsByRandom(
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  try {
    const queryOptions: QueryOptions = {};

    // Apply count as skip (offset)
    if (count > 0) {
      queryOptions.skip = count;
    }

    // Calculate the start index based on the page number and limit
    const startIndex = (page - 1) * limit;

    // Apply limit if provided
    if (limit > 0) {
      queryOptions.limit = limit;
    }

    // Randomly sample the posts
    const posts = await PostModel.aggregate([
      { $sample: { size: limit } }, // Randomly sample 'limit' number of documents
    ]).exec();

    // Check if the start index exceeds the total number of records
    if (startIndex >= posts.length) {
      return []; // Return an empty array if there are no more records
    }

    // Return a slice of the posts array with the specified limit and start index
    return posts.slice(startIndex, startIndex + limit);
  } catch (error) {
    throw new Error('Error finding random posts randomly');
  }
}

/**
 * Retrieves a list of posts based on the provided post IDs, with an optional limit.
 *
 * @param postIDs - An array of post IDs to retrieve.
 * @param limit - The maximum number of posts to retrieve. If not provided, defaults to 10.
 * @returns A Promise that resolves to an array of `Post` objects.
 */
async function userPosts(postIDs: string[], limit: number | undefined) {
  // If the request didn't contain a limit in its query, set it to 10 by default
  limit = limit || 10;

  // Fetch comments based on the provided postIDs
  const posts = await PostModel.find({ _id: { $in: postIDs } }).limit(limit);

  // Populate user and community information
  //posts = await PostModel.populate(posts, { path: 'userID', select: '_id avatar' });
  //posts = await PostModel.populate(posts, { path: 'communityID', select: '_id icon' });

  // Return the populated posts
  return posts;
}
export { userPosts };

/**
 * Retrieves a list of best posts from the specified subreddit.
 *
 * @param subreddit - The name of the subreddit to retrieve best posts from.
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getBestPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const bestPosts = await findBestPostsByCommunity(subreddit, limit, page, count);
  return bestPosts;
}

/**
 * Retrieves a list of best posts from a random subreddit.
 *
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getBestPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const bestPosts = await findBestPostsByRandom(limit, page, count);
  return bestPosts;
}

/**
 * Retrieves a list of hot posts from the specified subreddit.
 *
 * @param subreddit - The name of the subreddit to retrieve hot posts from.
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getHotPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const hotPosts = await findHotPostsByCommunity(subreddit, limit, page, count);
  return hotPosts;
}

/**
 * Retrieves a list of hot posts from a random subreddit.
 *
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getHotPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const hotPosts = await findHotPostsByRandom(limit, page, count);
  return hotPosts;
}

/**
 * Retrieves a list of new posts from the specified subreddit.
 *
 * @param subreddit - The name of the subreddit to retrieve new posts from.
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getNewPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const newPosts = await findNewPostsByCommunity(subreddit, limit, page, count);
  return newPosts;
}

/**
 * Retrieves a list of new posts from a random subreddit.
 *
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getNewPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const newPosts = await findNewPostsByRandom(limit, page, count);
  return newPosts;
}

/**
 * Retrieves a list of top posts from the specified subreddit.
 *
 * @param subreddit - The name of the subreddit to retrieve top posts from.
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getTopPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const topPosts = await findTopPostsByCommunity(subreddit, limit, page, count);
  return topPosts;
}

/**
 * Retrieves a list of top posts from a random subreddit.
 *
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getTopPostsFromRandom(limit: number = 10, page: number = 1, count: number = 0): Promise<Post[]> {
  const topPosts = await findTopPostsByRandom(limit, page, count);
  return topPosts;
}

/**
 * Retrieves a list of random posts from the specified subreddit.
 *
 * @param subreddit - The name of the subreddit to retrieve posts from.
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getRandomPostsFromSubreddit(
  subreddit: string,
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const randomPosts = await findRandomPostsByCommunity(subreddit, limit, page, count);
  return randomPosts;
}

/**
 * Retrieves a list of random posts.
 *
 * @param limit - The maximum number of posts to retrieve.
 * @param page - The page number to retrieve (for pagination).
 * @param count - The total number of posts (for pagination).
 * @returns A Promise that resolves to an array of `Post` objects.
 */
export async function getRandomPostsFromRandom(
  limit: number = 10,
  page: number = 1,
  count: number = 0
): Promise<Post[]> {
  const randomPosts = await findRandomPostsByRandom(limit, page, count);
  return randomPosts;
}
