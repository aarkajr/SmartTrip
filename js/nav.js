
const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

// Mobile navigation menu
const menuToggle = document.querySelector("#menuToggle");
const navLinksContainer = document.querySelector("#navLinks");

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", function () {
        const isOpen =
            navLinksContainer.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinksContainer.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinksContainer.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";
        });
    });
}