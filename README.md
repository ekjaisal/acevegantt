# acevegantt.
[![GitHub Release](https://img.shields.io/github/v/release/ekjaisal/acevegantt?color=141414&label=Release)](https://github.com/ekjaisal/acevegantt/releases) [![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD_3--Clause-141414.svg)](https://github.com/ekjaisal/acevegantt/blob/main/LICENSE) [![Citation File](https://img.shields.io/badge/Citation-CFF-141414.svg)](https://github.com/ekjaisal/acevegantt/blob/main/CITATION.cff) [![CodeFactor](https://www.codefactor.io/repository/github/ekjaisal/acevegantt/badge/main)](https://www.codefactor.io/repository/github/ekjaisal/acevegantt/overview/main) [![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ekjaisal/acevegantt/badge)](https://scorecard.dev/viewer/?uri=github.com/ekjaisal/acevegantt) [![GitHub stars](https://img.shields.io/github/stars/ekjaisal/acevegantt?color=141414)](https://github.com/ekjaisal/acevegantt/stargazers)

*acevegantt.* is a free, open-source, full-stack Gantt chart implementation tailored for academic event management. It provides a simple admin console for managing users and adding or editing tasks rendered to authenticated users on the frontend interface as a Gantt chart. While *acevegantt.* is custom-built for internal tracking of academic conferences, workshops, etc., it is adaptable with minor modifications for other event formats and use cases.

![acevegantt Main Interface](assets/screenshots/main_interface.jpg)

![acevegantt Admin Console](assets/screenshots/admin_console.jpg)

## Requirements 📋

- [Node.js](https://nodejs.org)
- npm (usually comes with Node.js)
- Firebase BaaS (available with Google account)

## Usage 💻

1. Download the latest release from the [releases](https://github.com/ekjaisal/acevegantt/releases) page and extract the zip file (recommended approach). Alternatively, clone the repository using the `git clone https://github.com/ekjaisal/acevegantt.git` command.

2. Navigate to the <u>acevegantt</u> directory and install all the necessary dependencies by running `npm install`.

3. Set up the database from **[Firebase Console](https://console.firebase.google.com) → Create a Project →  Build → Firestore Database → Create Database**.

4. Generate a new private key for the service account from **Project Overview → Project Settings → Service Accounts → Generate New Private Key** and save the downloaded file as <u>serviceAccountKey.json</u> in the <u>backend</u> sub-directory within the <u>acevegantt</u> directory.

   ***Note:** Do not upload the <u>serviceAccountKey.json</u> file to a public repository.*

5. Configure the environment variables in the <u>.env</u> file in the root directory by replacing `your-project-id` with the Firebase Project ID and `your-jwt-secret` with a secret string for JWT encryption.

   ***Note:** Do not upload the <u>.env</u> file to a public repository.*

6. To create an initial admin user, modify the <u>create-admin.js</u> file in the root directory by replacing the `set_admin_user` and `set_admin_password` with the preferred admin username and password and run `node create-admin.js` command.

7. Modify the `Event Placeholder` in <u>index.html</u> with the actual event name to be displayed in the chart interface.

8. Run `node server.js` to start the local server. Access the chart interface from [http://localhost:5000](http://localhost:5000) and the admin console from [http://localhost:5000/admin](http://localhost:5000/admin).

9. To thoroughly test the implementation and to see the live preview of modifications, run the local sever using  `nodemon server.js` instead of `node server.js`.

## Deployment 🚀

1. Choose a hosting platform for deployment based on the project requirements (a generous, permissive free tier for smaller projects or a paid tier for larger projects).
2. Set up the environment variables from the <u>.env</u> file and any others as the hosting platform requires.
3. Deploy the code following the hosting platform's guidelines.

## Third-Party Libraries and Services 🛠️

This project uses the following open-source libraries:

- [Express](https://expressjs.com/) for the web server framework,
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) for database and authentication,
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for password hashing,
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for JWT authentication,
- [dotenv](https://github.com/motdotla/dotenv) for environment variable management,
- [CORS](https://github.com/expressjs/cors) for Cross-Origin Resource Sharing,
- [SortableJS](https://github.com/SortableJS/Sortable) for tasks list management, and
- [Roboto Font](https://fonts.google.com/specimen/Roboto) for UI typography.

## License 📄

This project is licensed under the BSD 3-Clause License. See the [LICENSE](LICENSE) file for details.

## Disclaimer 📣

This setup is provided as-is, without any warranties. Users are responsible for ensuring that their use of this implementation complies with the terms of service of [Firebase](https://firebase.google.com/terms) and the hosting platform.

## Acknowledgements 🤝🏾

*acevegantt.* has benefitted significantly from the assistance of Anthropic's [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) with all the heavy lifting associated with coding and some of the many ideas, suggestions, and feedback from [Sarah Harniswala](https://github.com/SarahHarniswala).

<a href="https://www.buymeacoffee.com/ekjaisal" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 160px !important;" ></a>
