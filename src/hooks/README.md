# Custom Hooks

This directory contains custom React hooks for managing API operations and state.

## Available Hooks

### `usePosts`
Manages posts data and operations including fetching and creating posts.

**Usage:**
```javascript
import { usePosts } from '../hooks';

const { 
  posts, 
  loading, 
  fetchPosts, 
  createPost 
} = usePosts();
```

**Returns:**
- `posts` - Array of posts (empty array if error occurs)
- `loading` - Loading state
- `fetchPosts()` - Function to fetch all posts
- `createPost(postData)` - Function to create a new post

### `useComments`
Manages comments data for a specific post.

**Usage:**
```javascript
import { useComments } from '../hooks';

const { 
  comments, 
  loading, 
  fetchComments 
} = useComments();
```

**Returns:**
- `comments` - Array of comments (empty array if error occurs)
- `loading` - Loading state
- `fetchComments(postId)` - Function to fetch comments for a post

## API Endpoints Used

- `GET /posts` - Fetch all posts
- `GET /comments?postId=:id` - Fetch comments for a post
- `POST /posts` - Create new post

## Benefits

- **Separation of Concerns**: API logic is separated from UI components
- **Reusability**: Hooks can be used across multiple components
- **Consistency**: Standardized loading states and data handling
- **Maintainability**: Centralized API operations for easier updates
- **Testing**: Easier to test API logic in isolation
- **User-Friendly**: Always displays data in cards, even on errors

## Data Handling

All hooks follow a consistent pattern:
- **Success**: Data is returned normally
- **Error**: Empty array is returned (displayed as "no data found")
- **Loading**: Loading state is managed automatically
- **UI**: Data is always displayed in DataCard components 