const instructionText = document.getElementById("instruction-text");

const c = document.getElementById("c-sharp");
const d = document.getElementById("d-sharp");
const f = document.getElementById("f-sharp");
const g = document.getElementById("g-sharp");
const audioArray = [c, d, f, g];
const fail = document.getElementById("fail");

const redBtn = document.getElementById("red-btn");
const yellowBtn = document.getElementById("yellow-btn");
const purpleBtn = document.getElementById("purple-btn");
const blueBtn = document.getElementById("blue-btn");

redBtn.disabled = true;
yellowBtn.disabled = true;
purpleBtn.disabled = true;
blueBtn.disabled = true;

const btnArray = [redBtn, yellowBtn, purpleBtn, blueBtn];

let round = 0;
let currentTurn = "AI";

let sequence;
let sequenceCount = 0;
let AIInput = 0;

var btnTime = 1000;

const earlyMesssages = ['Great job! :D', 'Wow! So good!', 'Nice!', 'You\'re doing it!', 'Such memory!! ;D ', 'Outstanding!', 'No way! OwO', 'You got it! :)', ];
const midMessages = ['Huh, surprised you made it this far...', 'Really trying hard aren\'t you?', 'Seriously? :|', 'Are you cheating?', 'Ok, fun\'s over.'];
const lateMessages = ['Lose already.', 'Come on, fuck up now.', 'Stop it.', 'No.', 'You\'re done.', 'You can\'t win.']

let playerSequence = [];
let inputCounter = 0;

let follows = 0;

function playBtnSound(i) {
    audioArray[i].play();
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        redBtnClick();
        pushBtn(0)
    } else if (e.keyCode == '40') {
        pushBtn(3);
        blueBtnClick();
    } else if (e.keyCode == '37') {
        pushBtn(1)
        yellowBtnClick();
    } else if (e.keyCode == '39') {
        pushBtn(2)
        purpleBtnClick();
    }
}

function redBtnClick() {
    if (currentTurn == "PLAYER") {
        playerSequence.push(0);
        inputCounter++;
        clickValidation();
    }
    playBtnSound(0);
}

function yellowBtnClick() {
    if (currentTurn == "PLAYER") {
        playerSequence.push(1);
        inputCounter++;
        clickValidation();
    }
    playBtnSound(1);
}

function purpleBtnClick() {
    if (currentTurn == "PLAYER") {
        playerSequence.push(2);
        inputCounter++;
        clickValidation();
    }
    playBtnSound(2);
}

function blueBtnClick() {
    if (currentTurn == "PLAYER") {
        playerSequence.push(3);
        inputCounter++;
        clickValidation();
    }
    playBtnSound(3)
}

function clickValidation() {
    if (checkPlayerSequence()) {
        follows++;
        if (inputCounter == sequenceCount) {
            endPlayerTurn();
        }
    } else {
        endGame();
    }
}

function checkPlayerSequence() {
    for (let i = 0; i < inputCounter; i++) {
        if (playerSequence[i] != sequence[i])
            return false;
    }
    return true;
}

function endPlayerTurn() {
    currentTurn = '';
    round++;
    endRound();
}

let firstTimeDecrement = false;
let secondTimeDecrement = false;

function endRound() {
    redBtn.disabled = true;
    yellowBtn.disabled = true;
    purpleBtn.disabled = true;
    blueBtn.disabled = true;
    if (round < 5) {
        instructionText.innerHTML = earlyMesssages[getRandomInt(earlyMesssages.length)];
    } else if (round >= 10 && round < 15) {
        if (!secondTimeDecrement) {
            btnTime -= 250;
            secondTimeDecrement = true;
        }
        instructionText.innerHTML = lateMessages[getRandomInt(lateMessages.length)]
    } else if (round >= 15) {
        btnTime -= 50;
        instructionText.innerHTML = '...';
    } else {
        if (!firstTimeDecrement) {
            btnTime -= 250;
            firstTimeDecrement = true;
        }
        instructionText.innerHTML = midMessages[getRandomInt(midMessages.length)]
    }
    setTimeout(function() { startAITurn() }, 1500);
}

function startGame() {
    document.getElementById("overlay").classList.add("hide");
    document.getElementById("start-wrapper").classList.add("hide");
    document.getElementById("instruction-wrapper").classList.remove("hide");
    startAITurn();
}

function endGame() {
    fail.play();
    document.getElementById("rounds").innerHTML = "ROUNDS: " + round;
    document.getElementById("score").innerHTML = "SCORE: " + follows;
    document.getElementById("end-overlay").classList.remove("hide");
}

function startPlayerTurn() {
    playerSequence = [];
    inputCounter = 0;
    instructionText.innerHTML = "Your turn.";
    currentTurn = "PLAYER"
    redBtn.disabled = false;
    yellowBtn.disabled = false;
    purpleBtn.disabled = false;
    blueBtn.disabled = false;
}

var AIInterval;

function startAITurn() {
    generateSequence();
    if (btnTime < 1) {
        win();
    } else {
        currentTurn = "AI";
        AIInput = 0;
        instructionText.innerHTML = "My turn.";
        generateSequence();
        AIInterval = setInterval(function() {
            if (AIInput == sequenceCount) {
                endAITurn();
            } else {
                AIPushButton();
            }
        }, btnTime)
    }
}

function pushBtn(id) {
    btnArray[id].classList.add("active");
    playBtnSound(id);
    setTimeout(function() {
        btnArray[id].classList.remove("active");
    }, 200)
}

function AIPushButton() {
    btnArray[sequence[AIInput]].classList.add("active");
    playBtnSound(sequence[AIInput]);
    setTimeout(function() {
        btnArray[sequence[AIInput]].classList.remove("active");
        AIInput++;
    }, 200)
}

function endAITurn() {
    clearInterval(AIInterval);
    startPlayerTurn();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateSequence() {
    if (round >= 5) {
        sequenceCount = round + 1 + getRandomInt(3);
    } else {
        sequenceCount = round + 1;
    }
    let sequenceArray = [];
    for (let i = 0; i < sequenceCount; i++) {
        sequenceArray.push(getRandomInt(4));
    }
    sequence = sequenceArray;
}

function win() {
    document.getElementById("content-wrapper").classList.add("done");
    setTimeout(function() {
        showWinScreen();
    }, 3000)
}

function showWinScreen() {
    document.getElementsByTagName("body")[0].classList.remove("base");
    document.getElementsByTagName("body")[0].classList.add("regi");
}