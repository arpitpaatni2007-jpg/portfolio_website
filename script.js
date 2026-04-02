// =====================
// TYPING ANIMATION
// =====================

// CUSTOMIZE: Change these to your own roles/titles

const typedWords = ["Frontend Developer", "Student", "Web Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  const currentWord = typedWords[wordIndex];

  if (isDeleting) {
    typedEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typedWords.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();


// =====================
// STICKY NAVBAR SHADOW
// =====================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);


// =====================
// HAMBURGER MENU TOGGLE
// =====================

const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksContainer.classList.toggle("open");
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksContainer.classList.remove("open");
  });
});


// =====================
// FADE-IN ON SCROLL
// =====================

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach(el => observer.observe(el));


// =====================
// CONTACT FORM VALIDATION
// =====================

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const msgError = document.getElementById("msgError");
  const formSuccess = document.getElementById("formSuccess");

  let valid = true;

  // Reset errors
  nameError.classList.remove("visible");
  emailError.classList.remove("visible");
  msgError.classList.remove("visible");
  formSuccess.classList.remove("visible");

  if (name.value.trim() === "") {
    nameError.classList.add("visible");
    valid = false;
  }

  // Basic email check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.classList.add("visible");
    valid = false;
  }

  if (message.value.trim() === "") {
    msgError.classList.add("visible");
    valid = false;
  }

  if (valid) {
    formSuccess.classList.add("visible");
    form.reset();
  }
});
window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("progressBar");

  if (!progressBar) return; // safety check

  const scrollTop = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;

  const progress = (scrollTop / height) * 100;

  progressBar.style.width = progress + "%";
});