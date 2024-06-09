console.log("Welcome to Tic Tac Toe");

let music = new Audio("win.mp3");
let boxes = document.querySelectorAll('.tile');
let boxtext = document.querySelectorAll('.boxtext');
let info = document.querySelector('.info');
let image = document.querySelector('.image');
let resetBtn = document.getElementById("reset");
let toggleModeBtn = document.getElementById("toggle-mode");

let turn = "X";
let isGameOver = false;
let isVsAI = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            boxes[e[0]].classList.add('background');
            boxes[e[1]].classList.add('background');
            boxes[e[2]].classList.add('background');
            info.innerText = boxtext[e[0]].innerText + " Won!";
            isGameOver = true;
            image.getElementsByTagName('img')[0].style.width = "150px";
            music.play();
        }
    });
};

const aiMove = () => {
    if (!isGameOver) {
        let emptyBoxes = [];
        boxtext.forEach((box, index) => {
            if (box.innerText === "") {
                emptyBoxes.push(index);
            }
        });

        if (emptyBoxes.length > 0) {
            let randomMove = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            boxtext[randomMove].innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!isGameOver) {
                info.innerText = "Turn for " + turn;
            }
        }
    }
};

Array.from(boxes).forEach(element => {
    element.classList.add('hover');
    element.addEventListener('click', () => {
        let boxtext = element.querySelector('.boxtext');
        if (!isGameOver && boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!isGameOver) {
                if (isVsAI) {
                    aiMove();
                } else {
                    info.innerText = "Turn for " + turn;
                }
            }
        }
    });
});

resetBtn.addEventListener('click', () => {
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    info.innerText = "Turn for " + turn;
    image.getElementsByTagName('img')[0].style.width = "0";
    Array.from(boxes).forEach(element => {
        element.classList.remove('background');
    });
});

toggleModeBtn.addEventListener('click', () => {
    isVsAI = !isVsAI;
    toggleModeBtn.innerText = isVsAI ? "Play vs Player" : "Play vs AI";
    resetBtn.click();
});
