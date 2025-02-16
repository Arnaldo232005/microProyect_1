/*Manejar los datos para traspasarlos al localstorage par reproducirlos en la tabla*/
document.addEventListener('DOMContentLoaded', () => {
    const rankingTabla = document.getElementById('ranking-tabla');
    let puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];

    puntajes.sort((a, b) => b.puntaje - a.puntaje);

    puntajes.forEach((jugador, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntaje}</td>
        `;
        /*Organizar tabla*/ 
        rankingTabla.appendChild(fila);
    });
});
