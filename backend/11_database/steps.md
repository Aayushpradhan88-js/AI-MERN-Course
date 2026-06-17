// DATABASE CONNECTION STEPS

//STEP-1: PROJECT INITIALIZE 
             - npm init -y

//STEP-2: Installing required packages
        - express, nodemon, pg, pg-hstore, postgres, dotenv, sequelize

//STEP-3: Create a seperate config folder and make connection folder and write db configuration (DATABASE_URL)

//STEP-4: Create a model folder and add index.js file 
         - exported sequelize db connection should be invoked

//STEP-5: For every model creation you have to import
        - import { DataTypes } from 'sequelize';
        - import { sequelize } from '../../models/index.js';