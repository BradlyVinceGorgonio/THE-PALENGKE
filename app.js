import express from 'express'
import jwt from 'jsonwebtoken';
import cors from 'cors'; //CORS

import {createUser, getUser, getUsers, checkCredentials} from './database.js';

const app = express()
app.use(cors()); //CORS
app.use(express.json())

// Original name : /users
app.post("/register", async (req, res) => {
    const {Username, Password, Email} = req.body //Argument characters should match the keys in json content
    const user = await createUser(Username, Password, Email)
    
    //FOR CREATING TOKEN ON REGISTER
    const userAuth = {name: Username}
    //After checking login, now creates a token
    const accessToken = jwt.sign(userAuth, process.env.ACCESS_TOKEN_SECRET) 

    //res.json({accessToken : accessToken}) 
    //res.status(201).send(user)

    // Returns token value
    res.json({ accessToken: accessToken, user: user });
})

// * /login creates a jwt token to return to the client side when they fetch the endpoint
//TUser is just to add it to an object
// ! Json body should have email , password
app.post('/login', async(req, res) =>
{ 
    //Authenticate the User
    const {Email, Password} = req.body //Gets email and pass from json file
    const Tuser = await checkCredentials(Email, Password)
    const user = {name: Tuser}

    if (Tuser.error) {
      return res.status(401).json({ accessToken: 'invalid' });
    }
    else{
      //After checking login, now creates a token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) 

    res.json({accessToken : accessToken}) 
    }
})




app.get('/get-user-data', authenticateToken, async(req, res) => {
    const authenticatedUsername = req.user.name; //authenticatedUsername is the username from the decrypt token
    const users = await getUsers()  // * Gets all username from db to verify the jwt username
    const userPreferences = users.filter(player => player.Username === authenticatedUsername); //Verifies if db username == jwt username
    res.json(userPreferences); // ! If jwt username != db username - returns [empty] array
  }); 
  
  //MiddleWare
// ! always use authenticateToken for most post / get functions
// * verifies the jwt token from users localStorage
// * Always add Bearer on front
// * Authorization : Bearer _ [token]
//Don't understand anything here, but it splits the keyword Bearer and the token (Bearer ' ')
function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1] 

    if(token == null)
    {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => 
    {
        if (err) return res.sendStatus(403)
        req.user = user;
        next()
    })
}


//error message 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

    // Prints if the server is successfull in 8080
  // 3306 doesnt work
  app.listen(8080, () =>{
    console.log('Server running on port 8080 FIREEEEE');
  })

