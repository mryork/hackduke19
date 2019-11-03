// Grab all of our dependencies
const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require('cors');

// Instantiate our Express app object
const app = express()
const port = 80

const privateKey = process.env.PRIVATEKEY;
const saltRounds = 10;

// Grab our middlewares
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('../frontend'))

// Define our mongoose models
var patient = mongoose.model('Patient', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    providers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Provider'}],
    logs: [Object]
}));

var provider = mongoose.model('Provider', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    office: String
}));

// Authentication API Endpoints

app.post("/api/auth/login", (req,res) => {
    const body = req.body;
    var userType;

    if(body.type == "patient") {
        userType = patient;
    } else if (body.type == "provider") {
        userType = provider;
    }

    userType.findOne({email: body.email}).then((pat) => {
        if(pat) {
            bcrypt.compare(body.password, pat.password, (err, same) => {
                if(same) {
                    // If the password is the same, send the user a JWT
                    let tokenBody = {};
                    tokenBody.email = pat.email;

                    jwt.sign(tokenBody, privateKey, {expiresIn: "1 week"}, (err, ret) => {
                        if(err) {
                            res.status(400);
                            console.log(priv);
                            res.send();
                        } else {
                            res.json({token: ret});
                            res.send();
                        }
                    })
                } else {
                    res.json({error: "Username or password does not exist."});
                    res.status(401);
                    res.send();
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
})

app.post("/api/auth/register", (req,res) => {
    const body = req.body;
    var userType;

    if(body.type == "patient") {
        userType = patient;
    } else if (body.type == "provider") {
        userType = provider;
    }
    
    console.log(body);

    userType.find({email: body.email}).then((user) => {
        if(user.length != 0) {
            res.json({error: "User already exists."})
            res.status(401);
            res.send();
        } else {
            var newUser = {};
            newUser.name = body.name;
            newUser.phone = body.phone;
            newUser.email = body.email;
            generateSalt(body.password).then((hash) => {
                newUser.password = hash;
                userType.create(newUser);
                res.status(200);
                res.send();
            }).catch(() => {
                res.status(400);
                res.send();
            })
        }
    })
})

app.post("/api/patient/getPatientInfo", (req,res) => {
    const body = req.body;

    patient.findOne({_id: body.id}).then((user) => {
        if(!user) {
            res.json({error: "User with ID does not exist."})
            res.status(400);
            res.send();
        } else {
            res.json({name: user.name});
            res.status(200);
            res.send();
        }
    })
})

app.post("/api/patient/associate", (req,res) => {
    const body = req.body;

    jwt.verify(body.token, privateKey, function(err, decoded) {
        if(err) {
            res.status(400);
            res.send();
        } else {
            patient.findOne({email: decoded.email}).then((pat) => {
                provider.findOne({email: body.email}).then((pro) => {
                    if(!pro) {
                        console.log(pro);
                        console.group(body);
                        res.json({error: "Provider does not exist"})
                        res.send();
                    } else {
                        let currentProviders = pat.providers;
                        let providerID = pro._id;

                        currentProviders.push(providerID);
                        pat.providers = currentProviders;
                        pat.save();

                        res.status(200);
                        res.send();
                    }    
                }).catch(() => {
                    res.status(400);
                    res.send();
                })
            })
        }
    });
})

app.post("/api/patient/dissociate", (req,res) => {
    const body = req.body;

    jwt.verify(body.token, privateKey, function(err, decoded) {
        if(err) {
            res.status(400);
            res.send();
        } else {
            patient.findOne({email: decoded.email}).then((pat) => {
                provider.findOne({email: body.email}).then((pro) => {
                    if(!pro) {
                        res.json({error: "Provider does not exist"})
                        res.send();
                    } else {
                        let currentProviders = pat.providers;
                        let providerID = pro._id;

                        currentProviders = currentProviders.filter(e => {
                            return e != providerID;
                        })
                        pat.providers = currentProviders;
                        pat.save();

                        res.status(200);
                        res.send();
                    }    
                }).catch(() => {
                    res.status(400);
                    res.send();
                })
            })
        }
    });
})

async function getSentiment(text) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
    const projectId = 'sage-mind-255701'
    const keyFilename = './private.json'
    // Instantiates a client
    const client = new language.LanguageServiceClient({projectId, keyFilename});

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
  
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    return sentiment.score;
}

app.post("/api/provider/analyzeSentiment", (req,res) => {
    const body = req.body;
    const text = body.text;

    getSentiment(text).then((returned) => {
        res.json({sentiment: returned});
        res.status(200);
        res.send();
    })
})

app.post("/api/provider/getPatients", (req,res) => {
    const body = req.body;

    jwt.verify(body.token, privateKey, function(err, decoded) {
        if(err) {
            res.status(400);
            res.send();
        } else {
            var returnable = [];
            provider.findOne({email: decoded.email}).then(pro => {
                patient.find({ providers: pro._id }).then(pats => {
                    pats.forEach((val) => {
                        returnable.push(val._id);
                    })
                    res.json({patients: returnable});
                    res.status(200);
                    res.send();
                })
            })
        }
    });
})

app.post("/api/patient/getLogs", (req,res) => {
    const body = req.body;

    console.log(body);

    if(body.id) {
        jwt.verify(body.token, privateKey, function(err, decoded) {
            if(err) {
                res.status(400);
                res.send();
            } else {
                provider.findOne({email: decoded.email}).then((pro) => {
                    patient.findById(body.id).then((pat) => {
                        if(pat.providers.includes(pro._id)) {
                            pat.logs = pat.logs.sort(function(a, b){return b-a});
                            pat.save();
                            res.json({logs: pat.logs})
                            res.status(200);
                            res.send();
                        } else {
                            res.status(400);
                            res.send();
                        }
                    })
                })
            }
        });
    } else {
        jwt.verify(body.token, privateKey, function(err, decoded) {
            if(err) {
                res.status(400);
                res.send();
            } else {
                patient.findOne({email: decoded.email}).then((pat) => {
                    console.log(pat._id);
                    res.json({logs: pat.logs})
                })
            }
        });
    }
})
app.post("/api/patient/updateLog", (req,res) => {
    const body = req.body;

    jwt.verify(body.token, privateKey, function(err, decoded) {
        if(err) {
            res.status(400);
            res.send();
        } else {
            patient.findOne({email: decoded.email}).then((pat) => {
                let patLogs = pat.logs;
                var today = null;

                console.log(patLogs);

                for(var i = 0; i < patLogs.length; i -= -1) {
                    if(patLogs[i].date == body.log.date) {
                        console.log("Found")
                        today = i;
                    }
                }

                if(today !== null) {
                    console.log("updating")
                    patLogs[today] = body.log;
                    console.log(patLogs)
                } else {
                    patLogs.push(body.log);
                }

                pat.markModified("logs");

                pat.save().then((val) => {
                    console.log(val);
                    res.status(200);
                    res.send();
                });
            })
        }
    });
})

function isToday(date) {
    let today = new Date();
    console.log(today + " and " + date)
    return (date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear());
}

mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(port, () => console.log("App listening!"))
})

function generateSalt(password) {
    return new Promise((res,rej) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            res(hash);
            if(err) {
                rej("Password error.");
            }
        });
    });
}
