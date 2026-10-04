/* =========================================================
   YANNIS-GABRIEL NACU · CȘE CAMPAIGN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================== */

  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

      const open = mobileNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(open)
      );

    });


    mobileNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        mobileNav.classList.contains("open")
      ) {

        mobileNav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.focus();

      }

    });

  }


  /* =========================================
     SCROLL REVEAL
  ========================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -35px 0px"
        }
      );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =========================================
     PORTRAIT FALLBACK
  ========================================== */

  const portrait =
    document.getElementById("portrait");

  const photoPlaceholder =
    document.getElementById("photoPlaceholder");


  if (portrait) {

    portrait.addEventListener("error", () => {

      portrait.style.display = "none";

      if (photoPlaceholder) {
        photoPlaceholder.style.display = "grid";
      }

    });

  }


  /* =========================================
     SMOOTH ANCHOR LINKS
  ========================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================================
     HERO PARALLAX
  ========================================== */

  const heroVisual =
    document.querySelector(".hero-visual");


  const canParallax =
    window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches &&
    window.matchMedia(
      "(min-width: 801px)"
    ).matches;


  if (heroVisual && canParallax) {

    window.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (event.clientX / window.innerWidth - 0.5);

        const y =
          (event.clientY / window.innerHeight - 0.5);


        heroVisual.style.transform =
          `translate(${x * 4}px, ${y * 4}px)`;

      },
      { passive: true }
    );

  }


  /* =========================================
     ACTIVE NAV
  ========================================== */

  const navLinks =
    document.querySelectorAll(
      ".desktop-nav a"
    );


  const sections = [
    document.querySelector("#about"),
    document.querySelector("#skills"),
    document.querySelector("#experience"),
    document.querySelector("#semn"),
    document.querySelector("#cv")
  ].filter(Boolean);


  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;


            navLinks.forEach((link) => {
              link.classList.remove("active");
            });


            const active =
              document.querySelector(
                `.desktop-nav a[href="#${entry.target.id}"]`
              );


            if (active) {
              active.classList.add("active");
            }

          });

        },
        {
          rootMargin:
            "-30% 0px -60% 0px"
        }
      );


    sections.forEach((section) => {
      navObserver.observe(section);
    });

  }


  /* =========================================
     CURRENT YEAR
  ========================================== */

  document
    .querySelectorAll("[data-year]")
    .forEach((element) => {

      element.textContent =
        new Date().getFullYear();

    });

});
