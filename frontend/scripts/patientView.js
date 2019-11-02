

export const renderLog = function(log) {
    $("#root .logView").replaceWith(`
    <div class="logView column is-four-fifths">
        <div class="logDate">
            <h1>Date: ${log.date}</h1>
        </div>
        <div class="logMood">
            <h1>Mood</h1>
            <div class="logMoodSelector">
                <img class="mood" id="1" src="/imgs/mood1_inactive.png" alt="Bad Mood">
                <img class="mood" id="2" src="/imgs/mood2_inactive.png" alt="Not Great Mood">
                <img class="mood" id="3" src="/imgs/mood3_inactive.png" alt="OK Mood">
                <img class="mood" id="4" src="/imgs/mood4_inactive.png" alt="Good Mood">
                <img class="mood" id="5" src="/imgs/mood5_inactive.png" alt="Great Mood">
            </div>
        </div>
        <div class="logDesc">
            <h1>Description</h1>
            <textarea rows="4" cols="50">${log.object.message}</textarea>
        </div>
        <button class="button is-success">Save</button>
    </div>
    `);

    $(`#root .logMoodSelector #${log.object.mood}`).attr("src", `/imgs/mood${log.object.mood}_active.png`);
    $("#root .logMoodSelector .mood").on("click", function(evt) {
        for (var i = 0; i < 5; i++) {
            $(`#root .logMoodSelector #${log.object.mood}`).attr("src", `/imgs/mood${log.object.mood}_inactive.png`);
        }
        $(`#root .logMoodSelector #${evt.target.id}`).attr("src", `/imgs/mood${evt.target.id}_active.png`);
        log.object.mood = evt.target.id;
    });

    $("#root .logView .button .is-success").on("click", function() {
        saveLog(log);
    });

    saveLog(log);
}

export const loadView = function() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // render log dates listview
    getLogs().then(y => {
        let todaysDate = new Date();
        let today = y.find(x => {
            let date = new Date(x.date);
            return (date.getDate() == todaysDate.getDate() &&
                    date.getMonth() == todaysDate.getMonth() &&
                    date.getFullYear() == todaysDate.getFullYear()) ? x : false;
        });
        if (!today) { saveLog(); }
        y.forEach(x => {
            let date = new Date(x.date);
            $("#root .datePanel").append(`
            <div id="${x.id}" class="dateObj">
                <h1>${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</h1>
            </div>
            `);
            $(`#root .datePanel #${x.id}`).on("click", function() {
                $("#root .datePanel .activeDate").removeClass("activeDate");
                $(`#root .datePanel #${x.id}`).addClass("activeDate");
                renderLog(x);
            });
        });
        if (today) {
            $(`#root .datePanel #${today.id}`).addClass("activeDate");
            renderLog(today);
        }
    });
}

$(function() {
    loadView();
});