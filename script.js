/*Variables enlazadas con el html y los audios*/
const cuadros = document.querySelectorAll('.cuadro');
const listo = document.getElementById('listo');
const ronda = document.getElementById('ronda');
const c1 = new Audio('do-80236.mp3');
const c2 = new Audio('fa-78409.mp3');
const c3 = new Audio('sol-101774.mp3');
const c4 = new Audio('re-78500.mp3');
/*Variables del juego*/
let patron = [];
let posicion = [];
let numRonda = 0;
let turno = false;
/*Obtener un cuadro aleatorio*/
function seleccionarColor() {
    const color = ['uno', 'dos', 'tres', 'cuatro'];
    return color[Math.floor(Math.random() * 4)];
}
/*Activar boton*/
function encenderBoton(color) {
    const button = document.getElementById(color);
    button.classList.add('patron-activo');
    if (color === 'uno') {
        c1.currentTime = 0;
        c1.play();
    }
    if (color === 'dos') {
        c2.currentTime = 0;
        c2.play();
    }
    if (color === 'tres') {
        c3.currentTime = 0;
        c3.play();
    }
    if (color === 'cuatro') {
        c4.currentTime = 0;
        c4.play();
    }
    setTimeout(() => {
        button.classList.remove('patron-activo');
    }, 550);
}
/*Activar click*/
function encenderClick(color) {
    const button = document.getElementById(color);
    button.classList.add('click-activo');
    setTimeout(() => {
        button.classList.remove('click-activo');
    }, 350);
}
/*Mostrar patron al usuario*/
function reproducirPatron() {
    let i = 0;
    const interval = setInterval(() => {
        encenderBoton(patron[i]);
        i++;
        if (i >= patron.length) {
            clearInterval(interval);
            setTimeout(() => {
                turno = true;
            }, 500);
        }
    }, 745);
}
/*Entrar a la siguiente ronda*/
function siguienteRonda() {
    numRonda++;
    ronda.textContent = `Ronda ${numRonda}`;
    turno = false;
    posicion = [];
    patron.push(seleccionarColor());
    setTimeout(() => {
        reproducirPatron();
    }, 900);
}
/*Devolver valores iniciales*/
function reiniciarJuego() {
    patron = [];
    posicion = [];
    numRonda = 0;
    turno = false;
}
/*Guardar puntaje para el localstorage */
function guardarPuntaje(nombre, puntaje) {
    let puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    puntajes.push({ nombre, puntaje });
    localStorage.setItem('puntajes', JSON.stringify(puntajes));
}
/*Comprobar aciertos*/
function comprobar(color) {
    if (!turno) return;
    posicion.push(color);
    encenderClick(color);
    const currentStep = posicion.length - 1;

    if (posicion[currentStep] !== patron[currentStep]) {
        setTimeout(() => {
            const nombreJugador = localStorage.getItem('nombreJugador');
            guardarPuntaje(nombreJugador, numRonda);
            reiniciarJuego();
            window.location.href = 'inicio.html';
        }, 500);
    } else {
        if (posicion.length === patron.length) {
            turno = false;
            setTimeout(() => {
                siguienteRonda();
            }, 1000);
        }
    }
}
/*Ejecutar botones*/ 
cuadros.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        comprobar(color);
    });
});

listo.addEventListener('click', () => {
    reiniciarJuego();
    siguienteRonda();
});
