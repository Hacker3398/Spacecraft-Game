function id(id) {
    return document.getElementById(id);
};

/* criador de strelas */

let newStar = null;
let numberOfStars = 0;
let drawXaxis = null;
let drawYaxis = null;

function starMaker(amount) {
    /* sorteando eixos */
    drawXaxis = Math.round(Math.random() * 99) + 1;
    drawYaxis = Math.round(Math.random() * 99) + 1;
    /* criando estrela */
    newStar = document.createElement('div');
    newStar.classList.add('star');
    /* posicionando estrela */
    newStar.style.position = 'absolute';
    newStar.style.top = drawYaxis + '%';
    newStar.style.left = drawXaxis + '%';
    /* estilizando estrela */
    newStar.style.width = '1px';
    newStar.style.height = '1px';
    newStar.style.opacity = `${Math.round(Math.random() * 9) + 1}`;
    /* aplicando-a ao body */
    document.body.appendChild(newStar);
    /* adicionando mais uma estrela a lista */
    numberOfStars++;
    if (numberOfStars < amount) {
        setTimeout(function () {
            starMaker(amount);
        }, 25);
    };
};
starMaker(100);

/* criador de strelas */

let gameStarted = false;
let canPlay = false;
let p1CanDie = true;
let p2CanDie = true;

function gameLauncher() {
    if (!gameStarted) {
        gameStarted = true;
        /* body */
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        /* text */
        textH1.style.opacity = '0';
        textP.style.opacity = '0';
        /* safe-zone */
        safeZoneDIV.style.transition = '0.5s';
        safeZoneDIV.style.width = window.innerWidth + 'px';
        safeZoneDIV.style.height = window.innerHeight + 'px';
        szX = (window.innerWidth * 0.5);
        szY = (window.innerHeight * 0.5);
        safeZoneDIV.style.top = szY + 'px';
        safeZoneDIV.style.left = szX + 'px';
        safeZoneDIV.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        setTimeout(function () {
            safeZoneDIV.style.transition = '10s';
        }, 500);
        /* spacecraft */
        /* p1 */
        spacecraftP1DIV.style.left = scp1X + 'px';
        spacecraftP1DIV.style.transition = '1.5s';
        spacecraftP1DIV.style.visibility = 'visible';
        /* p2 */
        spacecraftP2DIV.style.left = scp2X + 'px';
        spacecraftP2DIV.style.transition = '1.5s';
        spacecraftP2DIV.style.visibility = 'visible';
        setTimeout(function () {
            spacecraftP1DIV.style.top = scp1Y + 'px';
            spacecraftP2DIV.style.top = scp2Y + 'px';
            setTimeout(function () {
                spacecraftP1DIV.style.transition = '0.1s';
                spacecraftP2DIV.style.transition = '0.1s';
                locatorP1DIV.style.visibility = 'visible';
                locatorP2DIV.style.visibility = 'visible';
                canPlay = true;
                spacecraftThust();
                setTimeout(function () {
                    speedDIV.style.color = 'rgba(255, 255, 255, 1)';
                    speedDIV.style.borderColor = 'rgba(255, 255, 255, 1)';
                }, 100);
                setTimeout(function () {
                    speedUp = true
                    accelerator();
                    shapeSafeZone();
                }, 2500);
            }, 1500);
        }, 500);
    };
};


function gameOver() {
    canPlay = false;
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    textP.style.color = 'rgba(255, 0, 0, 0.375)';
    safeZoneDIV.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(function () {
        gameStarted = false;
        textH1.style.opacity = '1';
        textH1.style.cursor = 'pointer';
        textP.style.opacity = '1';
        speedUp = false;
        stepSize = 10;
        speedDIV.innerHTML = (stepSize * 20) + 'px/s';
    }, 1500);
};

const textH1 = id('text-h1');
const textP = id('text-p');

textH1.addEventListener('click', function () {
    gameLauncher();
    textH1.style.cursor = 'default';
});

const spacecraftP1DIV = id('spacecraft-p1-div');
const spacecraftP2DIV = id('spacecraft-p2-div');
const locatorP1DIV = id('locator-p1-div');
const locatorP2DIV = id('locator-p2-div');

const speedDIV = id('speed-div');
let speed = 50;
let stepSize = 10;
let speedUp = false;

function accelerator() {
    if (speedUp) {
        stepSize++;
        speedDIV.innerHTML = (stepSize * 20) + 'px/s' 
        /* 1000 / 50 = 20 -> 20 * stepSize = px/s */
        if (stepSize < 20) {
            setTimeout(accelerator, 5000);
        };
    };
};

