const express = require('express')
const app = express()
const router = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')
const loggedInAuth = require('./middleware/authorization')
const jwt = require('jsonwebtoken')
const pool = require('../server/models/connection.js')

app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTER
//route to homepage
router.get('/home', (req,res)=>{
    res.render('home.ejs')
}) 
//route to login page
router.get('/login', (req,res)=>{
    res.render('login.ejs')
}) 
//route to sign up page
router.get('/sign-up', (req,res)=>{
    res.render('sign-up.ejs')
}) 
//route to game page
router.get('/game',(req,res)=>{
    res.render('game.ejs')
}) 
//route to dasboard page
router.get('/dashboard', async(req,res)=>{
    const response =  await axios.get('http://localhost:8000/userJoin')
    res.render('dashboard.ejs',{
        data: response.data.data
    })
})
//route to edit page
router.get('/edit/:id', async(req,res)=>{
    const {id} = req.params
    const response = await axios.get(`http://localhost:8000/user/${id}`)
    console.log(response.data.data)
    res.render('edit.ejs',{
        data: response.data.data
    })
})

//create new user
router.post('/user', async(req,res)=>{
    try {
        const{name, email, password} = req.body
        const newUser = {
            name, email, password
        }
        const response = await axios.post('http://localhost:8000/user', newUser)
        if(response.status === 201){
		res.redirect("/login");
	    }else {
		res.redirect("/sign-up")
	}
    } catch (error) {
        console.log(error)
    }
})

//delete user
router.post('/user/:id', async(req,res)=>{
    const {id} = req.params
    const response = await axios.delete(`http://localhost:8000/user/${id}`)
    res.redirect('/dashboard')
})

//login verification
router.post('/login', async(req,res)=>{
    try {
        const {email, password} = req.body
        const verifyUser = {email, password}
        const userData = await pool.query(
            "SELECT * FROM user_game WHERE user_email=$1",
            [email]
        )
        if(email == userData.rows[0]['user_email']){
            if(password == userData.rows[0]['user_password']){
                const token = jwt.sign({ 
                id : userData.rows[0]['user_id'],
                email: userData.rows[0]['user_email']
                }, 'b1n4r', {
                expiresIn: 86400 // 1 day
                })
                res.cookie('jwt', token, { maxAge: 86400000 })
                res.redirect('/home')
            }else{
                res.redirect('/login?status=wrongpassword')
            }
        }else{
            res.redirect('/login?status=emailnotfound')
        }
        
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router