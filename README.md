# Cairo University Faculty of Engineering Software Project - Fox

# Fox: A Reddit Clone

## Overview

Fox is a Reddit clone project developed as part of the Cairo University Faculty of Engineering Software Project. The project aims to create a platform similar to Reddit, accessible via web, Android, and iOS platforms.

## Team

### Team Lead
- **Nour Aldeen Hassan Khalaf**
  - **Email:** Nour.hassan1321@gmail.com
  - **Phone:** 01021297906

### Frontend
- **Team Lead:** Omar Adel
- Nadine
- Anas Alaa
- Nouran Aloui
- Mahmoud

### Backend
- **Team Lead:** Sharif Ehab
- Kariem Magdy
- Abd El Rahman Ahmed
- Yusuf Ahmed Elsayed Salama

### Cross-Platform
- **Team Lead:** Ahmed Hatem
- Omar Saied
- Mohamed Elghitany
- Mohammed Tamer
- Hosam Yasser

### DevOps
- **Lead:** Nour Aldeen

### Testing
- **Team Lead:** Youssef Mohamed Ali
- Rawan Abdelnasser

<div align="center">
<img src="https://i.ibb.co/9rVdpKn/Artboard-1-transparent-1.png" alt="Artboard-1-transparent-1" border="0">
<h1/>
</div>

<div align="center">
    <h1 align='center'><i>Fox Reddit clone backend</i></h1>
    <p>Amazing Reddit clone - A network of communities where people can dive into their interests, hobbies and passions.</p>
</div>

<details open="open">
<summary>
<h2 style="display:inline">📝 Table of Contents</h2>
</summary>

