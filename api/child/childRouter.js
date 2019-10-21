const router = require('express').Router();

const Child = require('./childModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
  Child.find()
    .then(children => {
     res.status(200).json(children);
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get child data',error:err})
    });
});

router.get('/:id', restricted, (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if(child){
        res.status(200).json(child);
      } else{
        res.status(404).json({message:'Child with provided id not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get child',error:err})
    });
});

router.get('/:id/meals', restricted, (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if(child){
        Child.findMeals(req.params.id)
        .then(meals=>{
          res.status(200).json(meals);
        })
        .catch(err=>{
          res.status(500).json({message:'Failed to get meals',error:err})    
        })
      } else{
        res.status(404).json({message:'Child with provided id not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get child',error:err})
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then(child => {
      if (child) {
        Child.update(changes, id)
          .then(u => {
            res.status(200).json(u);
          })
          .catch(err=>{
            res.status(500).json({ message: 'Failed to update child', error:err });      
          })
      } else {
        res.status(404).json({ message: 'Could not find child with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Child data', error:err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Child.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'Could not find child with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete child', error:err });
    });
});



module.exports = router;
