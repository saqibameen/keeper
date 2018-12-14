<div align="center">
  <img src="https://i.imgur.com/Wkfa5L8.png"/>
</div>
<br>

> A basic todo SPA built using Vue with Google Authentication and Google Firestore as a database. It allows you to manage all of your todos and organize them into different categories.


## 🚀 Setting Up the Application

Make sure you have `npm` working.

* Clone the repo.
* Set the environment variables in .env file. To get the values, set up a Google Firebase project.
* Update `.firebaserc` file and add your firebase project id there.
* Set up the Firebase tools locally.
  * Install Firebase CLI using the following command.
  ```.sh
  npm install -g firebase-tools
  ```
  * Login into firebase using following command.
  ```.sh
  firebase login
  ```
* Run following command to deploy the project on firebase. It will create `dist` folder, deploy it, and generate a URL for you.
  ```.sh
  npm run deploy
  ```

## 📸 App Screenshot
Below is preview of how the app looks like. No framework used and I wrote the CSS from scratch. 😎

![](https://i.imgur.com/wq9MOjz.png)

## License
Released under GNU GPLv2.0 or later license.

##### → Feel free to tweet and say 👋 at me [@MrSaqibAmeen](https://twitter.com/MrSaqibAmeen/)
