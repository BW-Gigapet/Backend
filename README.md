# Backend

Endpoints:

~ POST https://bw-gigapet-ft.herokuapp.com/api/register ~
send post request with user object:
````
{
  name: required string
  email: required string, unique
  password: required string
}
```

~ POST https://bw-gigapet-ft.herokuapp.com/api/login ~
send post request with following object:

```
{
  email: required string
  password: required string
}
```

on success returns a welcome message and a token.

~ GET https://bw-gigapet-ft.herokuapp.com/api/users ~
returns an object with array of all users and the current logged in user
```
{
  "loggedInUser": {
    "name": "Tim",
    "email": "tim@fakemail.com",
    "id": 1,
    "iat": 1571781381,
    "exp": 1571867781,
    "childAccounts": [
      {
        "id": 2,
        "name": "Allison",
        "parent_id": 1
      },
      {
        "id": 1,
        "name": "Issac",
        "parent_id": 1
      }
    ]
  },
  "users": [
    {
      "id": 1,
      "name": "Tim",
      "email": "tim@fakemail.com"
    },
    {
      "id": 2,
      "name": "Vanessa",
      "email": "vanessa@fakemail.com"
    },
    {
      "id": 3,
      "name": "Kim",
      "email": "kim@fakemail.com"
    }
  ]
}

```

~ GET https://bw-gigapet-ft.herokuapp.com/api/users/:id ~
returns object for user with the matching id provided

https://bw-gigapet-ft.herokuapp.com/api/users/1
```
{
  "id": 1,
  "name": "Tim",
  "email": "tim@fakemail.com",
  "childAccounts": [
    {
      "id": 2,
      "name": "Allison",
      "parent_id": 1
    },
    {
      "id": 1,
      "name": "Issac",
      "parent_id": 1
    }
  ]
}

```

~ GET https://bw-gigapet-ft.herokuapp.com/api/users/:id/children ~
Reuturns an array with all child accounts for given user id:

https://bw-gigapet-ft.herokuapp.com/api/users/1/children
```
[
  {
    "id": 2,
    "name": "Allison",
    "parent_id": 1
  },
  {
    "id": 1,
    "name": "Issac",
    "parent_id": 1
  }
]
```
~ POST https://bw-gigapet-ft.herokuapp.com/api/users/:id/children ~
make a post request with the following object as the body
```
{
  name: required string, unique to the parent (parent Kim cant have two children named andy, but both kim and tim can each have a kid named andy)
}
```

~ PUT https://bw-gigapet-ft.herokuapp.com/api/users/:id ~
will change whatever you pass into the object, not required to pass in all, just the fields you want to change
```
{
  name:
  email:
  password:
}
```
returns the updated user object

~ DELETE https://bw-gigapet-ft.herokuapp.com/api/users/:id ~
-deletes the user with the provided id. returns the deleted user object

~ GET https://bw-gigapet-ft.herokuapp.com/api/child ~
returns an array of all child account objects
```
[
  {
    "id": 1,
    "name": "Issac",
    "parent_id": 1
  },
  {
    "id": 2,
    "name": "Allison",
    "parent_id": 1
  },
  {
    "id": 3,
    "name": "Cristine",
    "parent_id": 2
  },
  {
    "id": 4,
    "name": "Yvette",
    "parent_id": 2
  },
  {
    "id": 5,
    "name": "Bryan",
    "parent_id": 3
  },
  {
    "id": 6,
    "name": "Andy",
    "parent_id": 3
  }
]

```

~ GET https://bw-gigapet-ft.herokuapp.com/api/child/:id ~
returns child object for the provided id

https://bw-gigapet-ft.herokuapp.com/api/child/1
```
{
  "id": 1,
  "name": "Issac",
  "parent_id": 1,
  "meals": [
    {
      "id": 1,
      "name": "Vegetables",
      "portionSize": "small",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 33
    },
    {
      "id": 2,
      "name": "Vegetables",
      "portionSize": "medium",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 67
    },
    {
      "id": 3,
      "name": "Vegetables",
      "portionSize": "large",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 100
    },
    {
      "id": 4,
      "name": "Protein",
      "portionSize": "small",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 33
    },
    {
      "id": 5,
      "name": "Protein",
      "portionSize": "medium",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 67
    },
    {
      "id": 6,
      "name": "Protein",
      "portionSize": "large",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 100
    }
  ]
}

```
~ GET https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals ~
Returns an array of all the meals belonging tot he child account with the provided id

https://bw-gigapet-ft.herokuapp.com/api/child/1/meals
```
[
  {
    "id": 1,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 33
  },
  {
    "id": 2,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 67
  },
  {
    "id": 3,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 100
  },
  {
    "id": 4,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 33
  },
  {
    "id": 5,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 67
  },
  {
    "id": 6,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 100
  }
]

