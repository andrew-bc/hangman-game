let wordsArray = ["яблоко", "мёд"]
let randomNumber = Math.round(Math.random() * (wordsArray.length - 1))
let randomWord = wordsArray[randomNumber].toUpperCase();


let imageEl = document.querySelector(".game__image-item");
let testEl = document.querySelector(".test");
let wordEl = document.querySelector(".game__word");
let lettersEl = document.querySelectorAll(".game__letters-letter");
let gameOverEl = document.querySelector(".game__over");
let gameWinEl = document.querySelector(".game__win");
let attempt = 0;
let numberOfTrueLetters = 0;

let renderWord = () => {
    wordEl.innerHTML = "";
    for (let i = 0; i < randomWord.length; i++) {
        wordEl.innerHTML += `<div class="game__word-letter">_</div>`;
    }
}

let checkUserAnswer = (letter) => {
    return randomWord.includes(letter);
}

let renderUserWord = (letter) => {
    let gameLetter = document.querySelectorAll(".game__word-letter");
    gameLetter.forEach((el, index) => {
        let letterHTML = el.textContent;
        if (letterHTML == "_" && randomWord[index] == letter) {
            el.textContent = letter;
            numberOfTrueLetters++;
        }
        if (numberOfTrueLetters == randomWord.length) {
            renderWinGame();
        }
    })
}


let renderUserLetter = (e, userAnswer) => {
    if (userAnswer) {
        e.target.classList.add("letter-yes");
    } else {
        e.target.classList.add("letter-no");

    };
    e.target.classList.remove("hover");

}

let renderImage = () => {
    //imageEl
    if (attempt < 6) {
        imageEl.src = `images/Hangman-${attempt}.png`;
    } else {
        imageEl.src = `images/Hangman-${attempt}.png`;
        renderStopGame();
    }
}

let renderStopGame = () => {
    wordEl.innerHTML = "";
    for (let i = 0; i < randomWord.length; i++) {
        wordEl.innerHTML += `<div class="game__word-letter">${randomWord[i]}</div>`;
    }
    gameOverEl.innerHTML = "ВЫ ПРОИГРАЛИ!!!"
    gameOverEl.style.display = "block";
    lettersEl.forEach(item => {
        item.removeEventListener("click", letterClickHandler)
    })
}

let renderWinGame = () => {
    gameWinEl.innerHTML = "ВЫ ВЫИГРАЛИ!!! ПОЗДРАВЛЯЕМ!!!"
    gameWinEl.style.display = "block";
    lettersEl.forEach(item => {
        item.removeEventListener("click", letterClickHandler)
    })

}

let letterClickHandler = (e) => {
    let letter = e.target.textContent.toUpperCase();
    if (checkUserAnswer(letter)) {
        renderUserWord(letter);
    } else {
        attempt++;
        renderImage()
    }
    renderUserLetter(e, checkUserAnswer(letter));
    e.target.removeEventListener("click", letterClickHandler);
}


lettersEl.forEach(item => {
    item.addEventListener("click", letterClickHandler)
})



console.log(randomWord);

renderWord();