- [⛏️ Built With](#built-with)
- [🏁 Getting started](#getting-started)
- [🏁 Description](#Description)
- [📷 Features](#features)
- [🏁 API Documentation](#API-Documentation)
- [🏁 Function Documentation](#Function-Documentation)
- [✍️ Contributors](#contributors)
- [🔒 License](#license)
</details>
<hr>
<h2 href="#BuiltWith">Built With : </h2>
 <ul>
  <li><a href="https://www.w3schools.com/nodejs/">Node js</a></li>
  <li><a href="https://www.javatpoint.com/expressjs-tutorial">Express js</a></li>
  <li><a href="https://www.w3schools.in/mongodb/tutorials/">MongoDB</a></li>
   <li><a href="https://typegoose.github.io/typegoose/docs/guides/quick-start-guide">Typegoose</a></li>
  <li><a href="http://www.w3schools.me/aspnetcore/implement-jwt">JSON Web Token</a></li>
  <li><a href="https://jestjs.io/">Jest</a></li>
  <li><a href="https://tsdoc.org/">Tsdoc</a></li>
  <li><a href="https://firebase.google.com/">Firebase</a></li>
  <li><a href="https://argon2-cffi.readthedocs.io/en/stable/argon2.html">Argon2</a></li>
  <li><a href="https://sendgrid.com/en-us">SendGrid</a></li>
  <li><a href="https://eslint.org/">Eslint</a></li>
 </ul>
<hr>
<h2 href="#GettingStarted">Getting Started</h2>
<blockquote>
  <p>This is a list of needed steps to set up your project locally, to get a local copy up and running follow these instructions.
 </p>
</blockquote>
<ol>
  <li><strong><em>Clone the repository</em></strong>
    <div>
        <code>$ git clone https://github.com/CMP24-SWE-TEAM3/Backend.git</code>
    </div>
  </li>
  <li><strong><em>Navigate to project folder and create file named ".env"</em></strong>
    <div>
        <code>$ cd Backend & touch .env</code>
    </div>
  </li>
  <li><strong><em>Fill ".env" file with these data</em></strong>
    <div><blockquote> <p> 
        PORT=[PORT YOU WANT] <br>
        DATABASE=[CONNECTION STRING OF YOUR DATABASE] <br>
        JWT_SECRET_KEY=[JWT_SECRET_KEY] <br>
        JWT_EXPIRES_IN=[JWT_EXPIRES_IN] <br>
        APP_CLOUDINARY_CLOUD_NAME= [APP_CLOUDINARY_CLOUD_NAME]<br>
        APP_CLOUDINARY_API_KEY= [APP_CLOUDINARY_API_KEY]<br>
        APP_CLOUDINARY_API_SECRET= [APP_CLOUDINARY_API_SECRET]<br>
        GOOGLE_APPLICATION_CREDENTIALS= [FIREBASE CREDENTIALS]<br>
        EMAIL_FROM=[EMAIL_FROM_SENDGRID] <br></p> </blockquote>
    </div>
  </li>
  <li><strong><em>Install Node js and NPM</em></strong>
    <div>
        <h4>Follow this article to install node js and npm <a href="https://phoenixnap.com/kb/install-node-js-npm-on-windows">Install Node js and npm</a></h4>
    </div>
  </li>
  <li><strong><em>Install dependencies</em></strong>
    <div>
        <code>$ npm install</code>
    </div>
  </li>
  <li><strong><em>Start the application</em></strong>
    <div>
        <code>$ npm start:dev</code>
    </div>
  </li>

</ol>
<hr>

<h2 href="#Description">Description</h2>
<blockquote>
  <p>
  This website was implemented for Software Engineering Course 
  by a a team of 17 student, distributed into multiple small teams, Backend, Frontend, Cross-Platform, DevOps, and Testing team.
  <br>
  <br>
  It is a Clone of many features of Reddit website.
  <br>
  A social media website to enable good communication between users by creating posts with photos and markdown, communicating in public or private subreddits (communities) with multiple categories, with user system and preferences
  <br>
  <br>
  This website is developed in React js for the frontend and in Node js for the backend using MongoDB for the database, Firebase for sending notifications, and Microsoft Azure for deployment.
 </p>
</blockquote>
<hr>
<h2 href="#API-Documentation">API Documentation</h2>
<blockquote>
  <p>
  You can look on the API documentation at <a href="https://documenter.getpostman.com/view/33567666/2sA3Bn7Ybd">API Documentation</a>
  </p>
</blockquote>
<hr>

## 📷 Features

<details>
<summary>
<h4 style="display:inline">
<strong><em>🔒 User Authentication</em></strong></h4>
</summary>

- Sign up
- Login in
- Forget password
- Reset Password



 
</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 🙍‍♂️ User Profile</em></strong></h4>
</summary>

- Profile overview (posts, comments, upvotes, downvotes, etc.)
- Your Posts
- Your Comment
- Your Upvotes
- Your Downvotes
- Your Saved Posts and Comments
- Your Hidden Posts and Comments
- Your History
- Your Followers
    
 
  

</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 📰 Post</em></strong></h4>
</summary>

- Create rich text post
- Create image and video post
- Create link post
- Add spoiler to post
- Add nsfw to post
- Upvote and downvote post
- Save post
- Hide post
- Report post
- Edit post
- Delete post




    
</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 💬 Comment</em></strong></h4>
</summary>

- Create rich text comment
- Upvote and downvote comment
- Reply to comment
- Report comment




</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 🔍 Search</em></strong></h4>
</summary>
  Search results according to user(logged in or not) with proper sortings
- Search Homepage
  - Subreddit
  - Posts
  - Comments
  - People
- Search in communities
  - Posts
  - Comments

 

    
</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 📧 Messages & Notifications</em></strong></h4>
</summary>

- Notifications
  - Push notifications
  - All notifications
- Messages
  - Send a private message
  - All messages
  - Unread messages
  - Sent
  - Post replies
  - Usernames mentions
  - Delete message
  - Report message
  - Reply to message
    
 

    
</details>

<details>
<summary>
<h4 style="display:inline">
<strong><em> 🧑‍💼 Moderator</em></strong></h4>
</summary>

- Queues
  - Spam queue (posts and comments)
  - Edited queue (posts and comments)
  - Unmoderated queue (posts and comments)

- User management
  - Banned users
  - Muted user
  - Approved user
  - Moderators

- Rules and regulations
  - Add new rule
  - Edit rule
  - Delete rule
  - Reorder rules

- Community settings
  - Edit community name
  - Edit community description
  - Edit community topic
  - Edit community language
  - Edit community type (Public, Private, Restricted)
  - Edit community region
  - Enable/disable community Spoiler tag
  - Edit suggested sort for posts
  - Enable/disable image and video in posts

- Community traffic
  - Day of week
  - Month
  - Page views
  - Members joined
  - Members left



 
</details>
<h2 href="#Function-Documentation">Function Documentation</h2>
<blockquote>
  <p>
  You can look on the Function documentation by opening <code> " " </code>
  </p>
</blockquote>
<hr>

<h2 href="#Contributors">Contributors</h2>

## ✍️ Contributors

<table>
  <tr>

<td align="center">
<a href="https://github.com/abdahmed22" target="_black">
<sub><b>Abdelrahman Ahmed</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/ysalama03" target="_black">
<sub><b>Yusuf Salama</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/Karimmagdyyy" target="_black">
<sub><b>Karim Magdy</b></sub></a><br />
</td>
<td align="center">
<a href="https://github.com/SharifEhab" target="_black">
<sub><b>Sharif Ehab</b></sub></a><br />
</td>


</tr>
 </table>

### Devops
<table>
    <td align="center">
        <a href="https://github.com/nouraldeen1" target="_blank">
            <sub><b>Nour Aldeen</b></sub></a><br />
    </td>
</table>

## Acknowledgements

Submitted to: Dr. Yusuf ElGhataas & Eng. Mazen

All rights reserved © 2024 to Fox Team - Software Engineering, Cairo University


