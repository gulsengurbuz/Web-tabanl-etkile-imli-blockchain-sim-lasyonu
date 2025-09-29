document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();
  initializeScrollAnimations();
  initializeCounters();
  initializeTestimonials();
  initializeFAQ();
});

function initializeNavbar() {
  const navbar = document.querySelector(".header");
  const navbarToggle = document.getElementById("toggle");
  const navbarMenu = document.getElementById("menu");

  if (!navbar || !navbarToggle || !navbarMenu) {
    return;
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }

  function toggleMobileMenu() {
    const isOpen = navbarMenu.classList.contains("is-open");
    navbarMenu.classList.toggle("is-open");
    navbarToggle.setAttribute("aria-expanded", String(!isOpen));

    const spans = navbarToggle.querySelectorAll("span");
    spans.forEach((span, index) => {
      if (!isOpen) {
        if (index === 0)
          span.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) span.style.opacity = "0";
        if (index === 2)
          span.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        span.style.transform = "";
        span.style.opacity = "";
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  navbarToggle.addEventListener("click", toggleMobileMenu);

  const navLinks = navbarMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarMenu.classList.contains("is-open")) {
        toggleMobileMenu();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !navbar.contains(e.target) &&
      navbarMenu.classList.contains("is-open")
    ) {
      toggleMobileMenu();
    }
  });
}

function initializeScrollAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function initializeCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"));
  if (!Number.isFinite(target)) return;

  const duration = 2000;
  const steps = Math.max(1, Math.round(duration / 16));
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const formattedNumber = Math.floor(current);
    if (target >= 1000) {
      element.textContent = formattedNumber.toLocaleString() + "+";
    } else if (element.closest(".hero__stats") && target === 91) {
      element.textContent = formattedNumber + "%";
    } else {
      element.textContent = formattedNumber + "+";
    }
  }, 16);
}

function initializeTestimonials() {
  const carousel = document.getElementById("testimonials-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".testimonials__track");
  const testimonials = track ? track.querySelectorAll(".testimonial") : null;
  const prevBtn = carousel.querySelector(".testimonials__btn--prev");
  const nextBtn = carousel.querySelector(".testimonials__btn--next");

  if (!track || !testimonials || !testimonials.length || !prevBtn || !nextBtn)
    return;

  let currentIndex = 0;
  const total = testimonials.length;

  function updateCarousel() {
    track.style.transform = `translateX(${-currentIndex * 100}%)`;
    testimonials.forEach((t, i) => {
      const isActive = i === currentIndex;
      t.setAttribute("aria-hidden", String(!isActive));
      if (isActive) t.focus({ preventScroll: true });
    });
  }
  function next() {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  }
  function prev() {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  });

  let autoPlay = setInterval(next, 5000);
  carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
  carousel.addEventListener(
    "mouseleave",
    () => (autoPlay = setInterval(next, 5000))
  );

  updateCarousel();
}

function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq__item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";

      faqItems.forEach((other) => {
        if (other !== item) {
          const q = other.querySelector(".faq__question");
          const a = other.querySelector(".faq__answer");
          q?.setAttribute("aria-expanded", "false");
          a?.classList.remove("is-open");
        }
      });

      question.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("is-open", !isOpen);
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hash = this.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

function initializeForms() {
  const forms = document.querySelectorAll("form");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });
      if (isValid) {
        console.log("Form submitted successfully");
      }
    });
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
const debouncedScroll = debounce(() => {}, 10);
window.addEventListener("scroll", debouncedScroll);

window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
});
