const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/notes', require('./routes/api/notes'))
app.use('/api/auth', require('./routes/api/auth'))

app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
