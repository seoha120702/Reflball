var ball = document.querySelector("#ball")
let blueP = document.querySelector("#blueP")
let redP = document.querySelector("#redP")
let intervalid
var btop = 0
var num = 10
var blueclicked
var redclicked

function animate() {
    intervalid = setInterval(ball_animate, 2000/2000);
}

function ball_animate() {
    if (btop > 3500) {
        document.querySelector("h1").innerHTML = "레드 승!"
    }
    if (btop < -3800) {
        document.querySelector("h1").innerHTML = "블루 승!"
    }
    if (btop > -100 && !blueclicked) {
        ball.style.background = "blue"
    }
    if (btop < 100 && !redclicked) {
        ball.style.background = "red"
    }
    ball.style.top = `${btop}px`
    btop += num
    console.log(btop)
}

ball.addEventListener('click', () => {
    animate()
})

blueP.addEventListener('click', () => {
    if (btop > 1000) {
        num = -10
        redclicked = false
        blueclicked = true
    }
})

redP.addEventListener('click', () => {
    if (btop < -1000) {
        blueclicked = false
        redclicked = true
        num = 10
    }
})
