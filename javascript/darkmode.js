const toggler = document.getElementById("dark-mode-toggle");
let mode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', true);
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}

if (mode == 'true') {
    enableDarkMode();
}

toggler.addEventListener('click', () => {
    mode = localStorage.getItem('darkMode');
    if (mode == 'true') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});