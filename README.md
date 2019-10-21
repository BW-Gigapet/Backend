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
    email: ''
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
  email: ''
}
```

~ GET https://bw-gigapet-ft.herokuapp.com/api/users/:id/children ~
Reuturns an array with all child accounts for given user id:
```
[
  {
    id:
    name:
    parent_id:
  },
  {
    id:
    name:
    parent_id:
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

~ GET https://bw-gigapet-ft.herokuapp.com/api/child/:id ~
returns child object for the provided id

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
]
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

~~ TO DO!!  ~~
/api/meals