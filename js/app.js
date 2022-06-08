var mstats = {
    "streak": 0,
    "wins": 0,
    "games": 0,
    "lastPlayed": "1/1/2000",
    "lastWon": "1/1/2000",
};
var mtimer = {
    "timeStarted": getSecondsIntoDay(),
    "timeFinished": -1
};
var theBigDay = new Date('December 8, 1999');
var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.daily;
var daysSinceBday = Math.floor(((today - theBigDay) / 8.64e7));
if (value == "true") {
    var seed = xmur3(daysSinceBday.toString());
} else {
    var seed = xmur3(((new Date()).getTime()).toString());
}
var rand = mulberry32(seed());
var goal = -1;
var operands = [];
var operations = [
    math.add,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.mod,
    math.mod,
    math.mod,
    math.mod,
    math.mod,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.pow,
    math.pow,
    math.pow,
    math.pow,
    math.pow,
    math.subtract
]

operandsToSymbol = {
    "add": "+",
    "divide": "/",
    "mod": "%",
    "multiply": "*",
    "pow": "^",
    "subtract": "-"
}
op1 = plusminus()
op2 = plusminus()
window.onload = function () {

    var prevMstats = getCookie("mstats");
    var prevMtimer = getCookie("mtimer");
    var today = (new Date()).toLocaleDateString("en-US");

    if (prevMstats === "") {
        var e = '01/01/2025';
        document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    } else {
        mstats = JSON.parse(prevMstats);
        if (mstats.lastPlayed !== today) {
            mstats.games++;
            mstats.lastPlayed = today;
        }
        document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    }

    if (prevMtimer === "") {
        var e = '01/01/2025';
        document.cookie = 'mtimer=' + JSON.stringify(mtimer) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    } else {
        mtimer = JSON.parse(prevMtimer);

        if (mstats.lastWon != today) {
            mtimer.timeFinished = -1
        }

    }

    document.getElementById('games').innerHTML = "Games played: " + mstats.games;
    document.getElementById('wins').innerHTML = "Wins: " + mstats.wins;
    document.getElementById('win-perc').innerHTML = "Win Percentage: " + mstats.wins / mstats.games * 100 + "%";
    document.getElementById('streak').innerHTML = "Streak: " + mstats.streak;
    document.getElementById('time').innerHTML = "Time took: " + getTimeTook();


    while (operands.length < 4) {
        var r = Math.floor(rand() * 10) + 1;
        if (operands.indexOf(r) === -1) operands.push(r);
    }

    var takes = 0;

    while (!math.isPositive(goal) || !math.isInteger(goal) || goal < 1 || goal > 100 || operands.indexOf(goal) != -1) {
        try {
            takes++;
            // choose 3 operations
            var op1index = Math.floor(rand() * operations.length);
            var op2index = Math.floor(rand() * operations.length);
            var op3index = Math.floor(rand() * operations.length);
            // apply operations
            var resultAfter1 = operations[op1index](operands[0], operands[1]);
            var resultAfter2 = operations[op2index](operands[2], resultAfter1);
            goal = operations[op3index](operands[3], resultAfter2);
        } catch (error) {
            continue;
        }
    }

    let answerStr = "(" +  operands[3] + operandsToSymbol[operations[op3index].name] + "(" + operands[2]  + operandsToSymbol[operations[op2index].name] +  "(" + operands[0] + operandsToSymbol[operations[op1index].name] + operands[1] + ")))"
    document.getElementById("answers").innerHTML = getDer(operands[1], operands[2]);
    
    console.log(takes);
    console.log(answerStr);

    shuffleArray(operands);
    document.getElementById('num1').innerHTML = "d/dx";
    document.getElementById('num2').innerHTML = operands[1] + "x&sup2";
    document.getElementById('num3').innerHTML = op1;
    document.getElementById('num4').innerHTML = operands[2] + "x";
    document.getElementById('num5').innerHTML = op2;
    document.getElementById('num6').innerHTML = operands[3];
}
function plusminus(){
    n = Math.floor(Math.random() * (1 - 0 + 1) + 0)
    if(n == '1') {
        return "+";
    }
    else {
        return "-";
    }
}

