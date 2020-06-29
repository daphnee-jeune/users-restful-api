// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser')

// connect to db models
let db = require('./models')

// make a new express app named "app".
let app = express()

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}))

// get all
app.get('/api/users', (req, res) => {
    db.User.find((err, allUsers) => {
      if (err) {
        console.log(`index error: ${err}`)
      } else {
        res.json({
          users: allUsers
        })
      }
    })
  })
  
  // get one
  app.get('/api/users/:id', (req, res) => {
    db.User.findOne({
      _id: req.params.id
    }, (err, user) => {
      if (err) {
        console.log(`show error: ${err}`)
      }
      res.json(user)
    })
  })
  
  // create new
  app.post('/api/users', (req, res) => {
    let newUser = new db.User(req.body)
    newUser.save((err, user) => {
      if (err) {
        console.log(`save error: ${err}`)
      }
      console.log(`saved new user: ${user.userName}`)
      res.json(user)
    })
  })

// delete one
app.delete('/api/users/:id', (req, res) => {
    let userId = req.params.id
    db.User.findOneAndRemove({
      _id: userId
    })
    .populate('user')
    .exec((err, deletedUser) => {
      res.json(deletedUser)
    })
  })
  
  // update one
  app.put('/api/users/:id', (req, res) => {
    let userId = req.params.id
    db.User.findOne({
      _id: userId
    }, (err, foundUser) => {
      if (err) {
        console.log('cound not find the user.')
      }
      foundUser.firstName = req.body.firstName || foundUser.firstName
      foundUser.lastName = req.body.lastName || foundUser.lastName
      foundUser.userName = req.body.userName || foundUser.userName
      foundUser.age = req.body.age || foundUser.age
      foundUser.review = req.body.review || foundUser.review
      console.log(`updating: ${foundUser.userName}`)
      //save it
      foundUser.save((err, user) => {
        if (err) {
          console.log(`update error: ${err}`)
        }
        console.log(`updated: ${user.userName}`)
        res.json(user)
      })
    })
  })

// This is where we serve our API!
app.listen(process.env.PORT || 5000, () => {
    console.log('Your First API is running on http://localhost:5000/')
})
