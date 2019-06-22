const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    user: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'jam',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res) => {
    res.send(database.user);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.user[0].email && req.body.password === database.user[0].password){
        res.json(database.user[0]);
    }
    else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body;
    database.user.push({   
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.user[database.user.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
      let found = false;
      database.user.forEach(user => {
          if(user.id === id) {
              found = true;
              return res.json(user);
          }
      })
      if(!found) {
        res.status(400).json('error getting user');
      }
  })
  
  app.put('/image', (req, res) => {
      const {id} = req.body;
      let found = false;
      database.user.forEach(user => {
          if(user.id === id) {
              found = true;
              user.entries++;
              return res.json(user.entries);
          }
      })
      if(!found) {
        res.status(400).json('error getting user');
      }
  })

app.listen(3000, () => {
    console.log("App is running");
})