function getDer(num1, num2) {
    num1 = num1 + ""
    num2 = num2 + ""
    deriv = math.derivative(num1 + 'x^2'+ op1 + num2 + 'x', 'x')
    console.log(deriv)
    return deriv
}
function check() {
    try {
        var inputStr = document.getElementById("math-input").value.trim();

        if (inputStr === "clear") {
            document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
            document.cookie = 'mtimer=' + JSON.stringify(mtimer) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
            location.reload();
            return false;
        }

        console.log(inputStr);
        console.log(getDer(operands[1], operands[2]));
        if (!inputStr) {
            showResult("No input");
            return;
        }
        
        

       // var inputVal = math.evaluate(inputStr);

        if (inputStr == getDer(operands[1], operands[2])) {

            showResult("Correct!");

            var todayDate = new Date()
            var today = todayDate.toLocaleDateString("en-US");
            var yesterdayDate = new Date();
            yesterdayDate.setDate(todayDate.getDate() - 1);
            var yesterday = yesterdayDate.toLocaleDateString("en-US");

            if (mstats.lastWon === yesterday) {
                mstats.streak++;
            } else {
                mstats.streak = 1;
            }

            if (mtimer.timeFinished == -1) {
                mtimer.timeFinished = getSecondsIntoDay();
                document.cookie = 'mtimer=' + JSON.stringify(mtimer) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
            }

            if (today !== mstats.lastWon) {
                mstats.lastWon = today;
                mstats.wins++;
            }

        } else {
            showResult("Incorrect");
        }

        document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
        document.getElementById('games').innerHTML = "Games played: " + mstats.games;
        document.getElementById('wins').innerHTML = "Wins: " + mstats.wins;
        document.getElementById('win-perc').innerHTML = "Win Percentage: " + mstats.wins / mstats.games * 100 + "%";
        document.getElementById('streak').innerHTML = "Streak: " + mstats.streak;
        document.getElementById('time').innerHTML = "Time took: " + getTimeTook();
    } catch (e) {
        showResult("Error: " + e.toString());

    }
}


// HELPERS 

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function timeStart() {
    const watch = document.getElementById("timer");
    let millisecound = 0;
    let timer;
    timer = setInterval(() => {
        millisecound += 1000;
        let dateTimer = new Date(millisecound);
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2)
    }, 1000);
}

function toggleModal(name) {
    if (document.getElementById(name + "-modal").style.display === "block") {
        document.getElementById(name + "-modal").style.display = "none";
    } else {
        document.getElementById(name + "-modal").style.display = "block";
    }
}

/*
function share() {
    const shareData = {
        title: 'CALCLE',
        text: `Time to play CALCLE, nerd. ` +
            ` I used ` + operands[0] + `, ` + operands[1] + `, ` + operands[2] + `, and ` + operands[3] + ` to make ` + goal +
            ` Took me ` + getTimeTook(),
        url: 'https://briansayre.com/mathle/'
    }
    navigator.share(shareData)
}
*/
function daily() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('daily', 'true');
    window.location.search = urlParams;
}

function refresh() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('daily', 'false');
    window.location.search = urlParams;
    
}

function showResult(message) {
    document.getElementById("result-text").innerHTML = message;
    document.getElementById("result-modal").style.display = "block";
}

function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function () {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function getSecondsIntoDay() {
    var d = new Date();
    return ((d.getHours() * 3600) + (d.getMinutes() * 60) + d.getSeconds())
}

function getTimeTook() {
    if (mtimer.timeFinished - mtimer.timeStarted > 0) {
        return (mtimer.timeFinished - mtimer.timeStarted).toString() + " seconds";
    }
    return "Not finished";
}