const express = require('express')
const app = express()
const router = require('./user.routes')

//read a json file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//share static file
app.set("views", "./public/views")
app.use(express.static(__dirname + "/public/"))
//call routes
app.use(router)

//connecting to local server
const PORT = 5000
app.listen(PORT, () => {
	console.log(`Client is listening at port ${PORT}`)
})

