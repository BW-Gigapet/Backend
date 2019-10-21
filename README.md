# Backend

Endpoints:

~ POST /api/register ~
-Description coming soon!
{
  name: required string
  email: required string, unique
  password: required string
}

~ POST /api/login ~
-Description coming soon!
{
  email: required string
  password: required string
}

~ GET /api/users ~
returns an object with array of all users and the current logged in user
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

~ GET /api/users/:id ~
returns object for user with the matching id provided
{
  id: 1,
  name: '',
  email: ''
}

~ GET /api/users/:id/children ~
-Description coming soon!

~ POST /api/users/:id/children ~
-Description coming soon!
{
  name: required string, unique to the parent (parent Kim cant have two children named andy, but both kim and tim can each have a kid named andy)
}

~ PUT /api/users/:id ~
will change whatever you pass into the object, not required to pass in all, just the fields you want to change
{
  name:
  email:
  password:
}
returns the updated user object

~ DELETE /api/users/:id ~
-Description coming soon!

~ GET /api/child ~
-Description coming soon!

~ GET /api/child/:id ~
-Description coming soon!

~ PUT /api/child/:id ~
will change whatever you pass into the object, not required to pass in all, just the fields you want to change
changing parent_id will link the child to a different parent.
{
  name:
  parent_id:
}
returns the updated child account object

~ DELETE /api/child/:id ~
-Description coming soon!

~~ TO DO!!  ~~
/api/meals