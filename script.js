const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");
const siteName = "Grace Ashley";

const sectionTitles = {
    home: "Home",
    about: "About",
    projects: "Projects",
    contacts: "Contact"
};

function setActive(id) {
    navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });

    if (sectionTitles[id]) {
    document.title = sectionTitles[id] + " | " + siteName;
    }
}

const navObserver = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) setActive(entry.target.id);
    });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

window.addEventListener("scroll", () => {
    const atBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) setActive("contacts");
});


const revealTargets = document.querySelectorAll(
    ".about-photo, .about-head, #projects h2, .card-toggle, #contacts h2, .contact-wrap"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
    entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); 
        }
    });
    },
    { threshold: 0.15 }
    );

    revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
    });
}


const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});