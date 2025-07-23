# Gen AI App - Authentication System

A Next.js application with a complete authentication system including signup, login, and profile management APIs using PostgreSQL and JWT tokens.

## Features

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Profile management (view and update)
- ✅ PostgreSQL database integration
- ✅ TypeScript support
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: JWT tokens, bcrypt for password hashing
- **Database Client**: pg (node-postgres)

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Valentina Studio (for database management)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. **Create PostgreSQL Database**
   ```sql
   CREATE DATABASE gen_ai_app;
   ```

2. **Run Database Schema**
   - Open Valentina Studio
   - Connect to your PostgreSQL database
   - Execute the SQL commands from `database/schema.sql`

   Or run via command line:
   ```bash
   psql -U postgres -d gen_ai_app -f database/schema.sql
   ```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=gen_ai_app
DB_PASSWORD=your_actual_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Profile Management

#### GET `/api/profile`
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "User bio",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT `/api/profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "name": "John Updated",
  "bio": "Updated bio",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "name": "John Updated",
    "email": "john@example.com",
    "bio": "Updated bio",
    "avatar_url": "https://example.com/new-avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Database Schema

The application uses a single `users` table with the following structure:

```sql
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication with configurable expiration
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Protection**: Using parameterized queries with pg library
- **CORS Protection**: Built-in Next.js CORS protection

## File Structure

```
gen_ai_app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── signup/
│   │   │       └── route.ts
│   │   └── profile/
│   │       └── route.ts
│   ├── login/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── types.ts
├── database/
│   └── schema.sql
├── config/
│   └── database.ts
└── package.json
```

## Development

### Adding New Features

1. **New API Routes**: Create new files in `app/api/`
2. **Database Changes**: Update `database/schema.sql`
3. **Type Definitions**: Add to `lib/types.ts`
4. **Authentication**: Use the existing auth utilities in `lib/auth.ts`

### Testing

The application includes proper error handling and validation. Test the following scenarios:

- User registration with valid/invalid data
- User login with correct/incorrect credentials
- Profile access with valid/invalid tokens
- Profile updates with various data types

## Production Deployment

1. **Environment Variables**: Update all environment variables for production
2. **Database**: Use a production PostgreSQL instance
3. **JWT Secret**: Generate a strong, unique JWT secret
4. **HTTPS**: Ensure all communications use HTTPS
5. **Database Backups**: Set up regular database backups

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env.local`
   - Ensure database exists

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper Authorization header format

3. **CORS Issues**
   - Next.js handles CORS automatically
   - Check if requests are coming from allowed origins

## License

This project is open source and available under the MIT License.
