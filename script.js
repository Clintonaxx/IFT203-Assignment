/* ===============================
   SCROLL REVEAL WITH STAGGER
================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Stagger children animations (if any)
        const children = entry.target.querySelectorAll("li, .project-card");
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.08}s`;
        });

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ===============================
   INTRO PARALLAX EFFECT
================================ */

const intro = document.querySelector(".intro");
const introContent = document.querySelector(".intro-content");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (introContent) {
    introContent.style.transform = `translateY(${scrollY * 0.25}px)`;
    introContent.style.opacity = `${1 - scrollY / 600}`;
  }
});

/* ===============================
   SCROLL PROGRESS INDICATOR
================================ */

const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.width = "0%";
progressBar.style.background =
  "linear-gradient(90deg, #6366f1, #818cf8)";
progressBar.style.zIndex = "9999";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

/* ===============================
   SKILL HOVER FEEDBACK
================================ */

const skills = document.querySelectorAll(".skills-list li");

skills.forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    skill.style.boxShadow =
      "0 15px 40px rgba(99, 102, 241, 0.35)";
  });

  skill.addEventListener("mouseleave", () => {
    skill.style.boxShadow = "none";
  });
});

/* ===============================
   ACCESSIBILITY / PERFORMANCE
================================ */

// Disable heavy motion if user prefers reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((el) => {
    el.classList.add("active");
    el.style.transition = "none";
  });

  if (introContent) {
    introContent.style.transform = "none";
  }

  progressBar.style.display = "none";
}
/* ================= AMBIENT PARALLAX ================= */

const ambients = document.querySelectorAll(".ambient");

window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.15;

  ambients.forEach((ambient, index) => {
    ambient.style.transform = `translateY(${offset * (index + 1)}px)`;
  });
});
/* ================= PROFILE CARD PARALLAX ================= */

const profileCard = document.getElementById("profileCard");

if (profileCard) {
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;

    const x = (e.clientX / innerWidth - 0.5) * 12;
    const y = (e.clientY / innerHeight - 0.5) * 12;

    profileCard.style.transform = `
      rotateY(${x}deg)
      rotateX(${-y}deg)
      translateZ(10px)
    `;
  });

  document.addEventListener("mouseleave", () => {
    profileCard.style.transform = "none";
  });
}
