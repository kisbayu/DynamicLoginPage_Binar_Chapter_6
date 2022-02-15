const express = require('express')
const router = require('./routes/user.routes')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//call routes
app.use(router)

//connecting to local server
const PORT = 8000
app.listen(PORT, () => {
	console.log(`Server is Listening at Port ${PORT}`)
})