let scp1X = (Math.round(Math.random() * (window.innerWidth * 0.6)) + (window.innerWidth * 0.2));
let scp1Y = (window.innerHeight * 0.5);
let scp2X = (Math.round(Math.random() * (window.innerWidth * 0.6)) + (window.innerWidth * 0.2));
let scp2Y = (window.innerHeight * 0.5);

spacecraftP1DIV.style.top = '101%';
spacecraftP1DIV.style.left = scp1X + 'px';
spacecraftP2DIV.style.top = '101%';
spacecraftP2DIV.style.left = scp2X + 'px';

let angleP1 = 0;
let angleP2 = 0;

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'Enter':
        case ' ':   gameLauncher();
        break;

        case 'w':   if (canPlay) {angleP1 = 0};
        break;
        
        case 'a':   if (canPlay) {angleP1 = -90};
        break;

        case 's':   if (canPlay) {angleP1 = 180};
        break;
        
        case 'd':   if (canPlay) {angleP1 = 90};
        break;

        case 'ArrowUp': if (canPlay) {angleP2 = 0};
        break;

        case 'ArrowLeft':   if (canPlay) {angleP2 = -90};
        break;
        
        case 'ArrowDown':   if (canPlay) {angleP2 = 180};
        break;

        case 'ArrowRight':  if (canPlay) {angleP2 = 90};
        break;

        case 'p':   locatorP1DIV.style.opacity = '1';
                    locatorP2DIV.style.opacity = '1';
                    setTimeout(function () {
                        locatorP1DIV.style.opacity = '0.25';
                        locatorP2DIV.style.opacity = '0.25';
                    }, 2500);
        break;
    };
    rotateSpacecraftP1();
    rotateSpacecraftP2();
});

function rotateSpacecraftP1() {
    spacecraftP1DIV.style.rotate = angleP1 + 'deg';
};

function rotateSpacecraftP2() {
    spacecraftP2DIV.style.rotate = angleP2 + 'deg';
};

const p1PointsDIV = id('p1-points-div');
const p2PointsDIV = id('p2-points-div');
let p1Points = 0;
let p2Points = 0;

function spacecraftThust() {
    if (canPlay) {
        switch (angleP1) {
            case 0: if (scp1Y > 0) {
                            scp1Y -= stepSize;
                        } else {
                            angleP1 = 180;
                        };
            break;
        
            case -90:   if (scp1X > 2) {
                            scp1X -= stepSize;
                        } else {
                            angleP1 = 90;
                        };
            break;

            case 180:   if (scp1Y < (window.innerHeight - spacecraftP1DIV.offsetHeight)) {
                            scp1Y += stepSize;
                        } else {
                            angleP1 = 0;
                        };
            break;

            case 90:    if (scp1X < (window.innerWidth - spacecraftP1DIV.offsetWidth)) {
                            scp1X += stepSize;    
                        } else {
                            angleP1 = -90;
                        };
            break;
        };

        switch (angleP2) {
            case 0: if (scp2Y > 0) {
                            scp2Y -= stepSize;
                        } else {
                            angleP2 = 180;
                        };
            break;
        
            case -90:   if (scp2X > 2) {
                            scp2X -= stepSize;
                        } else {
                            angleP2 = 90;
                        };
            break;

            case 180:   if (scp2Y < (window.innerHeight - spacecraftP2DIV.offsetHeight)) {
                            scp2Y += stepSize;
                        } else {
                            angleP2 = 0;
                        };
            break;

            case 90:    if (scp2X < (window.innerWidth - spacecraftP2DIV.offsetWidth)) {
                            scp2X += stepSize;    
                        } else {
                            angleP2 = -90;
                        };
            break;
        };

        rotateSpacecraftP1();
        rotateSpacecraftP2();

        if (p1CanDie) {
            if (scp1X <= (safeZoneDIV.getBoundingClientRect().left - (spacecraftP1DIV.offsetWidth * 0.5)) || scp1X >= (safeZoneDIV.getBoundingClientRect().left + (safeZoneDIV.offsetWidth - (spacecraftP1DIV.offsetWidth * 0.5))) || scp1Y <= (safeZoneDIV.getBoundingClientRect().top - (spacecraftP1DIV.offsetHeight * 0.5)) || scp1Y >= (safeZoneDIV.getBoundingClientRect().top + (safeZoneDIV.offsetHeight - (spacecraftP1DIV.offsetHeight * 0.5)))) {
                gameOver();
                p2Points++
                if (p2Points < 10) {
                    p2Points = '0' + p2Points;
                };
                p2PointsDIV.innerHTML = p2Points;
            };
        };
        if (p2CanDie) {
            if (scp2X <= (safeZoneDIV.getBoundingClientRect().left - (spacecraftP2DIV.offsetWidth * 0.5)) || scp2X >= (safeZoneDIV.getBoundingClientRect().left + (safeZoneDIV.offsetWidth - (spacecraftP2DIV.offsetWidth * 0.5))) || scp2Y <= (safeZoneDIV.getBoundingClientRect().top - (spacecraftP2DIV.offsetHeight * 0.5)) || scp2Y >= (safeZoneDIV.getBoundingClientRect().top + (safeZoneDIV.offsetHeight - (spacecraftP2DIV.offsetHeight * 0.5)))) {
                gameOver();
                p1Points++
                if (p1Points < 10) {
                    p1Points = '0' + p1Points;
                };
                p1PointsDIV.innerHTML = p1Points;
            };
        };
  
        /* p1 */
        spacecraftP1DIV.style.top = scp1Y + 'px';
        spacecraftP1DIV.style.left = scp1X + 'px';
        /* p2 */
        spacecraftP2DIV.style.top = scp2Y + 'px';
        spacecraftP2DIV.style.left = scp2X + 'px';
        /* locator-p1 */
        locatorP1DIV.style.top = (scp1Y - (spacecraftP1DIV.offsetHeight * 1.25)) + 'px';
        locatorP1DIV.style.left = (scp1X - (spacecraftP1DIV.offsetHeight * 0.375)) + 'px';
        /* locator-p2 */
        locatorP2DIV.style.top = (scp2Y - (spacecraftP2DIV.offsetHeight * 1.25)) + 'px';
        locatorP2DIV.style.left = (scp2X - (spacecraftP2DIV.offsetHeight * 0.375)) + 'px';
        setTimeout(spacecraftThust, speed);
    };
};
spacecraftThust();

