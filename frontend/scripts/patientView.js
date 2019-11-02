

export const renderLog = function(log) {
    $("#root .logView").replaceWith(`
    <div class="logView">
        <div class="logDate">
            <h1>Date: ${log.date}</h1>
        </div>
        <div class="logMood">
            <h1>Mood</h1>
            <div class="logMoodSelector">
                <img class="mood" id="1" src="frontend/res/mood1.png" alt="Bad Mood">
                <img class="mood" id="2" src="frontend/res/mood2.png" alt="Not Great Mood">
                <img class="mood" id="3" src="frontend/res/mood3.png" alt="OK Mood">
                <img class="mood" id="4" src="frontend/res/mood4.png" alt="Good Mood">
                <img class="mood" id="5" src="frontend/res/mood5.png" alt="Great Mood">
            </div>
        </div>
        <div class="logDesc">
            <h1>Description</h1>
            <textarea rows="4" cols="50">${log.object.message}</textarea>
        </div>
        <button class="button is-success">Save</button>
    </div>
    `);

    $(`#root .logMoodSelector .mood #${log.object.mood}`).addClass("active");
    $("#root .logMoodSelector .mood").on("click", function(evt) {
        $("#root .logMoodSelector .mood").removeClass("active");
        $(`#root .logMoodSelector .mood #${evt.target.id}`).addClass("active");
        log.object.mood = evt.target.id;
    });

    $("#root .logView .button .is-success").on("click", function() {
        saveLog(log);
    });

    saveLog(log);
}

export const loadView = function() {
    // render log dates listview
    getLogs().then(y => {
        y.forEach(x => {
            $("#root .datePanel").append(`
            <div id="${x.id}" class="dateObj">
                <h1>${x.date}</h1>
            </div>
            `);
            $(`#root .datePanel #${x.id}`).on("click", function() {
                $("#root .datePanel .activeDate").removeClass("activeDate");
                $(`#root .datePanel #${x.id}`).addClass("activeDate");
                renderLog(x);
            });
        });
    });
}

$(function() {
    loadView();
});