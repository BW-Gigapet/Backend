const router = require('express').Router();

const Meals = require('./mealModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
  Meals.find()
    .then(meals => {
     res.status(200).json(meals);
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get meal data',error:err})
    });
});

router.get('/:id', restricted, (req, res) => {
  Meals.findById(req.params.id)
    .then(meal => {
      if(meal){
        res.status(200).json(meal);
      } else{
        res.status(404).json({message:'Meal with provided id not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message:'Failed to get meal',error:err})
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Meals.findById(id)
    .then(meal => {
      if (meal) {
        Meals.update(changes, id)
          .then(u => {
            res.status(200).json(u);
          })
          .catch(err=>{
            res.status(500).json({ message: 'Failed to update meal', error:err });      
          })
      } else {
        res.status(404).json({ message: 'Could not find meal with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get meal data', error:err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Meals.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'Could not find meal with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete meal', error:err });
    });
});



module.exports = router;
