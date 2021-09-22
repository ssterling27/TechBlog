const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// post method to register a user with a username and password
router.post('/users/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})
// post method to login a user with a username and password
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router
