const router = require('express').Router();

const Child = require('./childModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
  Child.find()
    .then(children => {
      res.status(200).json(children);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get child data', error: err })
    });
});

router.get('/:id', restricted, (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if (child) {
        tmp = child;
        tmp.meals = [];
        Child.findMeals(tmp.id)
          .then(meals => {
            //tmp.meals = meals;
            tmp.meals = addPercentToMeals(meals);
            res.status(200).json(tmp);
          })
      } else {
        res.status(404).json({ message: 'Child with provided id not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get child', error: err })
    });
});

router.get('/:id/meals', restricted, (req, res) => {
  let { id } = req.params;
  Child.findById(id)
    .then(child => {
      if (child) {
        if (req.query.foodType && req.query.filter) {
          Child.findMealsDateType(req.query.foodType, req.query.filter, id)
            .then(meals => {
              let mealArr = addPercentToMeals(meals);
              let totalsObject = {};
              mealArr.map(meal=>{
                if(!totalsObject[meal.date]){
                  totalsObject[meal.date] = 0;
                }
                totalsObject[meal.date] += meal.percent; 
              });
              let totalPercent = Object.values(totalsObject).reduce((a, b) => a + b);
              let average = totalPercent / Object.values(totalsObject).length;
              res.status(200).json({meals:mealArr,totalPercent:totalPercent,average:average});
            })
            .catch(err => {
              res.status(500).json({ message: 'Failed to get meals', error: err })
            })
        } else if(req.query.foodType && !req.query.filter){
          Child.findMealsType(req.query.foodType, id)
            .then(meals => {
              res.status(200).json(addPercentToMeals(meals));
            })
            .catch(err => {
              res.status(500).json({ message: 'Failed to get meals', error: err })
            })
        } else if(!req.query.foodType && req.query.filter){
          Child.findMealsDate(req.query.filter, id)
            .then(meals => {
              res.status(200).json(addPercentToMeals(meals));
            })
            .catch(err => {
              res.status(500).json({ message: 'Failed to get meals', error: err })
            })
        } else {
          Child.findMeals(req.params.id)
            .then(meals => {
              res.status(200).json({ meals: addPercentToMeals(meals), query: req.query });
            })
            .catch(err => {
              res.status(500).json({ message: 'Failed to get meals', error: err })
            })
        }
      } else {
        res.status(404).json({ message: 'Child with provided id not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get child', error: err })
    });
});

router.post('/:id/meals', restricted, validateMeal, (req, res) => {
  let mealData = req.body;
  const { id } = req.params;

  Child.findById(id)
    .then(child => {
      if (child) {
        mealData.child_id = id;
        Child.addMeal(mealData)
          .then(meal => {
            res.status(201).json(meal);
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to create meal', error: err });
          })
      } else {
        res.status(404).json({ message: 'Could not find child with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Child account', error: err });
    });
});

router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then(child => {
      if (child) {
        Child.update(changes, id)
          .then(u => {
            res.status(200).json(u);
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to update child', error: err });
          })
      } else {
        res.status(404).json({ message: 'Could not find child with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get Child data', error: err });
    });
});

router.delete('/:id', restricted, (req, res) => {
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
      res.status(500).json({ message: 'Failed to delete child', error: err });
    });
});

function addPercentToMeals(meals) {
  let tmp = meals.map(meal => {
    if (!meal.portionSize) return meal;
    switch (meal.portionSize.toLowerCase()) {
      case 'small':
        meal.percent = 33;
        break;
      case 'medium':
        meal.percent = 67;
        break;
      case 'large':
        meal.percent = 100;
        break;
      default:
        break
    }
    return meal;
  })
  return tmp;
}


function validateMeal(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing meal data" });
  } else if (!req.body.name || !req.body.portionSize || !req.body.date || !req.body.time){
    res.status(400).json({ errorMessage: "Please provide an object with the following keys {name:'',portionSize:'',date:,time:}" });
  }else{
    next();
  }
};


module.exports = router;
