const menu = document.getElementById('menuJS');
const menuModal = document.querySelector('.menu__modalJS');
const closeMenu = menuModal.querySelector('.closeJS');

menu.addEventListener('click', () => {
    menuModal.classList.remove('hidden');
    menu.classList.add('hidden');
})

closeMenu.addEventListener('click', () => {
    menuModal.classList.add('hidden');
    menu.classList.remove('hidden');
})