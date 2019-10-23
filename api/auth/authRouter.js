const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const Users = require('../users/userModel.js');
const secrets = require('../../config/secrets.js');

router.post('/register', validateUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      tmp = saved;
      tmp.password = hash;
      const token = generateToken(tmp);
      res.status(201).json({userAdded: saved, token:token});
    })
    .catch(err => {
      res.status(500).json({error:err, message:"testing"});
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.name}!`,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing user data" });
  } else if (!req.body.name || !req.body.email || !req.body.password){
    res.status(400).json({ errorMessage: "Please provide an object with the following keys {name:'',email:'',password:''}" });
  } else{
    next();
  }
};


function generateToken(user){
  const payload = {
    name: user.name,
    email: user.email,
    id: user.id,
  };
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;