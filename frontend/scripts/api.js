document.getElementById("login").addEventListener("submit", login);
document.getElementById("register").addEventListener("submit", register)

function login(event) {
    event.preventDefault();

    const type = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;

    fetch('http://localhost/api/auth/login', {
        method: 'post',
        body: JSON.stringify({
            type: type,
            email: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        if(res.error) {
            document.getElementById("login-error").innerHTML = res.error;
        } else {
            const token = res.token;
    
            window.localStorage.setItem("token", token);
        }
    });
}

function register(event) {
    event.preventDefault();
    
    const type = event.target[0].value;
    const name = event.target[1].value;
    const phone = event.target[2].value;
    const email = event.target[3].value;
    const password = event.target[4].value;

    fetch('http://localhost/api/auth/register', {
        method: 'post',
        body: JSON.stringify({
            type: type,
            name: name,
            phone: phone,
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        if(res.error) {
            document.getElementById("register-error").innerHTML = res.error;
        } else {
            window.location.replace("http://localhost/login.html");
        }
    });
}

function realgetLogs() {
    fetch('http://clickin.space/api/', {
        method: 'post',
        body: JSON.stringify()
    }).then((res) => {

    }).catch(() => {
        // No.
    })
}

function getLogs() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res([
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 1*86400000 ,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3uduw2",
                    date: Date.now() - 2*86400000 ,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221w2",
                    date: Date.now() - 3*86400000 ,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "udiuw2",
                    date: Date.now() - 4*86400000 ,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw",
                    date: Date.now() - 5*86400000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3iuw2",
                    date: Date.now() - 6*86400000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 7*86400000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 8*86400000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 9*86400000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
                {
                    id: "3udiuw2",
                    date: Date.now() - 1000,
                    object: {
                        mood: 5,
                        message: "Wow!"
                    }
                },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                },
            ])
        })
    })
}

function saveLog(log) {
    return new Promise((res, rej) => {
        res("Saved!");
    })
}

function emptyLog() {
    return new Promise((res, rej) => {
       res("Created!"); 
    });
}