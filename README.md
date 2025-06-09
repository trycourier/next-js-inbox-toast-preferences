# Next.js Courier Integration Example

This repository demonstrates a complete integration of Courier's notification features in a Next.js application, including:
- Real-time Inbox notifications using WebSocket connections
- Toast notifications for immediate feedback
- User preference management
- Server-side notification sending

## Features

- **Real-time Inbox**: Displays notifications in a dropdown inbox with real-time updates via WebSocket
- **Toast Notifications**: Shows immediate notifications using toast messages
- **User Preferences**: Allows users to manage their notification preferences
- **Server-side Integration**: Includes examples of sending notifications from the server
- **Authentication**: Uses JWT tokens for secure WebSocket connections and API access

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Courier React Components](https://github.com/trycourier/courier-react):
  - [@trycourier/react-provider](https://github.com/trycourier/courier-react/tree/main/packages/react-provider) - Core provider for Courier integration
  - [@trycourier/react-inbox](https://github.com/trycourier/courier-react/tree/main/packages/react-inbox) - Inbox component
  - [@trycourier/react-preferences](https://github.com/trycourier/courier-react/tree/main/packages/react-preferences) - Preferences management
  - [@trycourier/react-toast](https://github.com/trycourier/courier-react/tree/main/packages/react-toast) - Toast notifications
- [@trycourier/courier-node](https://github.com/trycourier/courier-node) - Server-side Courier integration

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── courier/      # Courier API endpoints
│   │   ├── profile/      # User profile endpoints
│   │   └── token/        # JWT token generation
│   ├── preferences/      # Preferences page
│   ├── profile/         # Profile page
│   └── send/            # Send notifications page
├── components/           # React components
│   ├── Courier/         # Courier-specific components
│   │   ├── Inbox.tsx    # Inbox component
│   │   ├── Preferences.tsx # Preferences component
│   │   └── Toast.tsx    # Toast component
│   └── CourierProviderWrapper.tsx # Courier provider setup
└── theme.tsx            # Theme configuration
```

## Setup

1. Clone the repository:
```bash
git clone git@github.com:bwebs/courier-next-js-examples.git
cd courier-next-js-examples
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Required: Your Courier API credentials
COURIER_AUTH_TOKEN=your_auth_token_here
NEXT_PUBLIC_COURIER_CLIENT_KEY=your_client_key_here
NEXT_PUBLIC_COURIER_USER_ID=user@example.com
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## WebSocket Configuration

The application uses WebSocket connections for real-time notifications. The setup includes:

1. **Token Generation**: The `/api/token` endpoint generates JWT tokens with the following scopes:
   - `user_id:{userId}` - User identification
   - `inbox:read:messages` - Permission to read inbox messages
   - `inbox:write:events` - Permission to mark messages as read
   - `realtime:connect` - Permission to establish WebSocket connections

2. **Token Expiration**: Tokens are set to expire after 24 hours for better user experience

3. **WebSocket Connection**: The CourierProvider automatically establishes a WebSocket connection to `wss://realtime.courier.com/` using the generated token

## Security Considerations

- The application uses JWT tokens for secure WebSocket connections and API access
- Tokens are generated server-side and include specific scopes for each feature
- User authentication should be implemented in a production environment
- Consider implementing token refresh mechanisms for long-running sessions

## Development Notes

- The application uses React Context and client-side components with `'use client'` directive
- WebSocket connections are managed automatically by the CourierProvider
- Server-side rendering is used for profile information and notification sending
- The application includes examples of both real-time and server-sent notifications

## Troubleshooting

If you encounter WebSocket connection issues:
1. Verify your Courier credentials in `.env.local`
2. Check the browser console for token-related errors
3. Ensure your Courier account has the necessary permissions
4. Verify that the token includes all required scopes
5. Check network connectivity to `realtime.courier.com`

## Contributing

Feel free to submit issues and enhancement requests!
