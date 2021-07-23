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
