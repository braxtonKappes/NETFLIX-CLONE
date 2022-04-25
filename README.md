# NETFLIX-CLONE
This is a clone of NETFLIX.

NETFLIX-CLONE is where you explore movies and tv shows to watch with family and friends or by yourself.

# Index
| [MVP Feature List](https://github.com/braxtonKappes/NETFLIX-CLONE/wiki/Features-List) | [Database Schema](https://github.com/braxtonKappes/NETFLIX-CLONE/wiki/Database-Schema) | [API Documentation](https://github.com/braxtonKappes/NETFLIX-CLONE/wiki/Backend-API-Routes) | [Frontend Routes](https://github.com/braxtonKappes/NETFLIX-CLONE/wiki/Frontend-Routes) | [Wireframes](https://github.com/braxtonKappes/NETFLIX-CLONE/wiki/Wireframes) |

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style=width:50px /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" style=width:50px />

# Getting Started

1. Clone this repo
    - git clone https://github.com/braxtonKappes/NETFLIX-CLONE
2. Install dependencies from the root directory
    - npm install
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
    - CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
4. Create a .env file in the backend directory base on the env.example found within the respective directory.
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of character for your JWT_SECRET, and your desired PORT (Preferably 5000).
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file.
    - "proxy": "http://localhost:5000"
7. Create Database, Migrate, and Seed models.
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all
8. Start the services in the backend directory.
    - npm start
9. Start the services in the frontend directory, which should open the project in your deafult browser. If not, navigate to htt://localhost:3000.
10. You can use the Demo user or create an account to begin using NETFLIX-CLONE.
  
# Features
### Logged in users can perform the following actions.
    - Add/View/Edit/Delete Profiles
    - Add/View/Edit/Delete Notes
