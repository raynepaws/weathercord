<div align="center">
  <img src="./public/Weathercord.svg" alt="Weathercord" height="250" />
</div>
<div align="center">
  <a href="https://github.com/raynepaws/weathercord/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/raynepaws/weathercord?style=flat-square&logo=github&logoColor=%23D1C4E9&color=%23D1C4E9"></a>
  <a href="https://github.com/raynepaws/weathercord/forks"><img alt="GitHub forks" src="https://img.shields.io/github/forks/raynepaws/weathercord?style=flat-square&logo=github&logoColor=%23D1C4E9&color=%23D1C4E9"></a>
  <a href="https://github.com/raynepaws/weathercord/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/raynepaws/weathercord?style=flat-square&logo=github&logoColor=%23D1C4E9&color=%23D1C4E9"></a>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/raynepaws/weathercord?style=flat-square&logo=github&logoColor=%23D1C4E9&color=%23D1C4E9">
  <a href="https://github.com/raynepaws/weathercord/issues"><img alt="GitHub Issues" src="https://img.shields.io/github/issues/raynepaws/weathercord?style=flat-square&logo=github&logoColor=%23D1C4E9&color=%23D1C4E9"></a>
</div>

<div align="center">
  <h1>Weathercord</h1>
</div>

This repository contains the source code for the frontend and backend of Weathercord, an instant messaging app.

## Setting Up
To set up a Weathercord development environment, first, clone the repository:
```sh
git clone https://github.com/raynepaws/weathercord
cd weathercord
```

Then, install dependencies:
```sh
npm ci
```

Create a `.env` file. The only key you need for now is called `DB_FILE_NAME`. the recommended value for this key is provided in `.env.example`.

Create a directory called `database`. Inside this directory, create three more empty directories called `avatars`, `banners`, and `temp`. Eventually, there will be a script to automate this step.
```
database
├─ avatars
├─ banners
└─ temp
```

Next, create the database file with the schema by running the following command:
```sh
npx drizzle-kit push
```

Finally, start the Next.js server by running the command below.
```sh
npm run dev
```
