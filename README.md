# Share Prompt

Share Prompt is a web application that allows users to share their creative prompts and browse other users' prompts. Users can log in by Google account or GitHub account, create a post with a tag, view all posts and search them by username, tag, or prompt, update their posts later, and copy the prompt of any post to their clipboard. Feel free to visist the website (https://share-prompt-hhwypat1j-ahmed-mahmouds-projects.vercel.app/)

## Technologies

This project is built with the following technologies:

- Next.js: A React framework for building fast and scalable web applications.
- Tailwind: A utility-first CSS framework for rapid UI development.
- Next-Auth: A library for implementing authentication and authorization in Next.js applications.
- TypeScript: A superset of JavaScript that adds static type checking and other features.
- MongoDB: A document-based database for storing and querying data.
- Mongoose: An object data modeling (ODM) library for MongoDB and Node.js.

## Installation

To run this project locally, you need to have Node.js, npm, and MongoDB installed on your machine. Then, follow these steps:

1. Clone this repository: `git clone https://github.com/ahmedmahmoud/share-prompt.git`
2. Navigate to the project directory: `cd share-prompt`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following environment variables:

- NEXTAUTH_URL
- NEXTAUTH_URL_INTERNAL
- NEXTAUTH_SECRET
- MONGODB_URI
- AUTH0_ISSUER
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET

5. Start the development server: `npm start`
6. Open your browser and go to `http://localhost:3000`

## Usage

Once you have the project running, you can use the following features:

- Log in with Google or GitHub by clicking on the "Log in" button on the top right corner of the homepage.
- Create a new post by clicking on the "create Post" button on the top right corner of the homepage. You can enter a prompt and a tag for your post.
- View all posts by scrolling down the homepage. You can see the prompt, the tag, the username, and the user email.
- Search posts by username, tag, or prompt by entering a keyword in the search bar. You can also filter posts by tag by clicking on the tag name below the prompts.
- Update your posts by clicking on the "Edit" button on the bottom your post in the profile. You can modify the prompt and the tag of your post.
- Delete your posts by clicking on the "Delete" button on the bottom your post in the profile. 
- Copy the prompt of any post to your clipboard by clicking on the "Copy" icon on the top right corner of the post.
- Log out by clicking on the "Log out" button on the top right corner of the homepage.


## Demo

https://github.com/AhmedMahmoudAbdelfatah/share-prompt/assets/92806885/6168b03f-8062-4242-ac5e-0922ca298119






