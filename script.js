

document.addEventListener("DOMContentLoaded", () => {


    /*01. MOBILE NAVIGATIN */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("open")) {

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

            } else {

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close mobile menu after clicking link */

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }



    /* 02. SMOOTH SCROLL */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* 03. ACTIVE NAVIGATION*/

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();



    /* 04. NAVBAR SCROLL EFFECT */

    const navbar =
        document.querySelector(".navbar");

    function navbarScrollEffect() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        navbarScrollEffect,
        { passive: true }
    );

    navbarScrollEffect();



    /*  05. SCROLL REVEAL ANIMATION */

    const revealElements =
        document.querySelectorAll(
            ".glass-card, " +
            ".project-card, " +
            ".skill-category, " +
            ".timeline-item, " +
            ".achievement-card, " +
            ".certificate-card, " +
            ".section-heading"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* 06. STAGGER PROJECT ANIMATIONS*/

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });



    /* 07. TYPING EFFECT */

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const phrases = [

            "Data Science Student",

            "Aspiring Data Analyst",

            "Machine Learning Enthusiast",

            "Python Developer",

            "Web Developer"

        ];

        let phraseIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeText() {

            const currentPhrase =
                phrases[phraseIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentPhrase.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeText,
                        1500
                    );

                    return;

                }

            } else {

                typingElement.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    phraseIndex =
                        (phraseIndex + 1) %
                        phrases.length;

                }

            }


            const speed =
                deleting ? 45 : 80;

            setTimeout(
                typeText,
                speed
            );

        }


        typeText();

    }



    /*08. PROJECT FILTERING*/

    const filterButtons =
        document.querySelectorAll(
            ".project-filter"
        );

    const projectItems =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            projectItems.forEach(project => {

                const category =
                    project.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    project.style.display = "";

                    requestAnimationFrame(() => {

                        project.style.opacity = "1";

                        project.style.transform =
                            "translateY(0)";

                    });

                } else {

                    project.style.opacity = "0";

                    project.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {

                        project.style.display =
                            "none";

                    }, 300);

                }

            });

        });

    });



    /*09. PROJECT GITHUB LINKS*/

    const projectLinks = {

        club:
            "https://github.com/robinchahal082-sudo/smart_club_management_system",

        seating:
            "https://github.com/dipanshu1502/exam-seating-planner-",

        spam:
            "https://github.com/yourusername/spam-message-detection",

        expense:
            "https://github.com/yourusername/expense-tracker",

        image:
            "https://github.com/yourusername/image-captioning"

    };


    document.querySelectorAll(
        "[data-project]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const project =
                button.dataset.project;

            const url =
                projectLinks[project];


            if (url) {

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        });

    });



    //    10. RESUME DOWNLOAD

    const resumeButtons =
        document.querySelectorAll(
            ".resume-btn"
        );


    resumeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const resumePath =
                "resume.pdf";


            const link =
                document.createElement("a");

            link.href =
                resumePath;

            link.download =
                "Robindeep_Chahal_Resume.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        });

    });



    //    11. CONTACT FORM

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const nameInput =
                    contactForm.querySelector(
                        'input[name="name"]'
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "there";


                showNotification(
                    `Thank you, ${name}! Your message has been received.`
                );


                contactForm.reset();

            }
        );

    }



    //    12. NOTIFICATION

    function showNotification(message) {

        const existing =
            document.querySelector(
                ".portfolio-notification"
            );


        if (existing) {

            existing.remove();

        }


        const notification =
            document.createElement("div");

        notification.className =
            "portfolio-notification";


        notification.innerHTML = `

            <div class="notification-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <div>
                <strong>Success</strong>
                <p>${message}</p>
            </div>

        `;


        document.body.appendChild(
            notification
        );


        setTimeout(() => {

            notification.classList.add(
                "show"
            );

        }, 50);


        setTimeout(() => {

            notification.classList.remove(
                "show"
            );


            setTimeout(() => {

                notification.remove();

            }, 400);

        }, 3500);

    }



    //    13. SOCIAL MEDIA LINKS

    const socialUrls = {

        github:
            "https://github.com/robinchahal082-sudo",

        linkedin:
            "https://www.linkedin.com/",

        instagram:
            "https://www.instagram.com/",

        twitter:
            "https://twitter.com/"

    };


    document.querySelectorAll(
        "[data-social]"
    ).forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                const platform =
                    this.dataset.social;

                const url =
                    socialUrls[platform];


                if (url) {

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            }
        );

    });



    /* =====================================================
       14. MOUSE PARALLAX HERO
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    const profileCard =
        document.querySelector(
            ".profile-card"
        );


    if (
        heroVisual &&
        profileCard &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left;


                const y =
                    e.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    35;


                const rotateY =
                    (centerX - x) /
                    35;


                profileCard.style.transform = `

                    perspective(1000px)

                    rotateX(${rotateX}deg)

                    rotateY(${rotateY}deg)

                    translateY(-5px)

                `;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "rotate(2deg)";

            }
        );

    }



    /* 15. CURSOR GLOW */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";


    document.body.appendChild(
        cursorGlow
    );


    if (window.innerWidth > 900) {

        document.addEventListener(
            "mousemove",
            (e) => {

                cursorGlow.style.left =
                    `${e.clientX}px`;

                cursorGlow.style.top =
                    `${e.clientY}px`;

            }
        );

    }



    /*16. SKILL CARD TILT */

    const skillCards =
        document.querySelectorAll(
            ".skill-category"
        );


    if (window.innerWidth > 900) {

        skillCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        e.clientX -
                        rect.left;


                    const y =
                        e.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) /
                        45;


                    const rotateY =
                        (centerX - x) /
                        45;


                    card.style.transform = `

                        perspective(800px)

                        rotateX(${rotateX}deg)

                        rotateY(${rotateY}deg)

                        translateY(-5px)

                    `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }



    /*17. COUNTER ANIMATION*/

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.count
                        );


                    let current = 0;

                    const duration = 1500;

                    const startTime =
                        performance.now();


                    function updateCounter(
                        currentTime
                    ) {

                        const progress =
                            Math.min(
                                (
                                    currentTime -
                                    startTime
                                ) /
                                duration,
                                1
                            );


                        const ease =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        current =
                            Math.floor(
                                ease * target
                            );


                        counter.textContent =
                            current;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },

            {
                threshold: 0.6
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(
            counter
        );

    });



    /*18. CURRENT YEAR */

    const yearElement =
        document.querySelector(
            ".current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    //    19. PREVENT BROKEN IMAGE
    

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        image.addEventListener(
            "error",
            function () {

                this.style.display =
                    "none";

            }
        );

    });



    //    20. PAGE LOADED

    document.body.classList.add(
        "page-loaded"
    );



    // /* Theme toggle: persist the visitor's preference */
    // const themeToggle = document.querySelector(".theme-toggle");
    // const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
    // const savedTheme = (() => {
    //     try { return localStorage.getItem("portfolio-theme"); }
    //     catch (error) { return null; }
    // })();
    // const preferredTheme = savedTheme || "light";

    // function applyTheme(theme) {
    //     document.documentElement.setAttribute("data-theme", theme);
    //     if (themeIcon && themeToggle) {
    //         const isDark = theme === "dark";
    //         themeIcon.classList.toggle("fa-moon", isDark);
    //         themeIcon.classList.toggle("fa-sun", !isDark);
    //         themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    //         themeToggle.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    //     }
    //     const themeColor = document.querySelector('meta[name="theme-color"]');
    //     if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#090b12" : "#f7f8fc");
    // }

    // applyTheme(preferredTheme);
    // if (themeToggle) {
    //     themeToggle.addEventListener("click", () => {
    //         const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    //         applyTheme(nextTheme);
    //         try { localStorage.setItem("portfolio-theme", nextTheme); } catch (error) {}
    //     });
    // }
     
    /* Dark theme only */
    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
        themeToggle.remove();
    }

    document.documentElement.setAttribute("data-theme", "dark");

    try {
        localStorage.setItem("portfolio-theme", "dark");
    } catch (error) {
        // Continue even if local storage is unavailable
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute("content", "#090b12");
    }

});
