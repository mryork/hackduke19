
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export const isToday = function(date) {
    let todaysDate = new Date();
    return (date.getDate() == todaysDate.getDate() &&
            date.getMonth() == todaysDate.getMonth() &&
            date.getFullYear() == todaysDate.getFullYear()) ? date : false;
}

export const updateScrollArrows = function(maxScroll) {
    console.log(Math.abs($("#root .datePanel").scrollTop() - maxScroll) < 5)
    if ($("#root .datePanel").scrollTop() != 0) {
        $("#root .datePanel .scrollUpArrow").addClass("active");
        $("#root .datePanel .scrollUpArrow").css("opacity", `${$("#root .datePanel").scrollTop()/maxScroll}`);
    } else {
        $("#root .datePanel .scrollUpArrow").removeClass("active");
    }
    if (Math.abs($("#root .datePanel").scrollTop() - maxScroll) < 5) {
        $("#root .datePanel .scrollDownArrow").removeClass("active");
    } else if (maxScroll > 0) {
        $("#root .datePanel .scrollDownArrow").addClass("active");
        $("#root .datePanel .scrollDownArrow").css("opacity", `${(maxScroll-$("#root .datePanel").scrollTop())/maxScroll}`);
    }
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
        <button class="button">Save</button>
    </div>
    `);

    $(`#root .logMoodSelector #${log.object.mood}`).attr("src", `/imgs/mood${log.object.mood}_active.png`);
    $("#root .logDesc .textarea").attr("readonly", "readonly");
    $("#root .logView .button").addClass("is-light");
    $("#root .logView .button").html("Saved");
    
    // saveLog(log);
}

export const loadStats = function(id) {
    var ctx = $(".modal #patChart");
    var moodData = [];
    var sentimentData = [];
    var dates = [];
    
    getPatientLogs(id).then(logs => {
        logs.logs.forEach(log => {
            moodData.push(Number(log.object.mood));
            var date = new Date(log.object.mood);
            dates.push(monthNames[date.getMonth()].slice(0,3) + ' ' + date.getDate());
            analyzeSentiment(log.object.message).then(sent => {
                sentimentData.push(Math.floor((sent.sentiment+2)*5/3));
            });
        });
        console.log(moodData);
        console.log(sentimentData)
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Patient Mood',
                    backgroundColor: 'rgba(242, 48, 51, .5)',
                    borderColor: 'rgba(242, 48, 51, .5)',
                    data: moodData,
                    fill: false
                }, {
                    label: 'Patient Sentiment',
                    backgroundColor: 'rgba(48, 54, 242, .5)',
                    borderColor: 'rgba(48, 54, 242, .5)',
                    data: Array(sentimentData),
                    fill: false
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Mood/Sentiment'
                        }
                    }]
                }
            }
        });;
    });
}

export const loadView = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight :screen.height;
    
    getPatients().then(ids => {
        ids = ids.patients;
        ids.forEach(id => {
            getPatientInfo(id).then(obj => {
                console.log("HI" + obj)
                $("#root .datePanel .select select").append(`
                <option value="${id}">${obj.name}</option>
                `);
            });
        });
        $(".modal-content #patChart").css("width", width/2);
        $(".modal-content #patChart").css("height", height/2);
        $(`#root .datePanel .select select`).on("change", function(opt) {
            console.log(opt.target.value)
            // load patient statistics
            $(".navbar #patStats").removeClass("is-light");
            $(".navbar #patStats").addClass("is-cancel");
            $(".navbar #patStats").unbind();
            $(".navbar #patStats").on("click", function() {
                loadStats(opt.target.value);
                $(".modal").addClass("is-active");
                $(".modal-card-foot .button").on("click", function() {
                    $(".modal").removeClass("is-active");
                });
            });
            // render log dates listview
            getPatientLogs(opt.target.value).then(y => {
                y = y.logs;
                let today = false;
                today = y.filter((log) => { return isToday(new Date(log.date)) !== false});
                $("#root .datePanel .dateObj").remove();
                y.forEach(x => {
                    let date = new Date(x.date);
                    $("#root .logView").html("");
                    $("#root .datePanel").append(`
                    <div id="${x.date}" class="dateObj">
                        <h1>${width > 500 ? monthNames[date.getMonth()] : monthNames[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}</h1>
                    </div>
                    `);
                    $(`#root .datePanel #${x.date}`).on("click", function() {
                        $("#root .datePanel .activeDate").removeClass("activeDate");
                        $(`#root .datePanel #${x.date}`).addClass("activeDate");
                        renderLog(x);
                    });
                });
                if (today.length !== 0) {
                    $(`#root .datePanel #${today[0].date}`).addClass("activeDate");
                    renderLog(today[0]);
                }
                $("#root .datePanel").append(`<div class="scrollUpArrow"></div>`);
                $("#root .datePanel").append(`<div class="scrollDownArrow"></div>`);
                $("#root .datePanel .scrollUpArrow").css("left", $("#root .datePanel").width()/2-16);
                $("#root .datePanel .scrollDownArrow").css("left", $("#root .datePanel").width()/2-16);
                $("#root .datePanel .scrollDownArrow").css("top", $(window).height()*.97-10);
                $(window).resize(function() {
                    $("#root .datePanel .scrollUpArrow").css("left", $("#root .datePanel").width()/2-16);
                    $("#root .datePanel .scrollDownArrow").css("left", $("#root .datePanel").width()/2-16);
                });
                let maxScroll = $("#root .datePanel .dateObj").height()*(y.length)-$(window).height()*.9;
                updateScrollArrows(maxScroll);
                $("#root .datePanel").on("scroll", function() {
                    updateScrollArrows(maxScroll);
                });
            });
        });
    });
    
}

$(function() {
    loadView();
});
