const cuadros = document.querySelectorAll('.cuadro');
const listo= document.getElementById('listo');
const ronda=document.getElementById('ronda');
const c1=new Audio('do-80236.mp3');
const c2=new Audio('fa-78409.mp3');
const c3=new Audio('sol-101774.mp3');
const c4=new Audio('re-78500.mp3');



let patron = [];
let posicion = [];
let numRonda = 0;
let turno = false;

function getRandomColor() {
    const colors = ['uno', 'dos', 'tres', 'cuatro'];
    return colors[Math.floor(Math.random() * 4)];
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('patron-activo');
    if(color==='uno'){
        c1.currentTime = 0;
        c1.play();
    }
    if(color==='dos'){
        c2.currentTime = 0;
        c2.play();
    }
    if(color==='tres'){
        c3.currentTime = 0;
        c3.play();
    }
    if(color==='cuatro'){
        c4.currentTime = 0;
        c4.play();
    }
    setTimeout(() => {
        button.classList.remove('patron-activo');
    }, 550);
}

function flashButtonClick(color) {
    const button = document.getElementById(color);
    button.classList.add('click-activo');
    setTimeout(() => {
        button.classList.remove('click-activo');
    }, 350);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(patron[i]);
        i++;
        if (i >= patron.length) {
            clearInterval(interval);
            setTimeout(() => {
                turno = true;
            }, 500);
        }
    }, 745);
}

function nextLevel() {
    numRonda++;
    ronda.textContent=`Ronda ${numRonda}`;
    turno = false;
    posicion = [];
    patron.push(getRandomColor());
    setTimeout(() => {
        playSequence();
    }, 900);
}

function resetGame() {
    patron = [];
    posicion = [];
    numRonda = 0;
    turno= false;
}

function handlePlayerInput(color) {
    if (!turno) return;
    posicion.push(color);
    flashButtonClick(color);
    const currentStep = posicion.length - 1;

    if (posicion[currentStep] !== patron[currentStep]) {
        setTimeout(() => {
            resetGame();
        }, 500);
        window.location.href='inicio.html';
    } else {
        if (posicion.length === patron.length) {
            turno = false;
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
    }
}

cuadros.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        handlePlayerInput(color);
    });
});

listo.addEventListener('click', () => {
    resetGame();
    nextLevel();
});
