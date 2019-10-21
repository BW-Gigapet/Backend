const router = require('express').Router();

const Users = require('./userModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
     res.status(200).json({loggedInUser: req.user, users:users});
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get users',error:err})
    });
});

router.get('/:id', restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(user){
        res.status(200).json(user);
      } else{
        res.status(404).json({message:'User with provided id not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get user',error:err})
    });
});

router.get('/:id/children', restricted, (req, res) => {
  Users.findAllChildAccounts(req.params.id)
    .then(children => {
      if(children.length>0){
        res.status(200).json(children);
      } else{
        res.status(404).json({message:'Child accounts for user with provided id not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get child accounts',error:err})
    });
});



module.exports = router;
