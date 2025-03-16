Business Card App
Full-stack application for managing business cards with user authentication, MongoDB storage, and React frontend.

Project Structure
The project is divided into two main parts:

Server (Backend)
Node.js with Express
MongoDB database using Mongoose
JWT authentication
RESTful API endpoints
Client (Frontend)
React with TypeScript
Formik & Yup for form validation
React Router for navigation
Bootstrap & custom styling
Axios for API requests
Features
User Management: Registration, login, and authentication
Card Operations: Create, read, update, and delete business cards
Like System: Users can like/unlike cards
Filtering: Search and filter cards by different criteria
Responsive Design: Works on desktop and mobile devices
API Endpoints
Users
POST /api/bcards/users/register - Register a new user
POST /api/bcards/users/login - User login
GET /api/bcards/users/me - Get logged-in user info
Cards
GET /api/bcards/cards - Get all cards
GET /api/bcards/cards/my-cards - Get user's own cards
POST /api/bcards/cards - Create new card
PUT /api/bcards/cards/:id - Update a card
DELETE /api/bcards/cards/:id - Delete a card
PATCH /api/bcards/cards/:id - Like/unlike a card
Setup Instructions
Prerequisites
Node.js (v14+)
MongoDB (local or Atlas)
Git
