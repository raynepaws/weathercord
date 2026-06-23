<div align="center">
  <img src="./public/Weathercord.svg" alt="Weathercord" height="250" />
</div>
This repository contains the source code for the frontend and backend of Weathercord, an instant messaging app.

### Getting Weathercord running
After cloning Weathercord, run the following commands to set up a working development environment:
```bash
cp .env.example .env # This is the quick and dirty way
mkdir database # !! npx drizzle-kit push will fail if you do not make the database directory specified in .env
npm i # this is done in favour of npm ci
npx drizzle-kit push # !! Account creation will fail if not done
npm run dev # done
```
Since the db should be empty, this will direct you to a signup page at `https://localhost:3000` (or equivalent)
