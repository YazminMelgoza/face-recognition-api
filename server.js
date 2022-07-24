const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
app.use(bodyParser.json());

const database = {
    users: [
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
            password: 'bananas',
            entries: 0,
            joined: new Date()
        } 
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
      res.json('success');
    } else {
      res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {

    })
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            res.json(user);
        }
    })
    res.status(400).json('no such user')
});

app.put('/image', (req, res) => {
    const { id, count} = req.body; 
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            user.entries += count;
            found = true;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('user not found')
    }
})

app.listen(3001, () => {
    console.log('app is running on port 3001');
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user 
/profile/:userId --> GET = user 
/image --> PUT 
*/