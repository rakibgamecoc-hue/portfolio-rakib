(() => {
    const mobileMenu = document.querySelector(".details-menu");
    const desktopNav = document.querySelector(".site-nav .hidden.lg\\:flex");
    const sections = Array.from(document.querySelectorAll("section[id]"));
    let ticking = false;

    function closeMobileMenu({ restoreFocus = false } = {}) {
        if (!mobileMenu) return;

        mobileMenu.removeAttribute("open");

        if (restoreFocus) {
            mobileMenu.querySelector("summary")?.focus();
        }
    }

    function setupMobileMenu() {
        if (!mobileMenu) return;

        const closeMenuButton = mobileMenu.querySelector(".close-menu");
        const mobileMenuLinks = mobileMenu.querySelectorAll("a");

        mobileMenuLinks.forEach((link) => {
            link.addEventListener("click", () => closeMobileMenu());
        });

        closeMenuButton?.addEventListener("click", () => {
            closeMobileMenu({ restoreFocus: true });
        });
    }

    function updateActiveNavLink() {
        if (!desktopNav || sections.length === 0) return;

        const navLinks = desktopNav.querySelectorAll("a");
        const currentSection = sections.reduce((current, section) => {
            const sectionTop = section.offsetTop - 150;
            return window.scrollY >= sectionTop ? section.id : current;
        }, "");

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
        });
    }

    function requestActiveLinkUpdate() {
        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
    }

    setupMobileMenu();
    updateActiveNavLink();
    window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
    window.addEventListener("resize", requestActiveLinkUpdate);
})();
