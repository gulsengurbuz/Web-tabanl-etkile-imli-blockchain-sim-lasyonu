class BlockchainAnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.createDynamicParticles();
    this.addInteractiveEffects();
    this.startDataFlowAnimation();
    this.simulateDataUpdates();
  }

  createDynamicParticles() {
    const heroSection = document.querySelector(".blockchain-data-network");
    const aboutSection = document.querySelector(".bcl-animation-wrapper");

    if (heroSection) {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.className = "dynamic-particle";
        particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #06b6d4;
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float-particle ${
                      3 + Math.random() * 4
                    }s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    opacity: 0.6;
                `;
        heroSection.appendChild(particle);
      }
    }

    if (aboutSection) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "bcl-dynamic-particle";
        particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #3b82f6;
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float-particle ${
                      2 + Math.random() * 3
                    }s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    opacity: 0.4;
                `;
        aboutSection.appendChild(particle);
      }
    }

    const style = document.createElement("style");
    style.textContent = `
            @keyframes float-particle {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px) scale(1);
                    opacity: 0.6;
                }
                25% { 
                    transform: translateY(-20px) translateX(10px) scale(1.2);
                    opacity: 1;
                }
                50% { 
                    transform: translateY(-10px) translateX(-5px) scale(0.8);
                    opacity: 0.8;
                }
                75% { 
                    transform: translateY(-30px) translateX(15px) scale(1.1);
                    opacity: 0.9;
                }
            }
        `;
    document.head.appendChild(style);
  }

  addInteractiveEffects() {
    const heroBlocks = document.querySelectorAll(".data-block");
    heroBlocks.forEach((block) => {
      block.addEventListener("mouseenter", () => {
        block.style.transform += " scale(1.05)";
        block.style.boxShadow = "0 12px 40px rgba(6, 182, 212, 0.4)";
      });

      block.addEventListener("mouseleave", () => {
        block.style.transform = block.style.transform.replace(
          " scale(1.05)",
          ""
        );
        block.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
      });
    });

    const bclBlocks = document.querySelectorAll(".bcl-blockchain-block");
    bclBlocks.forEach((block) => {
      block.addEventListener("mouseenter", () => {
        block.style.transform += " scale(1.1)";
        block.style.borderColor = "#2563eb";
        block.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
      });

      block.addEventListener("mouseleave", () => {
        block.style.transform = block.style.transform.replace(
          " scale(1.1)",
          ""
        );
        block.style.borderColor = "rgba(59, 130, 246, 0.3)";
        block.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      });
    });
  }

  startDataFlowAnimation() {
    const createDataPulse = (startElement, endElement, color = "#06b6d4") => {
      const pulse = document.createElement("div");
      pulse.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 10px ${color};
                z-index: 100;
                pointer-events: none;
            `;

      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();
      const container =
        startElement.closest(".blockchain-data-network") ||
        startElement.closest(".bcl-animation-wrapper");

      if (container) {
        const containerRect = container.getBoundingClientRect();
        pulse.style.left = startRect.right - containerRect.left + "px";
        pulse.style.top =
          startRect.top + startRect.height / 2 - containerRect.top + "px";

        container.appendChild(pulse);

        const deltaX = endRect.left - startRect.right;
        const deltaY =
          endRect.top +
          endRect.height / 2 -
          (startRect.top + startRect.height / 2);

        pulse.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            {
              transform: `translate(${deltaX}px, ${deltaY}px) scale(0.5)`,
              opacity: 0,
            },
          ],
          {
            duration: 2000,
            easing: "ease-in-out",
          }
        ).onfinish = () => pulse.remove();
      }
    };

    const heroBlocks = document.querySelectorAll(".data-block");
    if (heroBlocks.length >= 2) {
      setInterval(() => {
        for (let i = 0; i < heroBlocks.length - 1; i++) {
          setTimeout(() => {
            createDataPulse(heroBlocks[i], heroBlocks[i + 1]);
          }, i * 500);
        }
      }, 4000);
    }

    const bclBlocks = document.querySelectorAll(".bcl-blockchain-block");
    if (bclBlocks.length >= 2) {
      setInterval(() => {
        for (let i = 0; i < bclBlocks.length - 1; i++) {
          setTimeout(() => {
            createDataPulse(bclBlocks[i], bclBlocks[i + 1], "#3b82f6");
          }, i * 400);
        }
      }, 3500);
    }
  }

  simulateDataUpdates() {
    const hashElements = document.querySelectorAll(".hash-line");

    setInterval(() => {
      const randomElement =
        hashElements[Math.floor(Math.random() * hashElements.length)];
      if (randomElement) {
        const originalText = randomElement.textContent;
        randomElement.style.color = "#06b6d4";
        randomElement.style.textShadow = "0 0 5px #06b6d4";

        setTimeout(() => {
          randomElement.style.color = "";
          randomElement.style.textShadow = "";
        }, 1000);
      }
    }, 3000);
  }
}

class TestimonialsCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial-card");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    setInterval(() => this.nextSlide(), 5000);
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }
}

class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item");
    this.init();
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => this.toggleItem(item));
    });
  }

  toggleItem(item) {
    const isActive = item.classList.contains("active");

    this.faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
      const icon = faqItem.querySelector(".faq-icon");
      icon.textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      const icon = item.querySelector(".faq-icon");
      icon.textContent = "−";
    }
  }
}

class NewsletterForm {
  constructor() {
    this.form = document.querySelector(".newsletter-form");
    this.input = document.querySelector(".newsletter-input");
    this.button = document.querySelector(".newsletter-btn");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.handleSubmit();
      }
    });
  }

  handleSubmit() {
    const email = this.input.value.trim();

    if (!this.isValidEmail(email)) {
      this.showMessage("Lütfen geçerli bir e-posta adresi girin.", "error");
      return;
    }

    this.button.textContent = "Gönderiliyor...";
    this.button.disabled = true;

    setTimeout(() => {
      this.showMessage("Başarıyla abone oldunuz!", "success");
      this.input.value = "";
      this.button.textContent = "Abone Ol";
      this.button.disabled = false;
    }, 1500);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(message, type) {
    const existingMessage = document.querySelector(".newsletter-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageEl = document.createElement("div");
    messageEl.className = `newsletter-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
            margin-top: 12px;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            ${
              type === "success"
                ? "background: rgba(34, 197, 94, 0.1); color: #16a34a; border: 1px solid rgba(34, 197, 94, 0.2);"
                : "background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2);"
            }
        `;

    this.form.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BlockchainAnimationController();

  new TestimonialsCarousel();

  new FAQAccordion();

  new NewsletterForm();

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".data-block, .bcl-blockchain-block, .about-content, .feature-card, .testimonial-card, .faq-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
});

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "8s");
} else {
  document.documentElement.style.setProperty("--animation-duration", "4s");
}
