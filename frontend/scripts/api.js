document.getElementById("login").addEventListener("submit", login);

document.getElementById("providerInputForm").addEventListener("submit", addProvider);

function login(event) {
    event.preventDefault();

    const type = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;

    fetch('http://carelog.online/api/auth/login', {
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
            window.location.replace("http://carelog.online/" + type);
        }
    });
}

function addProvider(param) {
    fetch('http://carelog.online/api/patient/associate', {
        method: 'post',
        body: JSON.stringify({
            email: param,
            token: window.localStorage.getItem('token')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        //window.location.replace('http://carelog.online/patient')
        //window.location.reload();
    })
}

function getPatientInfo(id) {
    return new Promise((resolve, rej) =>  {
        fetch('http://carelog.online/api/patient/getPatientInfo', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token,
            id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((json) => 
        resolve(json))
    })
    });
}

function getPatients() {
    return new Promise((resolve, rej) =>  {
        let logs = [];
        fetch('http://carelog.online/api/provider/getPatients', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        resolve(res);
    });
    });
}

function getPatientLogs(id) {
    return new Promise((resolve, rej) =>  {
        let logs = [];
        fetch('http://carelog.online/api/patient/getLogs', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token,
            id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        resolve(res);
    });
    });
}

function register(event) {
    event.preventDefault();
    
    const type = event.target[0].value;
    const name = event.target[1].value;
    const phone = event.target[2].value;
    const email = event.target[3].value;
    const password = event.target[4].value;

    fetch('http://carelog.online/api/auth/register', {
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
        if(res.error) { return res } else {
            window.location.replace("http://carelog.online/login.html")
        }
        
    }).then((res) => {
        if(res.error) {
            document.getElementById("register-error").innerHTML = res.error;
        } else {
            window.location.replace("http://carelog.online/login.html");
            window.location.reload();
        }
    });
}

function analyzeSentiment(text) {
    return new Promise((resolve, rej) =>  {
        let logs = [];
        fetch('http://carelog.online/api/provider/analyzeSentiment', {
        method: 'post',
        body: JSON.stringify({
            text: text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        resolve(res);
    });
    });
}

function emptyLog() {
    return new Promise((resolve, rej) =>  {
        var empty = {
            date: Date.now(),
            object: {
                mood: 3,
                message: ""
            }
        };
    fetch('http://carelog.online/api/patient/updateLog', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token,
            log: empty
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        resolve();
    })
    });
}

function logout() {
    window.localStorage.removeItem("token");
    window.location.replace("http://carelog.online/login.html")
}

function saveLog(log) {
    return new Promise((resolve, rej) =>  {
    fetch('http://carelog.online/api/patient/updateLog', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token,
            log: log
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        resolve();
    })
    });
}

function getLogs() {
    return new Promise((resolve, rej) =>  {
        let logs = [];
        fetch('http://carelog.online/api/patient/getLogs', {
        method: 'post',
        body: JSON.stringify({
            token: localStorage.token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((res) => {
        logs = res.logs;
        for(var i = 0; i < logs.length; i++) {
            logs[i] = {
                date: logs[i].date,
                object: logs[i].object
            };
        }
        resolve(logs);
    });
    }
)};