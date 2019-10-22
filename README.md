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
  loggedInUser: {
    id: 1,
    name: '',
    email: '',
    childAccounts: [
      {},
      {}
    ]
  }
  users: [
    {
      id: 1,
      name: '',
      email: ''
    },
    {
      id: 2,
      name: '',
      email: ''
    }
  ]
}
```

~ GET https://bw-gigapet-ft.herokuapp.com/api/users/:id ~
returns object for user with the matching id provided
```
{
  id: 1,
  name: '',
  email: '',
  childAccounts: [
      {},
      {}
    ]
}
```

~ GET https://bw-gigapet-ft.herokuapp.com/api/users/:id/children ~
Reuturns an array with all child accounts for given user id:
```
[
  {
    id:
    name:
    parent_id:,
    meals: [
      {},
      {}
    ]
  },
  {
    id:
    name:
    parent_id:,
    meals: [
      {},
      {}
    ]
  },
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
    id:1
    name:
    parent_id:,
    meals: [
      {},
      {}
    ]
  },
  {
    id:2
    name:
    parent_id:,
    meals: [
      {},
      {}
    ]
  }
]
```

~ GET https://bw-gigapet-ft.herokuapp.com/api/child/:id ~
returns child object for the provided id
```
{
    id:
    name:
    parent_id:,
    meals: [
      {},
      {}
    ]
}
```
~ GET https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals ~
Returns an array of all the meals belonging tot he child account with the provided id
```
[
  {
    id:,
    name:,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
  {
    id:,
    name:,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
]
```

YOU CAN QUERY THIS ENDPOINT
with foodType and or filter

foodtype will return all the meals where the name matches the foodType (aka Vegetables)
    https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals?foodType=Vegetables

```
[
  {
    id:,
    name: WILL MATCH WHAT WAS SET TO foodType,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
  {
    id:,
    name: WILL MATCH WHAT WAS SET TO foodType,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
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

```
[
  {
    id:,
    name:,
    portionSize:,
    date:,
    time: WILL BE IN THE RANGE SET BY filter,
    child_id:,
  },
  {
    id:,
    name:,
    portionSize:,
    date: WILL BE IN THE RANGE SET BY filter,
    time:,
    child_id:,
  },
]
```

you can also combine the two and query by both

    https://bw-gigapet-ft.herokuapp.com/api/child/:id/meals?foodType=Vegetables&&filter=today

querying both will not return an array, it will return an object with a meals array, the total of the percentages and the daily average for that period.

```
{
  meals: [
    {
      id:,
      name: WILL MATCH WHAT WAS SET TO foodType,
      portionSize:,
      date:,
      time: WILL BE IN THE RANGE SET BY filter,
      child_id:,
    },
    {
      id:,
      name: WILL MATCH WHAT WAS SET TO foodType,
      portionSize:,
      date:,
      time: WILL BE IN THE RANGE SET BY filter,
      child_id:,
    },
  ],
  totalPercent:,
  average
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
    id:,
    name:,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
  {
    id:,
    name:,
    portionSize:,
    date:,
    time:,
    child_id:,
  },
]
```

GET https://bw-gigapet-ft.herokuapp.com/api/meals/:id
returns the meal object for provided id
```
{
    id:,
    name:,
    portionSize:,
    date:,
    time:,
    child_id:,
}
```
PUT https://bw-gigapet-ft.herokuapp.com/api/meals/:id
edit the meal object for provided id

DELETE https://bw-gigapet-ft.herokuapp.com/api/meals/:id
delete the meal object for provided id