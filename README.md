# FullStack Task Manager

This project is a FullStack task manager developed by [Charbel SONON](https://github.com/AsKing07). It is designed to help you organize and track your tasks efficiently and was created within a learning context.

## Online Demo

You can try a demo of the project by following this link: [Task Manager Demo](https://taskmanager-asking.vercel.app/).

## Images

<div style="display: flex; justify-content: space-between;">
  <img src="img4.jpg" alt="Image 4" width="300">
  <img src="img2.jpg" alt="Image 2" width="300">
  <img src="img3.jpg" alt="Image 3" width="300">
</div>

## Technologies Used

This project was developed using the following technologies:

- Vue.js
- Node.js
- MongoDB
- Express.js
- Vercel (for demo deployment)

## Configuration

In the `.env` file, you need to configure the following environment variables:

- `MONGODB_URI`: MongoDB database connection link.
- `JWT_SECRET`: Secret code for decoding JWT tokens.
- `GMAIL_SECRET`: Gmail application code for sending emails.

## Project Structure

The main folder is named `FullStack-TaskManager-App` and consists of two subfolders:

### Backend

The contents of the `backend` folder include:

- `.env`: Environment variables file.
- `controllers`: Application controllers.
- `dist`: Distribution files generated during build.
- `middleware`: Middlewares used in the application, especially the authentication middleware.
- `models`: MongoDB data models.
- `routes`: API route definitions.
- `server.js`: Server startup script.
- `app.js`: Main backend application file.

### Frontend

The contents of the `frontend` folder include:

- `dist`: Distribution files generated during build.
- `node_modules`: Node.js dependencies.
- `public`: Public static files.
- `src`: Source code of the Vue.js application.
- `README.md`: This README file.
- `vue.config.js`: Vue.js-specific configuration.

## Installation

To run this project locally, follow these steps:

1. Clone this repository: `git clone https://github.com/AsKing07/TaskManager-FullStackWebApp-GestionnairedeTaches-ApplicationFullStack.git`.
2. Navigate to the backend folder: `cd backend`.
3. Install dependencies: `npm install`.
4. Navigate to the frontend folder: `cd ../frontend`.
5. Install dependencies: `npm install`.

## Usage

- Backend: Run `npm start` in the backend folder to start the server (Port 3000 by default).
- Frontend: Run `npm run serve` in the frontend folder to start the Vue.js application in development mode (Port 8080 by default).
- Make sure the backend server is running before launching the frontend application.
- The application will be accessible at `http://localhost:8080/`.

## Contribution

Feel free to contribute, report issues, and make improvement suggestions. Enjoy using it!

## Author
[Charbel SONON](https://github.com/AsKing07)

## License

This project is licensed under the MIT License. See the [MIT](LICENSE) file for more details.