```

YOU CAN QUERY THIS ENDPOINT
with foodType and or filter

foodtype will return all the meals where the name matches the foodType (aka Vegetables)
    https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals?foodType=Vegetables

    https://bw-gigapet-ft.herokuapp.com/api/child/1/meals?foodType=Vegetables

```
[
  {
    "id": 1,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 33
  },
  {
    "id": 2,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 67
  },
  {
    "id": 3,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 100
  }
]

```

filter will return all the meals that fall within the range for the date, based on categories
the categories are:

today - returns all meals that are dated for todays date
yesterday - returns all meals that are dated for yesterdays date
prevSeven - returns all meals that are dated for the previos 7 days
prevThirty - returns all meals that are dated for the previos 30 days
weekly - returns all meals that are dated for the current week
monthly - returns all meals that are dated for the current month

    https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals?filter=prevSeven

    https://bw-gigapet-ft.herokuapp.com/api/child/1/meals?filter=today

```
[
  {
    "id": 1,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 33
  },
  {
    "id": 2,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 67
  },
  {
    "id": 3,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 100
  },
  {
    "id": 4,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 33
  },
  {
    "id": 5,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 67
  },
  {
    "id": 6,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1,
    "percent": 100
  }
]

```

you can also combine the two and query by both

    https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals?foodType=Vegetables&&filter=today

querying both will not return an array, it will return an object with a meals array, the total of the percentages and the daily average for that period.

https://bw-gigapet-ft.herokuapp.com/api/child/1/meals?foodType=Vegetables&&filter=today
```
{
  "meals": [
    {
      "id": 1,
      "name": "Vegetables",
      "portionSize": "small",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 33
    },
    {
      "id": 2,
      "name": "Vegetables",
      "portionSize": "medium",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 67
    },
    {
      "id": 3,
      "name": "Vegetables",
      "portionSize": "large",
      "date": "2019-10-22T00:00:00.000Z",
      "time": "10:30:00",
      "child_id": 1,
      "percent": 100
    }
  ],
  "totalPercent": 200,
  "average": 200
}

```

~ POST https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals ~
add a meal to the child with provided id. meal object should be as follows:
```
{
    "name":"Vegetables",     //the category type: Vegetables, Proteins, etc
    "portionSize":"medium",  //the portion size: small, medium, large (gets converted into percentages)
    "date":"10/22/2019",    //
    "time":"11:37"
}
```

~ PUT https://bw-gigapet-ft.herokuapp.com/api/child/:id ~
will change whatever you pass into the object, not required to pass in all, just the fields you want to change
changing parent_id will link the child to a different parent.
```
{
  name:
  parent_id:
}
```
returns the updated child account object

~ DELETE https://bw-gigapet-ft.herokuapp.com/api/child/:id ~
deletes the child account with the provided id, returns the deleted child object

/api/meals

GET https://bw-gigapet-ft.herokuapp.com/api/meals/
Returns an array of all meal objects
```
[
  {
    "id": 1,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 2,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 3,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 4,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 5,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 6,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 1
  },
  {
    "id": 7,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 8,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 9,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 10,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 11,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 12,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 2
  },
  {
    "id": 13,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 14,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 15,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 16,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 17,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 18,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 3
  },
  {
    "id": 19,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 20,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 21,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 22,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 23,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 24,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 4
  },
  {
    "id": 25,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 26,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 27,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 28,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 29,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 30,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 5
  },
  {
    "id": 31,
    "name": "Vegetables",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  },
  {
    "id": 32,
    "name": "Vegetables",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  },
  {
    "id": 33,
    "name": "Vegetables",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  },
  {
    "id": 34,
    "name": "Protein",
    "portionSize": "small",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  },
  {
    "id": 35,
    "name": "Protein",
    "portionSize": "medium",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  },
  {
    "id": 36,
    "name": "Protein",
    "portionSize": "large",
    "date": "2019-10-22T00:00:00.000Z",
    "time": "10:30:00",
    "child_id": 6
  }
]

```

GET https://bw-gigapet-ft.herokuapp.com/api/meals/:id
returns the meal object for provided id

https://bw-gigapet-ft.herokuapp.com/api/meals/1
```
{
  "id": 1,
  "name": "Vegetables",
  "portionSize": "small",
  "date": "2019-10-22T00:00:00.000Z",
  "time": "10:30:00",
  "child_id": 1
}

```
PUT https://bw-gigapet-ft.herokuapp.com/api/meals/:id
edit the meal object for provided id

DELETE https://bw-gigapet-ft.herokuapp.com/api/meals/:id
delete the meal object for provided id