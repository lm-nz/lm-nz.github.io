document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading game...")
    createSquares();

    let gameFinised = false;
    let enterCooldown= false;

    const queryString = window.location.search;
    console.log("Grabbing word...")
    const urlParams = new URLSearchParams(queryString);


    const answer_encrypted = urlParams.get("word");

    let results = [["","","","",""],
                   ["","","","",""],
                   ["","","","",""],
                   ["","","","",""],
                   ["","","","",""],
                   ["","","","",""],]
    
    let answer_decrypted = ""


    console.log("Decrypting word...")
    if (answer_encrypted == null) {
        let wordNotSetModal = document.getElementById("modal-no-word-set");
        wordNotSetModal.style.visibility = "hidden";
        wordNotSetModal.classList.add("animate__animated");
        wordNotSetModal.classList.add("animate__bounceInDown");
        wordNotSetModal.style.visibility = "visible";
    }
    for (let i=0; i<5; i++) {
        switch (answer_encrypted[i]) {
            case "h": answer_decrypted += "a"; break;
            case "i": answer_decrypted += "b"; break;
            case "t": answer_decrypted += "c"; break;
            case "I": answer_decrypted += "d"; break;
            case "s": answer_decrypted += "e"; break;
            case "H": answer_decrypted += "f"; break;
            case "N": answer_decrypted += "g"; break;
            case "c": answer_decrypted += "h"; break;
            case "r": answer_decrypted += "i"; break;
            case "y": answer_decrypted += "j"; break;
            case "L": answer_decrypted += "k"; break;
            case "T": answer_decrypted += "l"; break;
            case "o": answer_decrypted += "m"; break;
            case "F": answer_decrypted += "n"; break;
            case "S": answer_decrypted += "o"; break;
            case "u": answer_decrypted += "p"; break;
            case "C": answer_decrypted += "q"; break;
            case "k": answer_decrypted += "r"; break;
            case "D": answer_decrypted += "s"; break;
            case "z": answer_decrypted += "t"; break;
            case "B": answer_decrypted += "u"; break;
            case "J": answer_decrypted += "v"; break;
            case "R": answer_decrypted += "w"; break;
            case "Q": answer_decrypted += "x"; break;
            case "q": answer_decrypted += "y"; break;
            case "j": answer_decrypted += "z"; break;
            default: answer_decrypted += "a"; break;
        }
    }
    

    const answer = answer_decrypted;
    let answer_lettersLeft = answer.split("")
    
    
    let guessedWords = [[]];
    let availableSpace = 1;

    let guessedWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button");

    console.log("Ready!")


    function getCurrentWordArray() {
        const numberOfGuesses = guessedWords.length
        return guessedWords[numberOfGuesses-1]
    }


    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArray()

        if (currentWordArray && currentWordArray.length < 5) {
            currentWordArray.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace++;

            availableSpaceEl.textContent = letter;
        }
    }


    function getTileColour(letter, index, currentWordArray) {
        for (let i=0; i<5; i++) {
            if (currentWordArray[i] == answer[i]) {
                answer_lettersLeft[i] = "";
            }
        }

        if (letter == answer[index]) {
            answer_lettersLeft[index] = "";
            results[guessedWordCount-1][index] = "🟩";
            return "#70cd5a"; // GREEN
        }

        if (!answer_lettersLeft.includes(letter)) {
            results[guessedWordCount-1][index] = "⬜";
            return "#a6a6a6"; // GREY
        }

        pos = answer_lettersLeft.indexOf(letter);
        answer_lettersLeft[pos] = "";
        results[guessedWordCount-1][index] = "🟨";
        return "#d49e39"; // YELLOW

    }


    function handleSubmitWord() {
        console.log("Checking guess...")
        enterKey = document.getElementById("key-enter");
        enterKey.disabled = true;
        let currentWordArray = getCurrentWordArray();
        if (currentWordArray.length != 5) {
            let wordTooShortModal = document.getElementById("modal-word-too-short");
            wordTooShortModal.style.visibility = "hidden";
            wordTooShortModal.classList.add("animate__animated");
            wordTooShortModal.classList.add("animate__bounceInDown");
            wordTooShortModal.style.visibility = "visible";
            setTimeout(() => {
                wordTooShortModal.classList.remove("animate__bounceInDown");
                wordTooShortModal.classList.add("animate__bounceOutUp");
            }, 1250)
            wordTooShortModal.classList.remove("animate__bounceOutUp");
            currentWordArray = [];
          return;
        }
    
        const currentWord = currentWordArray.join("");
        
        try {  
            if (!(guessableWords.includes(currentWord.toLowerCase())) && (currentWord != answer)) {
                throw Error;
            }

            const firstLetterId = guessedWordCount * 5 + 1;
            let interval = 65;

            answer_lettersLeft = answer.split("");
            
            currentWordArray.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColour = getTileColour(letter, index, currentWordArray);
                    const letterEl = document.getElementById(firstLetterId + index);
                    const keyEl = document.getElementById(`key-${currentWordArray[index]}`);
                    
                    setTimeout(() => {
                        letterEl.classList.add("animate__bounce");
                        letterEl.style = `background-color:${tileColour}`
                        keyBack = String(window.getComputedStyle(keyEl, null).getPropertyValue("background-color"));
                        if (keyBack != "rgb(112, 205, 90)") {
                            if (keyBack != "rgb(166, 166, 166)" && keyBack != "rgb(212, 158, 57)") {
                                keyEl.style = `background-color:${tileColour}`;
                            }
                            else if (tileColour == "#d49e39") {
                                keyEl.style = `background-color:${tileColour}`;
                            }   
                            else if (tileColour == "#70cd5a") {
                                keyEl.style = `background-color:${tileColour}`;
                            }
                        }
                        
                    }, (interval*index)/2)
                }, interval);
            })

            guessedWordCount++;

            enterKey = document.getElementById("key-enter");
            enterKey.removeAttribute("disabled")

            if (currentWord == answer) {
                console.log("Word guessed correctly!")
                gameFinised = true;
                for (let i=0; i<5; i++) {
                    results[guessedWordCount-1][i] = "🟩";
                }
                keyboard = document.getElementById("keyboard-container").childNodes;
                keyboard.forEach((row) => {
                    row.childNodes.forEach((key) => {
                        key.disabled = true;
                    })
                });
                setTimeout(() => {
                    let wordGuessedModal = document.getElementById("modal-word-guessed");
                    wordGuessedModal.style.visibility = "hidden";
                    wordGuessedModal.classList.add("animate__animated");
                    wordGuessedModal.classList.add("animate__bounceInDown");
                    let wordGuessedP = document.getElementById("modal-guessed-header-p");
                    wordGuessedP.textContent += `Wilkins Wordle: ${guessedWordCount}/6\n`
                    for (let i=0; i<guessedWordCount; i++) {
                        wordGuessedP.textContent += results[i].join("");
                        if (i != 5) {
                            wordGuessedP.textContent += "\n";
                        }
                    }
                    wordGuessedModal.style.visibility = "visible";
                }, 300)
            }

            else if (guessedWordCount == 6) {
                console.log("Word not guessed")
                setTimeout(() => {
                    let wordNotGuessedModal = document.getElementById("modal-word-not-guessed");
                    wordNotGuessedModal.style.visibility = "hidden";
                    wordNotGuessedModal.classList.add("animate__animated");
                    wordNotGuessedModal.classList.add("animate__bounceInDown");
                    let wordNotGuessedP = document.getElementById("modal-not-guessed-header-p");
                    let wordNotGuessedWord = document.getElementById("modal-not-guessed-header-word")
                    wordNotGuessedWord.textContent = `The word was ${answer}!`;
                    wordNotGuessedP.textContent += `Wilkins Wordle: X/6\n`
                    for (let i=0; i<guessedWordCount; i++) {
                        wordNotGuessedP.textContent += results[i].join("");
                        if (i != 5) {
                            wordNotGuessedP.textContent += "\n";
                        }   
                    }
                    wordNotGuessedModal.style.visibility = "visible";
                }, 300)
                
            }
            else {
                console.log("Guess is incorrect")
            }

            guessedWords.push([]);
        }
        catch (e) {
            console.log("Guessed word not found!");
            let wordNotFoundModal = document.getElementById("modal-word-not-found");
            wordNotFoundModal.style.visibility = "hidden";
            wordNotFoundModal.classList.add("animate__animated");
            wordNotFoundModal.classList.add("animate__bounceInDown");
            wordNotFoundModal.style.visibility = "visible";
            setTimeout(() => {
                wordNotFoundModal.classList.remove("animate__bounceInDown");
                wordNotFoundModal.classList.add("animate__bounceOutUp");
            }, 1250)
            wordNotFoundModal.classList.remove("animate__bounceOutUp");
        }
    }
        


    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i+1);
            gameBoard.appendChild(square); 
        }
    }

    function handleDeleteLetter() {
        const currentWordArray = getCurrentWordArray();

        if (currentWordArray.length != 0){
            currentWordArray.pop();
        
            guessedWords[guessedWords.length-1] = currentWordArray;
        
            const lastLetterEl = document.getElementById(String(availableSpace-1));
        
            lastLetterEl.textContent = "";
            availableSpace--;
        }  
    } 

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if (letter == "enter") {
                handleSubmitWord();
                return;
            }

            if (letter == "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
            enterKey = document.getElementById("key-enter");
            if (enterKey.disabled == true) {
                enterKey.removeAttribute("disabled")
            }
        }
    }

    document.addEventListener("keydown", (event) => {
        let key = String(event.key).toLowerCase()
        if ((["a","b","c","d","e","f",
              "g","h","i","j","k","l","m",
              "n","o","p","q","r","s","t",
              "u","v","w","x","y","z"
        ].includes(key)) && gameFinised == false) {
            updateGuessedWords(key);
        }
        else if (key == "backspace" && gameFinised == false) {
            handleDeleteLetter()
        }
        else if (key == "enter"  && gameFinised == false && enterCooldown == false) {
            enterCooldown = true;
            handleSubmitWord();
            setTimeout(() => {
                enterCooldown = false;
            }, 500);
        }
    });
});
