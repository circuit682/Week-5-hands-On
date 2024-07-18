const express = require('express');
const app = express();
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')


app.use(express.json())
app.use(cors())
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

db.connect((err)=>{

db.query(`CREATE DATABASE IF NOT EXISTS expense_tracker`, (err,result)=>{
//selcting the db
db.changeUser({database: 'expense_tracker'},(err) =>{
      // Create User Tables
      const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`;

    db.query(createUsersTable, (err,result)=>{
        if(err) return console.log("Error creating users table")

            console.log("Users table created/checked")
        }); 
      });
    })
})
// app.get('',(req,res)=>{
//     res.send('Hello world!')
// })

app.listen(3000,() => {
    console.log('server is running on port 3000')
})
