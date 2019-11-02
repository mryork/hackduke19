function getLogs() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res([
                // {
                //     id: "3udiuw2",
                //     date: Date.now() - 1000,
                //     object: {
                //         mood: 5,
                //         message: "Wow!"
                //     }
                // },
                {
                    id: "3udiuq3221nw2",
                    date: Date.now() - 150000000,
                    object: {
                        mood: 3,
                        message: "coool"
                    }
                }
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