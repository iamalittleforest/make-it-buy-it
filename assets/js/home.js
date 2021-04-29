var footerEl = document.getElementById("page-footer");

function openNav() {
    document.getElementById("nav-footer").style.height="100%";
}

function showfooter() {
    footerEl.classList.remove("hidden");
}

function closeNav() {
    document.getElementById("nav-footer").style.height="0";
}


