import hotelsDropdown from "./hotelsDropdown.js";
import restaurantDropdown from "./restaurantDropdown.js";
import searchButton from "./searchButton.js";
import categorySplide from "./categorySplide.js";

const header = document.getElementById("main-header");
const headerClick = document.querySelectorAll(".headerClick");
const initialBackgroundColor = getComputedStyle(header).backgroundColor;

const turnHeaderToBlack = () => {
  header.style.backgroundColor = initialBackgroundColor;
  headerClick.forEach((headerClick) => {
    headerClick.style.color = "white";
  });
};
const turnHeaderToWhite = () => {
  header.style.backgroundColor = "white";

  headerClick.forEach((headerClick) => {
    headerClick.style.color = "black";
  });
};

const menuButtonHeader = document.querySelector(".menuButton-Header");
let scrollPosition = 0;
window.addEventListener("scroll", () => {
  const newScrollPosition = window.scrollY;
  const searchContainer = document.querySelector(".search-container");

  if (newScrollPosition > 1 || !!searchContainer) {
    turnHeaderToWhite();
  } else {
    turnHeaderToBlack();
  }
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

let categorySplideInstance;

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel").mount();

  const splide = new Splide(".catagory-splide", {
    snap: true,
    perPage: 3,
    breakpoints: {
      9999: {
        perPage: 3,
      },
      991: {
        perPage: 2,
      },
      556: {
        perPage: 1,
      },
      320: {
        perPage: 1,
      },
    },
    // focus: "center",
    autoplay: true,
  });

  categorySplideInstance = splide;

  const iconBoxSliderSection = new Splide(".icon-box-slider-section", {
    perPage: 6,
    snap: true,
    focus: 0,
    omitEnd: true,
    breakpoints: {
      900: {
        perPage: 4,
      },
      640: {
        perPage: 2,
      },
      320: {
        perPage: 1,
      },
    },
  });

  iconBoxSliderSection.mount();
  splide.mount();
});

let catagoryItem = document.querySelectorAll(".catagory_item");
catagoryItem.forEach((el) => {
  el.addEventListener("click", (e) => {
    const targetEl = e.target;
    catagoryItem.forEach((catEl) => {
      catEl.classList.remove("active");
    });
    targetEl.classList.add("active");
  });
});

const categoryListContainer = document.querySelector(".catagory__splide__list");
const allBtn = document.querySelectorAll(".all");

categoryListContainer.innerHTML = categorySplide;

allBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    const elementTarget = e.target;

    categorySplideInstance.destroy();

    categoryListContainer.innerHTML = categorySplide;

    const categoryItems = document.querySelectorAll(
      ".catagory_list__splide_slide"
    );

    if (elementTarget.classList.contains("hotels-btn")) {
      categoryItems.forEach((item) => {
        if (item.classList.contains("hotelsImage")) {
          item.style.display = "inline-block";

          return;
        }

        item.remove();
      });
    }

    categorySplideInstance.mount();
  });
});

new SlimSelect({
  select: "#offerSelect",
  events: {
    afterChange: (newVal) => {
      const SlimSelectList = newVal[0].value;

      categoryListContainer.innerHTML = categorySplide;

      const categoryItems = document.querySelectorAll(
        ".catagory_list__splide_slide"
      );
      if (SlimSelectList === "hotels") {
        categorySplideInstance.destroy();
        categoryItems.forEach((item) => {
          if (item.classList.contains("hotelsImage")) {
            return;
          }

          item.remove();
        });

        categorySplideInstance.mount();
      } else {
        categorySplideInstance.destroy();
        categorySplideInstance.mount();
      }
    },
  },
});

let toTop = document.querySelector(".toTop");
toTop.style.display = "none";
window.addEventListener("scroll", () => {
  if (window.scrollY > 570) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
});
toTop.onclick = function () {
  window.scrollTo(0, 0);
};
let footer = document.querySelector(".footer");
window.addEventListener("scroll", () => {
  const footerTop = footer.getBoundingClientRect().top;
  const threshold = 80;

  if (footerTop <= window.innerHeight - threshold) {
    toTop.style.backgroundColor = "#071620";
    toTop.style.color = "#fff";
  } else {
    toTop.style.backgroundColor = "#0E78BD";
  }
});

const hotelsDropdownButton = document.querySelector(".hotels.dropdownAble");
const restaurantsDropdownButton = document.querySelector(
  ".restaurants.dropdownAble"
);
const headerDropdown = document.querySelector(".header-dropdown");

document.body.addEventListener("mouseover", (e) => {
  const searchContainer = document.querySelector(".search-container");
  const cPath = e.composedPath();

  const isHeaderDropdownActive = headerDropdown.classList.contains("active");

  if (cPath.includes(hotelsDropdownButton)) {
    if (isHeaderDropdownActive) return;

    hotelsDropdownButton.classList.add("active");

    headerDropdown.innerHTML = hotelsDropdown;

    headerDropdown.classList.add("active");

    turnHeaderToWhite();

    return;
  }

  if (cPath.includes(restaurantsDropdownButton)) {
    if (isHeaderDropdownActive) return;

    restaurantsDropdownButton.classList.add("active");

    headerDropdown.innerHTML = restaurantDropdown;

    headerDropdown.classList.add("active");

    turnHeaderToWhite();

    return;
  }

  if (cPath.includes(headerDropdown)) {
    return;
  }

  restaurantsDropdownButton.classList.remove("active");

  hotelsDropdownButton.classList.remove("active");

  if (
    // document.body.scrollHeight > document.body.clientHeight &&
    window.scrollY <= 1 &&
    !searchContainer
  ) {
    turnHeaderToBlack();
  }

  headerDropdown.classList.remove("active");
});

let contentHtml;
let searchingButton = document.querySelector(".searchingButton");
const content = document.querySelector(".content");

searchingButton.addEventListener("click", () => {
  contentHtml = content.innerHTML;
  content.innerHTML = searchButton;
  const closeBtn = document.querySelector(".close-btn");
  turnHeaderToWhite();

  closeBtn.addEventListener("click", () => {
    content.innerHTML = contentHtml;

    if (
      document.body.scrollHeight > document.body.clientHeight &&
      window.scrollY <= 1
    ) {
      turnHeaderToBlack();
    }
  });
  header.style.backgroundColor = "white";
});

const mainMenu = document.querySelectorAll(".menu");
// const menuBarSide = document.querySelector(".menuBarSide");
const menuContainer = document.querySelector(".menu-container");
const menuCloseBtn = document.querySelector(".menu-close-button");
const home = document.querySelector(".home");
const headerMenuBar = document.querySelector(".header-menu-bar");
const mainMenuBody = document.querySelector(".main-menu-body");
const headerMenuBarButton = document.querySelector(".header-menu-bar-button");
const headerMenuCloseBtnIcon = document.querySelector(
  ".headerMenuCloseBtnIcon"
);

headerMenuBarButton.addEventListener("click", () => {
  home.style.display = "none";
  headerMenuBar.style.display = "flex";
  mainMenuBody.style.display = "initial";
});

headerMenuCloseBtnIcon.addEventListener("click", () => {
  home.style.display = "block";
  headerMenuBar.style.display = "none";
  mainMenuBody.style.display = "none";
});

mainMenu.forEach((menuElement) => {
  menuElement.addEventListener("click", () => {
    menuContainer.style.display = "flex";
    home.style.display = "none";
  });
});
menuCloseBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  home.style.display = "block";
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
