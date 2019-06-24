const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });


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
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
      db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) {
                res.json(user[0])
            }
            else {
                res.status(400).json('Not found')
            }
      })
      .catch(err => res.status(400).json('Not getting user'))
  })
  
  app.put('/image', (req, res) => {
      const {id} = req.body;
      db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
          res.json(entries)
    })
    .catch(err => res.status(400).json('Unable to get entries'))
  })

app.listen(3000, () => {
    console.log("App is running");
})