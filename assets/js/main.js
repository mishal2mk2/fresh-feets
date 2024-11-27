/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "bx-toggle-left"
    : "bx-toggle-right";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("questionnairePopup");
  const steps = document.querySelectorAll(".step");
  const progress = document.getElementById("progress");
  const nextButtons = document.querySelectorAll(".next");
  const prevButtons = document.querySelectorAll(".prev");
  const submitButton = document.getElementById("submit");

  let currentStep = 0;

  // Show popup after 30 seconds if not already answered
  if (!localStorage.getItem("multiStepAnswered")) {
    setTimeout(() => {
      popup.classList.add("show");
    }, 10000);
  }

  // Function to update the step view
  function updateStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex);
    });
    progress.style.width = ((stepIndex + 1) / steps.length) * 100 + "%";
  }

  // Validate inputs for the current step
  function validateInputs(stepIndex) {
    const currentStepElement = steps[stepIndex];
    const inputs = currentStepElement.querySelectorAll("input, select");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add("invalid");
        input.addEventListener("input", () =>
          input.classList.remove("invalid")
        ); // Remove error on input
      }
    });

    return isValid;
  }

  // Handle next buttons
  nextButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(index);
      console.log(steps.length);
      if(index === 2){
        const nameInput = document.getElementById("name");
        const name = nameInput.value || "friend"; // Use 'friend' if no name is provided
        const thankYouMessage = `
          Thank you, <span class="primary-color">${name}</span>! We’ve received your details and service preferences.
          We’ll get back to you soon!
      `;
    
        // Modify the content of the final step dynamically
        const step4 = document.getElementById("thanks_note");
        step4.innerHTML = `<h2>${thankYouMessage}</h2>`;
      }
      
      if (index < steps.length - 1) {
        if (validateInputs(currentStep)) {
          currentStep++;
          updateStep(currentStep);
        }
      }
    });
  });

  // Handle previous buttons
  prevButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index >= 0) {
        currentStep--;
        updateStep(currentStep);
      }
    });
  });

  // Handle final submission
  submitButton.addEventListener("click", () => {
    
    popup.classList.remove("show");
    localStorage.setItem("multiStepAnswered", "true");
  });

  // Initialize the first step
  updateStep(currentStep);
});

const navbar = document.getElementById("header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > 0 && window.scrollY > lastScrollY) {
    // Scrolling down
    navbar.classList.add("visible");
  } else if (window.scrollY === 0) {
    // At the top of the page
    navbar.classList.remove("visible");
  }
  lastScrollY = window.scrollY;
});

function selectCard(card) {
  // Remove selected class from all cards
  const cards = document.querySelectorAll(".pricing-card");
  cards.forEach((c) => c.classList.remove("selected"));

  // Add selected class to clicked card
  const serviceName = card
    .closest(".service")
    .getAttribute("data-service-name");
  card.classList.add("selected");
  // Get the selected pricing details
  const priceType = card.querySelector(".pricing-card__type").innerText;
  const price = card.querySelector(".pricing-card__price").innerText;
  const description = card.querySelector(".pricing-card__desc").innerText;

  // Predefine the WhatsApp message
  const message = `Hello, I am interested in the "${serviceName}" service with the "${priceType}" package priced at ${price}. Details: ${description}`;

  // Encode the message for use in a URL
  const encodedMessage = encodeURIComponent(message);

  // Replace 'YOUR_PHONE_NUMBER' with your business's WhatsApp number
  const whatsappLink = `https://wa.me/919876543210?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.location.href = whatsappLink;
}
