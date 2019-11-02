// Grab all of our dependencies
const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

// Instantiate our Express app object
const app = express()
const port = 80

const privateKey = process.env.PRIVATEKEY

// Grab our middlewares
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('../frontend'))

// Define our mongoose models
var patient = mongoose.model('Patient', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    providers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Provider'}],
    log: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}]
}));

var provider = mongoose.model('Provider', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    office: String
}));

var log = mongoose.model('Log', new mongoose.Schema({
    patient: [{type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}],
    date: String,
    object: Object
}));

// Authentication API Endpoints

app.post("/api/auth/login", (req,res) => {
    const body = req.body;
    
    if(body.type == "patient") {
        patient.findOne({email: body.email}).then((pat) => {
            if(pat) {
                bcrypt.compare(body.password, pat.password, (err, same) => {
                    if(same) {
                        // If the password is the same, send the user a JWT
                        let tokenBody = {};
                        tokenBody.email = pat.email;

                        jwt.sign(tokenBody, (process.env.))
                    }
                })
            } else {
                res.json({error: "Username or password does not exist."});
                res.status(401);
                res.send();
            }
        }).catch((err) => {
            res.json({error: "Username or password does not exist."});
            res.status(401);
            res.send();
        })
    } else if (body.type == "provider") {

    }
})