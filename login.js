import hotelsDropdown from "./hotelsDropdown.js";
import restaurantDropdown from "./restaurantDropdown.js";
import register from "./register.js";
import loginHtml from "./loginHtml.js";
import searchButton from "./searchButton.js";

let contentHtml;
let searchingButton = document.querySelector(".searchingButton");
const content = document.querySelector(".content");
const headerMenuBarLogin = document.querySelector(".header-menu-bar-login");
const mainMenuBodyLogin = document.querySelector(".main-menu-body-login");
const headerMenuCloseButtonLogin = document.querySelector(
  ".header-menu-close-button-login"
);
const headerMenuBarButtonLogin = document.querySelector(
  ".header-menu-bar-button-login"
);
headerMenuBarButtonLogin.addEventListener("click", () => {
  content.style.display = "none";
  headerMenuBarLogin.style.display = "block";
  mainMenuBodyLogin.style.display = "block";
});
headerMenuCloseButtonLogin.addEventListener("click", () => {
  content.style.display = "block";
  headerMenuBarLogin.style.display = "none";
  mainMenuBodyLogin.style.display = "none";
});

// headerMenuCloseBtnIconLogin.addEventListener("click", () => {
//   content.style.display = "initial";
//   headerMenuBarLogin.style.display = "none";
//   mainMenuBodyLogin.style.display = "none";
// });

searchingButton.addEventListener("click", () => {
  contentHtml = content.innerHTML;
  content.innerHTML = searchButton;
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    content.innerHTML = contentHtml;
  });
});

let toTopArrow = document.querySelector(".toTopArrow");
toTopArrow.style.display = "none";
window.addEventListener("scroll", () => {
  if (window.scrollY > 370) {
    toTopArrow.style.display = "block";
  } else {
    toTopArrow.style.display = "none";
  }
});
toTopArrow.onclick = function () {
  window.scrollTo(0, 0);
};

const hotelsDropdownButton = document.querySelector(".hotels.dropdownAble");
const restaurantsDropdownButton = document.querySelector(
  ".restaurants.dropdownAble"
);
const headerDropdown = document.querySelector(".header-dropdown");

document.body.addEventListener("mouseover", (e) => {
  const cPath = e.composedPath();

  const isHeaderDropdownActive = headerDropdown.classList.contains("active");

  if (cPath.includes(hotelsDropdownButton)) {
    if (isHeaderDropdownActive) return;

    hotelsDropdownButton.classList.add("active");

    headerDropdown.innerHTML = hotelsDropdown;

    headerDropdown.classList.add("active");

    return;
  }

  if (cPath.includes(restaurantsDropdownButton)) {
    if (isHeaderDropdownActive) return;

    restaurantsDropdownButton.classList.add("active");

    headerDropdown.innerHTML = restaurantDropdown;

    headerDropdown.classList.add("active");

    return;
  }

  if (cPath.includes(headerDropdown)) {
    return;
  }

  restaurantsDropdownButton.classList.remove("active");

  hotelsDropdownButton.classList.remove("active");

  headerDropdown.classList.remove("active");
});

let toggleButton = document.getElementById("toggleButton");
let isToggled = false;

toggleButton.addEventListener("click", () => {
  isToggled = !isToggled;
  if (isToggled) {
    toggleButton.textContent = "TR";
  } else {
    toggleButton.textContent = "EN";
  }
});

// Initial invocation of the task

const registerForm = document.querySelector(".register-form");
const signInButton = document.getElementById("signIn");

let tabItem = document.querySelectorAll(".tab-item");
tabItem.forEach((element) => {
  element.addEventListener("click", (el) => {
    const targetEl = el.target;
    tabItem.forEach((borderItem) => {
      borderItem.classList.remove("active");
    });
    targetEl.classList.add("active");

    if (targetEl.classList.contains("login")) {
      registerForm.innerHTML = loginHtml;
      signInButton.textContent = "Giriş Yap";
    } else {
      registerForm.innerHTML = register;
      signInButton.textContent = "Kayıt ol";
      console.log(document.querySelector("#selectGender"));
      new SlimSelect({
        select: "#selectGender",
      });
      // Initialize the intlTelInput plugin
      let input = document.querySelector("#phone");
      let iti = window.intlTelInput(input, {
        initialCountry: "auto",
        separateDialCode: true,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
      });
      function handleSubmit() {
        let phoneNumber = iti.getNumber();
        console.log("Phone Number: " + phoneNumber);
      }

      document.querySelector(".signIn").onclick = function (event) {
        event.preventDefault(); // Prevent form submission
        handleSubmit();
      };
    }
  });
});
registerForm.innerHTML = loginHtml;

const mainMenu = document.querySelectorAll(".menu");
const menuContainer = document.querySelector(".menu-container");
const menuCloseBtn = document.querySelector(".menu-close-button");
const loginPage = document.querySelector(".loginPage");

mainMenu.forEach((menuElement) => {
  menuElement.addEventListener("click", () => {
    menuContainer.style.display = "flex";
    loginPage.style.display = "none";
  });
});
menuCloseBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  loginPage.style.display = "block";
});

const menuImage = document.querySelector(".menu-image");
const menuImageList = document.querySelectorAll(".menu-image-list");
const imageUrlArray = [
  "https://divancdn.azureedge.net/divan/media/divan/hamburger-menu-gorselleri/otel.jpg?ext=.jpg",
  "https://divancdn.azureedge.net/divan/media/divan/hamburger-menu-gorselleri/residans-hamburger.jpg?ext=.jpg",
  "https://divancdn.azureedge.net/divan/media/divan/hamburger-menu-gorselleri/meeting-hamburger.jpg?ext=.jpg",
  "https://divancdn.azureedge.net/divan/media/divan/hamburger-menu-gorselleri/restoren-hamburger-yeni.jpg?ext=.jpg",
  "https://divancdn.azureedge.net/getmedia/b6a59d87-3e6b-4e99-8b2a-540c31ed697b/pastane.jpg?width=928&height=809&ext=.jpg",
  "https://divancdn.azureedge.net/getmedia/ba0969df-c36f-47a4-b4c7-dc5bf11c939c/1250x1080-inbakery-aile_1.jpg?width=1249&height=1079&ext=.jpg",
  "https://divancdn.azureedge.net/divan/media/divan/hamburger-menu-gorselleri/catering-hamburger.jpg?ext=.jpg",
];

menuImageList.forEach((hamburgerImages, index) => {
  hamburgerImages.addEventListener("mouseenter", () => {
    menuImage.src = imageUrlArray[index];
  });
});
