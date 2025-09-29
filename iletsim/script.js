document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");

  initScrollAnimations();
  initFormHandling();

  function initScrollAnimations() {
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

    document.querySelectorAll(".info-card, .form-container").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(el);
    });
  }

  function initFormHandling() {
    form.addEventListener("submit", handleFormSubmit);

    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearFieldError(input));
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (validateForm(data)) {
      submitForm(data);
    }
  }

  function validateForm(data) {
    let isValid = true;
    clearAllErrors();

    if (!data.name || data.name.trim().length < 2) {
      showFieldError("name", "Lütfen ad ve soyadınızı girin");
      isValid = false;
    }

    if (!data.email || !isValidEmail(data.email)) {
      showFieldError("email", "Geçerli bir e-posta adresi girin");
      isValid = false;
    }

    if (!data.subject) {
      showFieldError("subject", "Lütfen bir konu seçin");
      isValid = false;
    }

    if (!data.message || data.message.trim().length < 10) {
      showFieldError("message", "Mesajınız en az 10 karakter olmalıdır");
      isValid = false;
    }

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    clearFieldError(field);

    switch (field.name) {
      case "name":
        if (!value || value.length < 2) {
          showFieldError(field.name, "Ad ve soyadınızı girin");
        }
        break;
      case "email":
        if (!value || !isValidEmail(value)) {
          showFieldError(field.name, "Geçerli bir e-posta adresi girin");
        }
        break;
      case "subject":
        if (!value) {
          showFieldError(field.name, "Bir konu seçin");
        }
        break;
      case "message":
        if (!value || value.length < 10) {
          showFieldError(field.name, "Mesajınız en az 10 karakter olmalıdır");
        }
        break;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    field.classList.add("error");

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(field) {
    field.classList.remove("error");
    const errorMsg = field.parentNode.querySelector(".error-message");
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  function clearAllErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll("input, select, textarea").forEach((el) => {
      el.classList.remove("error");
    });
  }

  function submitForm(data) {
    const submitBtn = form.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnIcon = submitBtn.querySelector(".btn-icon i");

    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.8";
    btnText.textContent = "Gönderiliyor...";
    btnIcon.className = "fas fa-spinner fa-spin";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      btnText.textContent = "Mesajı Gönder";
      btnIcon.className = "fas fa-paper-plane";

      showSuccessModal();
      form.reset();

      console.log("[v0] Form submitted successfully:", data);
    }, 2000);
  }

  function showSuccessModal() {
    modal.style.display = "block";
    setTimeout(() => {
      modal.querySelector(".modal-btn").focus();
    }, 300);
  }

  function closeModal() {
    modal.style.display = "none";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
});
