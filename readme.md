# Live Stream Secure

An Express.js server for secure live streaming of HLS video playlists and segments. This project uses AWS Cognito JWT token validation for authentication and generates signed URLs with expiration for video segments to ensure secure access. It also serves images securely with token validation.

## Features

- Secure streaming of HLS video playlists and segments
- AWS Cognito JWT token validation for user authentication
- Signed URLs for video segments with expiration to prevent unauthorized access
- Secure image serving with token validation
- Uses Helmet for security headers and CORS for cross-origin resource sharing
- Logging with Winston for monitoring and debugging
- API documentation available via Swagger UI

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd live-stream-secure
   ```

2. Install dependencies:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and configure the required environment variables (see below).

## Environment Variables

The application requires the following environment variables to be set:

| Variable                 | Description                                      |
|--------------------------|--------------------------------------------------|
| `PORT`                   | Port number for the server (default: 3000)       |
| `COGNITO_REGION`         | AWS Cognito region (e.g., us-east-1)             |
| `COGNITO_USER_POOL_ID`   | AWS Cognito User Pool ID                         |
| `COGNITO_CLIENT_ID`      | AWS Cognito App Client ID                        |
| `SEGMENT_SIGNING_SECRET` | Secret key used to sign video segment URLs       |
| `TOKE_EXPIREY`           | Token expiration time in seconds for signed URLs |

## Usage

Start the server:

```bash
npm start
```

For development with automatic restarts on file changes:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file or default to 3000.

## API Endpoints

### Video Playlist

- **GET** `/video?filePath=playlist.m3u8&auth=token`
- Requires a valid Cognito JWT token passed as `auth` query parameter.
- Returns the HLS playlist file with video segment URLs replaced by signed URLs.

### Video Segments

- **GET** `/video/segments/:segment?token=signedToken`
- Requires a signed token query parameter to authorize access to the video segment file.
- Serves the requested video segment file if the token is valid.

### Images

- **GET** `/image?filePath=image.jpg&auth=token`
- Requires a valid Cognito JWT token passed as `auth` query parameter.
- Serves the requested image file securely.

### API Documentation

- **GET** `/api-docs`
- Serves the Swagger UI with interactive API documentation.

## Security

- User authentication is handled via AWS Cognito JWT tokens.
- Video segment URLs are signed with JWT tokens that include expiration to prevent unauthorized access.
- Helmet middleware is used to set secure HTTP headers.
- CORS middleware enables cross-origin resource sharing with default settings.
- Logging is implemented using Winston for monitoring requests and errors.

## License

This project is licensed under the MIT License.
