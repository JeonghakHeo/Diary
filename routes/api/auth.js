const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

// @route   POST api/auth
// @desc    Authenticate(Login) user & get token
// @access  Public
router.post(
  '/',
  [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              { msg: 'There was a problem logging in. Check your email again' },
            ],
          })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({
            errors: [
              {
                msg: 'Wrong password. Try again or click Forgot password to reset it.',
              },
            ],
          })
      }

      const payload = {
        user: {
          id: user._id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(400).send('Server Error')
    }
  }
)

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})
module.exports = router
