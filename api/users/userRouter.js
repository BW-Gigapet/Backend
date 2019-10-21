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

router.post('/:id/children', (req, res) => {
  const childData = req.body;
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.addChild(childData, id)
          .then(child => {
            res.status(201).json(child);
          })
          .catch(err=>{
            res.status(500).json({ message: 'Failed to create child', error:err });      
          })
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get user', error:err });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id)
          .then(u => {
            res.status(200).json(u);
          })
          .catch(err=>{
            res.status(500).json({ message: 'Failed to update user', error:err });      
          })
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to find user', error:err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete user', error:err });
    });
});



module.exports = router;
