import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config()



// * database credentials are located on .env
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
}).promise()


export async function getUsers()
{
    const [rows] = await pool.query("SELECT * FROM Users");
    return rows
}

export async function getUser(username)
{
   const [rows] = await pool.query(`
   SELECT * 
   FROM Users
   WHERE Username = ?
   `, [username]);

   return rows[0]
}

export async function createUser(username, password, email)
{
    const [rows] = await pool.query(`
    INSERT INTO Users (Username, Email, Password)
    VALUES (?,?,?)
    `, [username, email, password])

    return getUser(username)
}


export async function checkCredentials(Email, Password) {
    const connection = await pool.getConnection(); // Get a connection from the pool
  
    try {
      const [rows] = await connection.query(`
        SELECT * 
        FROM Users
        WHERE Email = ? AND Password = ?
      `, [Email, Password]);
  
      const user = rows[0];
  
      if (!user) {
        return { error: 'Invalid email or password' };  
      }
  
      // If the email and password are correct, return the username
      return user.Username;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  }
  

// const user = await createUser("nyoging", "passwordt123", "tae@gmail.com") ;
// console.log(user);