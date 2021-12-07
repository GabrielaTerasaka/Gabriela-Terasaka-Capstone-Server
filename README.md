# About the Project

# Installation

1. Clone the repo  
   `git clone https://github.com/GabrielaTerasaka/Gabriela-Terasaka-Capstone-Server`

2. Move to cloned folder  
   `cd Gabriela-Terasaka-Capstone-Server`

3. Install NPM packages  
   `npm install`

4. After creating a database (locally or remotely), connect it by updating the database connection information on knexfile.js or .env

5. Run the files on migration folder to create the tables in the database  
   `npm run migrate:latest`

6. If you want to populate the tables with basic information  
   `npm run seed`

7. Run the web application  
   `npm start`

# Tech Stack

- Node
- Express
- JWT
- Knex
- MySQL
