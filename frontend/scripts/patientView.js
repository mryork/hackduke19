

export const isToday = function(date) {
    let todaysDate = new Date();
    return (date.getDate() == todaysDate.getDate() &&
            date.getMonth() == todaysDate.getMonth() &&
            date.getFullYear() == todaysDate.getFullYear()) ? date : false;
}

export const renderLog = function(log) {
    $("#root .logView").replaceWith(`
    <div class="logView column is-four-fifths-desktop is-two-thirds-mobile is-mobile">
        <div class="logMood">
            <h1 class="title is-3">Mood</h1>
            <h2 class="subtitle is-5">How are you feeling today?</h2>
            <div class="logMoodSelector">
                <img class="mood" id="1" src="/imgs/mood1_inactive.png" alt="Bad Mood">
                <img class="mood" id="2" src="/imgs/mood2_inactive.png" alt="Not Great Mood">
                <img class="mood" id="3" src="/imgs/mood3_inactive.png" alt="OK Mood">
                <img class="mood" id="4" src="/imgs/mood4_inactive.png" alt="Good Mood">
                <img class="mood" id="5" src="/imgs/mood5_inactive.png" alt="Great Mood">
            </div>
        </div>
        <div class="logDesc">
            <h1 class="subtitle is-3">Description</h1>
            <textarea class="textarea has-fixed-size" rows="4" cols="50">${log.object.message}</textarea>
        </div>
        <button class="button is-success">Save</button>
    </div>
    `);

    $(`#root .logMoodSelector #${log.object.mood}`).attr("src", `/imgs/mood${log.object.mood}_active.png`);
    if (!isToday(new Date(log.date))) {
        $("#root .logDesc .textarea").attr("readonly", "readonly");
        $("#root .logView .button").addClass("is-light");
        $("#root .logView .button").html("Saved");
    } else {
        $("#root .logMoodSelector .mood").on("click", function(evt) {
            for (var i = 0; i < 5; i++) {
                $(`#root .logMoodSelector #${log.object.mood}`).attr("src", `/imgs/mood${log.object.mood}_inactive.png`);
            }
            $(`#root .logMoodSelector #${evt.target.id}`).attr("src", `/imgs/mood${evt.target.id}_active.png`);
            log.object.mood = evt.target.id;
        });
        $("#root .logView .button").on("click", function() {
            saveLog(log).then(function() {
                $("#root .logView .button").html("Saved!");
            });
        });
    }

    saveLog(log);
}

export const loadView = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // render log dates listview
    getLogs().then(y => {
        let today = y.find(x => {
            return isToday(new Date(x.date));
        });
        if (!today) {
            emptyLog().then(() => {
                getLogs().then(z => { y = z; });
            });
        }
        y.forEach(x => {
            let date = new Date(x.date);
            console.log(width)
            $("#root .datePanel").append(`
            <div id="${x.id}" class="dateObj">
                <h1>${width > 500 ? monthNames[date.getMonth()] : monthNames[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}</h1>
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
        $("#root .datePanel").append(`<div class="scrollUpArrow"></div>`);
        $("#root .datePanel").append(`<div class="scrollDownArrow"></div>`);
        $("#root .datePanel .scrollUpArrow").css("left", $("#root .datePanel").width()/2-16);
        $("#root .datePanel .scrollDownArrow").css("left", $("#root .datePanel").width()/2-16);
        $("#root .datePanel .scrollDownArrow").css("top", $(window).height()*.97-10);
        $(window).resize(function() {
            $("#root .datePanel .scrollUpArrow").css("left", $("#root .datePanel").width()/2-16);
            $("#root .datePanel .scrollDownArrow").css("left", $("#root .datePanel").width()/2-16);
        })
        $("#root .datePanel").on("scroll", function() {
            console.log(Math.abs($("#root .datePanel").scrollTop() - ($("#root .datePanel .dateObj").height()*(y.length)-$(window).height()*.9)) < 5)
            if ($("#root .datePanel").scrollTop() != 0) {
                $("#root .datePanel .scrollUpArrow").addClass("active");
            } else {
                $("#root .datePanel .scrollUpArrow").removeClass("active");
            }
            if (Math.abs($("#root .datePanel").scrollTop() - ($("#root .datePanel .dateObj").height()*(y.length)-$(window).height()*.9)) < 5) {
                $("#root .datePanel .scrollDownArrow").removeClass("active");
            } else {
                $("#root .datePanel .scrollDownArrow").addClass("active");
            }
        });
    });
}

$(function() {
    loadView();
});