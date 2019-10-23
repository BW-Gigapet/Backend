const router = require('express').Router();

const Users = require('./userModel.js');
const Child = require('../child/childModel.js');
const restricted = require('../auth/restricted.js');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      let tmp = req.user;
        Users.findAllChildAccounts(tmp.id)
        .then(children=>{
          tmp.childAccounts = children;
          res.status(200).json({loggedInUser: tmp, users:users});
        })
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get users',error:err})
    });
});

router.get('/current', restricted, asyncMiddleware( async (req, res) => {
  let tmp = req.user;
  tmp.childAccounts = await Users.findAllChildAccounts(tmp.id); 
  for(i=0;i<tmp.childAccounts.length;i++){
    tmp.childAccounts[i].meals = await Child.findMeals(tmp.childAccounts[i].id)
  }

  res.status(200).json(tmp);
}));

router.get('/:id', restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(user){
        let tmp = user;
        Users.findAllChildAccounts(req.params.id)
        .then(children=>{
          tmp.childAccounts = children;
          res.status(200).json(tmp);
        })      
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

router.post('/:id/children', restricted, validateChild, (req, res) => {
  let childData = req.body;
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        childData.parent_id = id;
        Users.addChild(childData)
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

router.put('/:id', restricted, (req, res) => {
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

router.delete('/:id', restricted, (req, res) => {
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


function validateChild(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing child data" });
  } else if (!req.body.name){
    res.status(400).json({ errorMessage: "Please provide an object with the following keys {name:''}" });
  } else {
    next();
  }
};

module.exports = router;
