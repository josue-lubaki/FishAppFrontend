/**
 * Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu
 * @param {*} e : l'evenement declencheure (click)
 */
function toggleMenu(e) {
    var blocMenu = document.getElementById('blocMenu');
    blocMenu.classList.toggle('show-mobile');
    e.preventDefault();
}
