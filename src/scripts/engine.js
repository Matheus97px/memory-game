const emojis = [[
    "👻",
    "👻",
    "🕷️",
    "🕷️",
    "🎃",
    "🎃",
    "🦇",
    "🦇",
    "🕸️",
    "🕸️",
    "💀",
    "💀",
    "🧙",
    "🧙",
    "🧟",
    "🧟"
], [
    "🐶",
    "🐶",
    "🐱",
    "🐱",
    "🐰",
    "🐰",
    "🐻",
    "🐻",
    "🐼",
    "🐼",
    "🐨",
    "🐨",
    "🐸",
    "🐸",
    "🐷",
    "🐷"
], [
    "🍎",
    "🍎",
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍉",
    "🍉",
    "🍓",
    "🍓",
    "🍊",
    "🍊",
    "🍍",
    "🍍",
    "🍑",
    "🍑"
], [
    "./src/image/anime1.png",
    "./src/image/anime1.png",
    "./src/image/anime2.jpg",
    "./src/image/anime2.jpg",
    "./src/image/anime3.jpg",
    "./src/image/anime3.jpg",
    "./src/image/anime4.jpg",
    "./src/image/anime4.jpg",
    "./src/image/anime5.jpeg",
    "./src/image/anime5.jpeg",
    "./src/image/anime6.jpg",
    "./src/image/anime6.jpg",
    "./src/image/anime7.jpg",
    "./src/image/anime7.jpg",
    "./src/image/anime8.jpg",
    "./src/image/anime8.jpg"
],
[
    "./src/image/zelda1.jpg",
    "./src/image/zelda1.jpg",
    "./src/image/zelda2.jpg",
    "./src/image/zelda2.jpg",
    "./src/image/zelda3.jpg",
    "./src/image/zelda3.jpg",
    "./src/image/zelda4.jpg",
    "./src/image/zelda4.jpg",
    "./src/image/zelda5.jpg",
    "./src/image/zelda5.jpg",
    "./src/image/zelda6.jpg",
    "./src/image/zelda6.jpg",
    "./src/image/zelda7.jpg",
    "./src/image/zelda7.jpg",
    "./src/image/zelda8.jpg",
    "./src/image/zelda8.jpg"
]]



let openCards = []

function playSound(audioName) {
    let audio = new Audio(`src/audios/${audioName}.m4a`)
    audio.play()

    if (audioName === "hit") {
        audio.volume = 0.2
    } else if (audioName === "win") {
        audio.volume = 0.3
    } else if (audioName === "lose") {
        audio.volume = 0.3
    }

}



let time = 31
let timer = setInterval(() => {
    time--

    if (time <= 0) {

        clearInterval(timer)
        alert("Tempo esgotado!")
        document.querySelector(".game").innerHTML = "<h1>Você perdeu!</h1>"
        playSound("lose")

    }
    document.querySelector(".timer span").innerHTML = time
}, 1000)


function sortEmojis(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fundoEmoji(deck) {
    let fundo = document.querySelector("body")
    if (deck == 0) {
        fundo.style.backgroundImage = "url(./src/image/fundo0.jpg)"
        fundo.style.backgroundSize = "cover"
        fundo.style.backgroundPosition = "center"
    } else if (deck == 1) {
        fundo.style.backgroundImage = "url(./src/image/fundo1.jpg)"
        fundo.style.backgroundSize = "cover"
        fundo.style.backgroundPosition = "center"
    } else if (deck == 2) {
        fundo.style.backgroundImage = "url(./src/image/fundo2.jpg)"
        fundo.style.backgroundSize = "cover"
        fundo.style.backgroundPosition = "center"    } else if (deck == 3) {
        fundo.style.backgroundImage = "url(./src/image/fundo3.jpg)"
        fundo.style.backgroundSize = "cover"
        fundo.style.backgroundPosition = "center"
    }else if (deck == 4) {
        fundo.style.backgroundImage = "url(./src/image/fundo4.jpg)"
        fundo.style.backgroundSize = "cover"
        fundo.style.backgroundPosition = "center"
    }
}

let deckEscolhido = sortEmojis(0, 4)
fundoEmoji(deckEscolhido)


let shuffleEmojis = emojis[deckEscolhido].sort(() => Math.random() > 0.5 ? 2 : -1)






for (let i = 0; i < shuffleEmojis.length; i++) {
    let box = document.createElement("div")
    box.className = "item"

    if (shuffleEmojis[i].includes("jpg") || shuffleEmojis[i].includes("jpeg") || shuffleEmojis[i].includes("png")) {
        box.innerHTML = `<img src="${shuffleEmojis[i]}" alt="emoji">`
        box.onclick = handleClick
        document.querySelector(".game").appendChild(box)
        

    } else {

        box.innerHTML = shuffleEmojis[i]
        
 
    }
    box.onclick = handleClick
    document.querySelector(".game").appendChild(box)
}


function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen")
        openCards.push(this)
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch")
        openCards[1].classList.add("boxMatch")
        playSound("hit")


    } else {
        playSound("miss")
        openCards[0].classList.remove("boxOpen")
        openCards[1].classList.remove("boxOpen")


    }
    openCards = []
    if (document.querySelectorAll(".boxMatch").length === shuffleEmojis.length) {
        alert("Parabéns, você ganhou!")
        clearInterval(timer)
        document.querySelector(".game").innerHTML = "<h1>Você venceu!</h1>"
        playSound("win")
        audio.volume = 0

    }
}