/**
 * Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu
 * @param {*} e : l'evenement declencheure (click)
 */
function toggleMenu(e) {
    const blocMenu = document.getElementById('blocMenu');
    blocMenu.classList.toggle('show-mobile');
    e.preventDefault();
}

// // Les differents liens
// const navLink = document.querySelectorAll('.nav_link');
// function linkAction(e) {
//     const blocMenu = document.getElementById('blocMenu');
//     navLink.forEach((n) => n.classList.remove('active'));
//     this.classList.add('click', 'active');

//     blocMenu.classList.remove('show-mobile');
//     e.preventDefault();
// }

// navLink.forEach((n) => n.addEventListener('click', linkAction));
