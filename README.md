# acevegantt.
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD_3--Clause-141414.svg)](https://github.com/ekjaisal/acevegantt/blob/main/LICENSE) [![CodeFactor](https://www.codefactor.io/repository/github/ekjaisal/acevegantt/badge/main)](https://www.codefactor.io/repository/github/ekjaisal/acevegantt/overview/main) [![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ekjaisal/acevegantt/badge)](https://scorecard.dev/viewer/?uri=github.com/ekjaisal/acevegantt) [![GitHub stars](https://img.shields.io/github/stars/ekjaisal/WovenSnips?color=141414)](https://github.com/ekjaisal/WovenSnips/stargazers)

acevegantt is a free and open-source Gantt chart implementation for managing academic events. It provides a user-friendly interface for creating, editing, and visualising tasks in a Gantt chart format, making it ideal for planning and tracking academic conferences, workshops, and other events.

## Requirements 📋

- Node.js
- npm
- Firebase account

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/ekjaisal/acevegantt.git
   cd acevegantt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Set up Firebase database
   - Generate a new private key for your service account:
     - Go to Project settings > Service Accounts
     - Click "Generate new private key"
     - Save the JSON file as `serviceAccountKey.json` in the `backend` folder

   **Note:** Do not upload the `serviceAccountKey.json` to a public repository.

4. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     FIREBASE_PROJECT_ID=your-project-id
     JWT_SECRET=your-jwt-secret
     ```
   -  Replace `your-project-id` with your Firebase project ID and `your-jwt-secret` with a secure random string for JWT encryption.

   **Note:** Do not upload the `.env` to a public repository.

## Usage 💻

1. Start the server:
   ```bash
   npm start
   ```

2. Access the application:
   - Open a web browser and go to `http://localhost:5000` for the main Gantt chart view
   - Go to `http://localhost:5000/admin` for the admin panel

3. Create an admin user:
   - Open `create-admin.js` and modify the `const adminUsername` and `const adminPassword` to set up the admin username and password.
   - Run the following command to create an initial admin user:
   ```bash
   node create-admin.js
   ```

## Testing 🧪

To test run the application, run the following command:

```bash
node server.js
```

## Deployment 🚀

1. Choose a hosting platform
2. Set up the necessary environment variables (contained in .env) on your hosting platform
3. Deploy your code following the hosting platform's guidelines

## Third-Party Libraries and Services 🛠️

This project uses the following open-source libraries:

- [Express](https://expressjs.com/) for the web server framework
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) for database and authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for JWT authentication
- [dotenv](https://github.com/motdotla/dotenv) for environment variable management
- [cors](https://github.com/expressjs/cors) for Cross-Origin Resource Sharing

## License 📄

This project is licensed under the BSD 3-Clause License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 🤝🏾

acevegantt has benefitted significantly from the assistance of Anthropic's [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) with all the heavy lifting associated with coding and some of the many ideas, suggestions, and feedback from [Sarah Harniswala](https://github.com/SarahHarniswala).

<a href="https://www.buymeacoffee.com/ekjaisal" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 160px !important;" ></a>