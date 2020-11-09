import express from "express";
import User from "../models/userModel.js";
import {getToken} from "../utils.js";

const router = express.Router();

//Logging in a new user
router.post('/login', async (req, res) => {
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    // check if user exists
    if (loginUser){
        res.send({
            _id: loginUser.id,
            name: loginUser.name,
            lastname: loginUser.lastname,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            token: getToken(loginUser)
        })
    } else {
        res.status(401).send({msg:'Invalid email or password'})
    }
})

//creating a new user
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    })

    const newUser = await user.save();
        // check if user is created
        if (newUser){
            res.send({
                _id: newUser.id,
                name: newUser.name,
                lastname: newUser.lastname,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        } else {
            res.status(401).send({msg:'Invalid User Info'})
        }
    })

//creating the admin
router.get('/createadmin', async (req, res) => {
    try{
        const user = new User({
            name: "Peter",
            lastname: "Parker",
            email: "peter@gmail.com",
            password: "123456",
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);
    } catch (e) {
        res.send({msg: e.message})
    }

})

export default router;