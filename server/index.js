//imported module
const express = require('express')
const app = express()
const { v4: uuid } = require("uuid")
const fs = require("fs")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const loggedInAuth = require('./middleware/authorization.js')

app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", "./public/views")
app.use(express.static(__dirname + "/public/"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//connecting to local server
const PORT = 8000
app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}`)
})

//ROUTES
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/game',loggedInAuth,(req,res)=>{
    res.render('game.ejs')
})

app.get('/sign-up',(req,res)=>{
    res.render('sign-up.ejs')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

//CONTROLLER
//create new user
app.post('/user', (req,res)=>{
    const { name, email, password } = req.body;
	const newUser = { id: uuid(), name, email, password };
	data.push(newUser);
	fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 4));
	res.redirect("/login");
})

//verify password
app.post('/login', (req,res)=>{
    const {email, password} = req.body
    const emailMatch = data.find(i=>i.email == email)

    if(!emailMatch){
        res.redirect('/login?status=emailnotfound')
    }else{
        if(password == emailMatch.password){
            const token = jwt.sign({ 
                id: emailMatch.id,
                name: emailMatch.name,
                email: emailMatch.email
              }, 'b1n4r', {
                expiresIn: 86400 // 1 day
              })
            res.cookie('jwt', token, { maxAge: 86400000 })
            res.redirect('/')
        }else{
            res.redirect('/login?status=wrongpassword')
        }
    }
    res.locals.user = null
})

//find all users
app.get('/user', (req,res)=>{
    res.send(data)
})

//update user
app.post('/user/edit/:id', (req,res)=>{
    const { id } = req.params;
	const { name, email, password } = req.body;
	const editedUser = { id, name, email, password };
    const userIndex = data.findIndex((user) => user.id === id);
	data[userIndex] = editedUser;
	fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 4));
	res.redirect("/user");
})

//delete all users
app.post('/user/delete/:id', (req,res)=>{
    const { id } = req.params
    const deletedList = data.filter((i) => {
		return i.id != id;
	})
    fs.writeFileSync("./data/users.json", JSON.stringify(deletedList, null, 4));
	res.redirect('/user')
})