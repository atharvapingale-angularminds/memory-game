const images = [0, 1, 2, 0, 1, 2];

const imageView = document.querySelector("#imageView");
const imageOverlay = document.querySelector("#imageOverlay");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("scoreEl");
const failedEl = document.getElementById("failedEl");
const overlayView = document.getElementById("overlay");

let openedCards = [];
let score = 0, failed = 0, matchedPairs = 0;

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) { //6
        randomIndex = Math.floor(Math.random() * currentIndex);//0-5 -- 1
        currentIndex--;//5

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function renderCards() {
    document.getElementById("revealBtn").disabled = false;
    score = 0;
    failed = 0;
    matchedPairs = 0;
    openedCards = [];
    scoreEl.textContent = "Score: " + score;
    failedEl.textContent = "Failed Attempts: " + failed;
    shuffle(images);

    let tempStr = "";
    for (let i = 0; i < images.length; i++) {
        tempStr += `
        <img class="image-cards" id="${i}" src="${images[i]}.png" >`
    }
    renderOverlay();
    imageView.innerHTML = tempStr;

}
function revealCards() {

    imageOverlay.style.visibility = "hidden";
    setTimeout(hideCards, 200);

    document.getElementById("revealBtn").disabled = true;
}
function hideCards() {
    imageOverlay.style.visibility = "visible";
}
function renderOverlay() {
    let tempStr = "";
    for (let i = 0; i < images.length; i++) {
        tempStr += `
        <img src="3.png" id="i-${i}">`
    }
    imageOverlay.innerHTML = tempStr;
}
function openCard(id) {
    document.getElementById("revealBtn").disabled = true;
    openedCards.push({ "name": images[id], "id": id });
    if (openedCards.length > 2) {
        while (openedCards.length > 2) {
            openedCards.pop();
        }
        return;
    }
    document.getElementById("i-" + id).style.visibility = "hidden";
    console.log(openedCards);
    if (openedCards.length == 2) {
        if (!checkMatch()) {
            setTimeout(function () {
                console.log(openedCards.at(-2).id, openedCards.at(-1).id)

                closeCard(openedCards.at(-1).id);
                closeCard(openedCards.at(-2).id);
                console.log(openedCards.at(-2).id, openedCards.at(-1).id)

                openedCards = [];

            }, 700);
        }
    }
}
function closeCard(id) {
    document.getElementById("i-" + id).style.visibility = "visible";
}

imageOverlay.addEventListener("click", function (e) {
    console.log(e.target.id.slice(-1));
    if (e.target.id.slice(-1) >= '0' && e.target.id.slice(-1) <= '9') {
        openCard(e.target.id.slice(-1));
    }
})

function checkMatch() {
    if (openedCards.at(-1).name === openedCards.at(-2).name) {
        score += 10;
        scoreEl.textContent = "Score: " + score;
        matchedPairs++;
        if (matchedPairs == 3) {
            gameCompleted();
        }
        openedCards = [];
        return true;
    }
    score -= 5;
    failed++;
    scoreEl.textContent = "Score: " + score;
    failedEl.textContent = "Failed Attempts: " + failed;
    return false;
}

function gameCompleted() {
    overlayView.innerHTML = `<div id="overlay-text">
        <img src="gif.gif" style="width:500px;height:auto;">
        <h1>Score: ${score}</h1></div>`
    overlayView.style.display = "block";

}

overlayView.addEventListener("click", function () {
    overlayView.style.display = "none";
})