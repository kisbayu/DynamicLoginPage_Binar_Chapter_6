const pool = require("../models/connection")
const express = require('express');
const { response } = require("express");
const app = express()
//read a json file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create users
exports.createUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body
        const newUser = await pool.query(
            "INSERT INTO user_game (user_name, user_email, user_password) VALUES ($1,$2,$3)",
            [name, email, password]
        );
        res.status(201).json({
            message: "User Created",
            status: "success",
            data: newUser.rows[0]
        })
        console.log("user added")
    }catch(err){
        console.log(err)
    }
}

//read all users
exports.readAllUsers = async (req,res)=>{
    try {
        const allusers = await pool.query(
            "SELECT * FROM user_game"
        );
        res.status(200).json({
            message: "User Founded",
            status: "success",
            data: allusers.rows
        })
        
    } catch (err) {
        console.log(err)
    }
}

//read one user
exports.readUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await pool.query(
            "SELECT * FROM user_game WHERE user_id = $1",
            [id])
        res.status(200).json({
            message: "User Found",
            status: "success",
            data: user.rows
        })
    } catch (err) {
        console.log(err)
    }
}

//update user
exports.updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        const {name, email, password}= req.body
        const updatedUser = await pool.query(
            "UPDATE user_game SET user_name=$1, user_email=$2, user_password=$3 WHERE user_id=$4",
            [name, email, password, id]
        )
        res.status(200).json({
            message: "User Updated",
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
}

//delete user
exports.deleteUser = async (req,res)=>{
    try {
        const {id} = req.params
        const deletedUser = await pool.query(
            "DELETE FROM user_game WHERE user_id=$1",
            [id]
        );
        res.status(200).json({
            message: "User Deleted",
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
}

//join table
exports.joinTable = async(req,res)=>{
    try {
        const jointable = await pool.query(
            "SELECT * FROM user_game LEFT JOIN user_game_biodata ON user_game_biodata.user_id = user_game.user_id"
        );
        res.status(200).json({
            message: "User Founded",
            status: "success",
            data: jointable.rows
        })
        
    } catch (err) {
        console.log(err)
    }
}

//delete join table
exports.deleteRows = async(req,res)=>{
    try {
        const {id} = req.params
        const deleteBio = await pool.query(
            "DELETE FROM USER_GAME_BIODATA u USING USER_GAME o WHERE u.USER_ID = o.USER_ID AND u.USER_ID = $1",
            [id]
        )
        const deleteUser = await pool.query(
            "DELETE FROM USER_GAME WHERE USER_GAME.USER_ID=$1",
            [id]
        )
    } catch (error) {
        console.log(error)
    }
}