const safeZoneDIV = id('safe-zone-div');

let szX = (window.innerWidth * 0.5);
let szY = (window.innerHeight * 0.5);

safeZoneDIV.style.width = window.innerWidth + 'px';
safeZoneDIV.style.height = window.innerHeight + 'px';

let endNumber = null;

function shapeSafeZone(chosenNumber = '') {
    if (chosenNumber == '' || chosenNumber == 0 || chosenNumber > 10) {  
        endNumber = Math.round(Math.random() * 7) + 1;
    } else {
        endNumber = chosenNumber;
    };
    szX = (Math.round(Math.random() * (window.innerWidth))) + 'px';
    szY = (Math.round(Math.random() * (window.innerHeight))) + 'px';

    switch (endNumber) {
        case 1: safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
        break;

        case 2: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
        break;

        case 3: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
                safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
        break;

        case 4: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
                safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
                safeZoneDIV.style.top = szY;
        break;

        case 5: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
                safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
                safeZoneDIV.style.left = szX;
        break;

        case 6: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
                safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
                safeZoneDIV.style.top = szY;
                safeZoneDIV.style.left = szX;
        break;

        case 7: safeZoneDIV.style.height = (Math.round(Math.random() * (spacecraftP1DIV.offsetHeight * 6)) + (spacecraftP1DIV.offsetHeight * 3)) + 'px';
                safeZoneDIV.style.top = szY;
        break;

        case 8: safeZoneDIV.style.width = (Math.round(Math.random() * (spacecraftP1DIV.offsetWidth * 6)) + (spacecraftP1DIV.offsetWidth * 3)) + 'px';
                safeZoneDIV.style.left = szX;
        break;
    };
    setTimeout(function () {
        flashScreen(1);
    }, 25);
    setTimeout(function () {
        safeZoneDIV.style.width = window.innerWidth + 'px';
        safeZoneDIV.style.height = window.innerHeight + 'px';
        szX = (window.innerWidth * 0.5);
        szY = (window.innerHeight * 0.5);
        safeZoneDIV.style.top = szY + 'px';
        safeZoneDIV.style.left = szX + 'px';
        flashScreen(0);
        setTimeout(function () {
            if (canPlay) {
                shapeSafeZone();
            };
        }, 12500);
    }, 15000);
};
// shapeSafeZone(/* numero escolhido */);

const alertDIV = id('alert-div');

function flashScreen(order) {
    if (order == 1) {
        alertDIV.style.visibility = 'visible';
    } else {
        alertDIV.style.visibility = 'hidden';
    }
};

window.addEventListener('resize', function () {
    if (gameStarted) {
        gameOver();
    } else {
        safeZoneDIV.style.width = window.innerWidth + 'px';
        safeZoneDIV.style.height = window.innerHeight + 'px';
        szX = (window.innerWidth * 0.5);
        szY = (window.innerHeight * 0.5);
        safeZoneDIV.style.top = szY + 'px';
        safeZoneDIV.style.left = szX + 'px';
    };
});