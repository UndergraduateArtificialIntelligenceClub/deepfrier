const toggler = document.getElementById("dark-mode-toggle");
let mode = localStorage.getItem('darkMode');

function toggle(bool) {
    if (bool) {
        document.body.classList.remove('darkmode');
    } else {
        document.body.classList.add('darkmode')
    }
}

toggler.addEventListener('click', () => {
    // mode = localStorage.darkmode;
    console.table(mode);
    if (mode) {
        mode = false;
    } else {
        mode = true;
    }
    localStorage.darkmode = mode;
    toggle(mode);
});

toggle(mode);