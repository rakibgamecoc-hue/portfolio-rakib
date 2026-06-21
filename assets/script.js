const mobileMenu = document.querySelector(".details-menu");

if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.removeAttribute("open");
        });
    });
}
