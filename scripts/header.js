/**
 * Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu
 * @param {*} e : l'evenement declencheure (click)
 */
const showMenu = (navId) => {
    const blocMenu = document.getElementById(navId);
    blocMenu.classList.toggle('show-mobile');
};

/****  Remove menu mobile ****/
function linkAction() {
    const blocMenu = document.getElementById('blocMenu');
    blocMenu.classList.remove('show-mobile');
}

function startTimer(duration, display) {
    var timer = duration,
        seconds;
    setInterval(function () {
        seconds = parseInt(timer % 15, 10);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById(display).innerText(seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
