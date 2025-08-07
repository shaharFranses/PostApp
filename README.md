# React Posts App

A React application that fetches data from JSONPlaceholder API and implements CRUD functionality for posts.

## Features

**Display Posts**: Fetch and display posts in a responsive card layout
 **View Post Details**: Click on posts to view details with comments
 **Search/Filter**: Filter posts by title with real-time search
 **Add New Post**: Create new posts with title and body
 **Responsive Design**: Works on desktop and mobile
 **Loading States**: Professional loading indicators
 **Error Handling**: Graceful error display
 **Modern UI**: Material-UI components with custom styling

## Technologies Used

- React 19
- Material-UI (MUI)
- React Router
- Axios
- CSS3

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shaharFranses/PostApp.git
cd PostApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── MainPage/
│   │   ├── MainPage.jsx
│   │   └── MainPage.css
│   ├── SinglePostPage/
│   │   ├── SinglePostPage.jsx
│   │   └── SinglePostPage.css
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.css
│   ├── NewPostForm/
│   │   ├── NewPostForm.jsx
│   │   └── NewPostForm.css
│   └── CustomButton/
│       ├── CustomButton.jsx
│       └── CustomButton.css
├── App.jsx
└── index.js
```

## API Endpoints Used

- `GET https://jsonplaceholder.typicode.com/posts` - Fetch all posts
- `GET https://jsonplaceholder.typicode.com/posts/{id}` - Fetch single post
- `GET https://jsonplaceholder.typicode.com/comments?postId={id}` - Fetch post comments
- `POST https://jsonplaceholder.typicode.com/posts` - Create new post

## Features Explained

### Main Page
- Displays all posts in a responsive grid
- Search bar to filter posts by title
- "Create New Post" button to add new posts
- Loading states and error handling

### Single Post Page
- Shows full post details
- Displays all comments for the post
- Back navigation to main page

### Search Functionality
- Real-time filtering of posts by title
- Client-side search for fast performance
- "No posts found" message when no results

### Add New Post
- Inline form that appears on main page
- Success feedback with green button state
- Form validation and error handling



## Available Scripts
- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production

