// 요소 불러오기
const ball = $("#ball");
const blue_player = $("#blue_player");
const red_player = $("#red_player");
const blueBarrier = $("#blue_barrier");
const redBarrier = $("#red_barrier");
const blueColldownChecker = $("#blueCC");
const redColldownChecker = $("#redCC");
const counter = $('#counter');
const result = $("h1");
const restart = $('#restart');
let intervalID = true;
var btop = 20;
var num = 0.25;
var isballClicked = false;
var isblueCooldown = false;
var isredCooldown = false;
var count = 0;
var blueEndDurationTimeoutID;
var redEndDurationTimeoutID;
var blueEndCooldownTimeoutID;
var redEndCooldownTimeoutID;

const colldown = 3000;
const duration = 1500;

blueBarrier.css("display", "none");
redBarrier.css("display", "none");
restart.css("display", "none");

function gameover() {
    restart.css("display", "inline");
};

// setInterver 정의
function animate() {
    intervalID = setInterval(ball_animate, 10);
};

function attack(player) {
    count += 1
    counter.html(count);
    num *= -1.05;
    if (player === "blue") {
        blueBarrier.css("display", "none");
        ball.css("background", "red");
        blueColldownChecker.html("");
        isblueCooldown = false;
        clearTimeout(blueEndDurationTimeoutID);
        clearTimeout(blueEndCooldownTimeoutID);
    }
    else if (player === "red") {
        redBarrier.css("display", "none");
        ball.css("background", "blue");
        redColldownChecker.html("");
        isredCooldown = false;
        clearTimeout(redEndDurationTimeoutID);
        clearTimeout(redEndCooldownTimeoutID);
    };
};

// animate 정의
function ball_animate() {
    // 공 움직이기
    btop += num;
    ball.css("top", `${btop}%`);
    // 블루 플레이어에게 닿았다면
    if (btop > 80) {
        // 쳐내지 못했다면
        if (blueBarrier.css("display") === "none") {
            // 레드 승
            result.html("레드 승!");
            clearInterval(intervalID);
            gameover();
        }
        // 쳐냈다면
        else {
            attack("blue")
        };
    };
    // 레드 플레이어에게 닿았다면
    if (btop < 20) {
        // 쳐내지 못했다면
        if (redBarrier.css("display") === "none") {
            // 블루 승
            result.html("블루 승!");
            clearInterval(intervalID);
            gameover();
        }
        // 쳐냈다면
        else {
            attack("red")
        };
    };
};

// 공 눌렀다면
ball.click(() => {
    // setInterval 실행
    if (!isballClicked) animate(); isballClicked = true;
});

// 블루 눌렀다면
blue_player.click('click', () => {
    if (!isblueCooldown) {
        blueBarrier.css("display", "block");
        isblueCooldown = true;

        blueEndDurationTimeoutID = setTimeout(() => {
            blueBarrier.css("display", "none")
            isblueCooldown = true;
            blueColldownChecker.html("블루 쿨타임");
        }, duration);
        
        blueEndCooldownTimeoutID = setTimeout(() => {
            isblueCooldown = false;
            blueColldownChecker.html("");
        }, colldown + duration);
}});

// 레드 눌렀다면
red_player.on('click', () => {
    if (!isredCooldown) {
    redBarrier.css("display", "block");
        isredCooldown = true;

        redEndDurationTimeoutID = setTimeout(() => {
            redBarrier.css("display", "none");
            isredCooldown = true;
            redColldownChecker.html("레드 쿨타임")
        }, duration);
        
        redEndCooldownTimeoutID = setTimeout(() => {
            isredCooldown = false;
            redColldownChecker.html("");
        }, colldown + duration);
}});

restart.on('click', () => {
    location.reload();
});

//도움말
const help = $("#help");

help.on('click', () => {
    location.href = "help.html";
});