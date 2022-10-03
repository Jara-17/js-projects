// *Change quantity input by the user

let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click", () => {
  userInputNumber++;
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

minusBtn.addEventListener("click", () => {
  userInputNumber--;
  if (userInputNumber <= 0) {
    userInputNumber = 0;
  }
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

// Add to cart items
const addToCartBtn = document.querySelector(".details__button");
let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click", () => {
  lastValue = lastValue + userInputNumber;
  cartNotification.innerText = lastValue;
  cartNotification.style.display = "block";
  drawProductInModal();
});

// Show cart modal
const cartIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
// let priceModal = document.querySelector(".cart-modal__price");
const productContainer = document.querySelector(
  ".cart-modal__checkout-container"
);

cartIconBtn.addEventListener("click", () => {
  cartModal.classList.toggle("show");
  if (lastValue === 0) {
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
  } else {
    drawProductInModal();
  }
});

// Delete cart details
function deleteProduct() {
  const deleteProductBtn = document.querySelector(".cart-modal__delete");

  deleteProductBtn.addEventListener("click", () => {
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    lastValue = 0;
    cartNotification.innerText = lastValue;
  });
}

// SLIDER
const imageContainer = document.querySelector(".gallery__image-container");
const prevBtn = document.querySelector(".gallery__previous");
const nextBtn = document.querySelector(".gallery__next");
let imgIndex = 1;

nextBtn.addEventListener("click", () => {
  changeNextImage(imageContainer);
});

prevBtn.addEventListener("click", () => {
  changePreviosImage(imageContainer);
});

// Show image
const modalImages = document.querySelector(".modal-gallery__background");
const closeModalBtn = document.querySelector(".modal-gallery__close");

imageContainer.addEventListener("click", () => {
  modalImages.style.display = "grid";
});

closeModalBtn.addEventListener("click", () => {
  modalImages.style.display = "none";
});

// Change main image
let thumbnails = document.querySelectorAll(".gallery__thumnail");
thumbnails = [...thumbnails];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    imageContainer.style.backgroundImage = `url("../images/image-product-${e.target.id}.jpg")`;
  });
});

// Change modal images
const modalImageContainer = document.querySelector(
  ".modal-gallery__image-container"
);
let modalThumbnails = document.querySelectorAll(".modal-gallery__thumnail");
modalThumbnails = [...modalThumbnails];

modalThumbnails.forEach((modalThumbnail) => {
  modalThumbnail.addEventListener("click", (e) => {
    modalImageContainer.style.backgroundImage = `url("../images/image-product-${e.target.id.slice(
      -1
    )}.jpg")`;
  });
});

// Change image with next and prev
const nextModalBtn = document.querySelector(".modal-gallery__next");
const prevModalBtn = document.querySelector(".modal-gallery__previous");

nextModalBtn.addEventListener("click", () => {
  changeNextImage(modalImageContainer);
});

prevModalBtn.addEventListener("click", () => {
  changePreviosImage(modalImageContainer);
});

// Show modal navbar
const navModal = document.querySelector(".modal-navbar__backgound");
const navBtn = document.querySelector(".header__menu");
const navCloseBtn = document.querySelector(".modal-navbar__close-icon");

navBtn.addEventListener("click", () => {
  navModal.style.display = "block";
});

navCloseBtn.addEventListener("click", () => {
  navModal.style.display = "none";
})

// FUNCTIONS
function drawProductInModal() {
  productContainer.innerHTML = `

    <div class="cart-modal__details-container">
      <img
        src="./images/image-product-1-thumbnail.jpg"
        alt="img"
        class="cart-modal__image"
      />
      <div>
        <p class="cart-modal__product">Autumn Limited Edition...</p>
        <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
      </div>
      <img
        src="./images/icon-delete.svg"
        alt="img"
        class="cart-modal__delete"
      />
    </div>
    <button class="cart-modal__checkout">Checkout</button>
  `;
  deleteProduct();
  let priceModal = document.querySelector(".cart-modal__price");
  priceModal.innerHTML = `$125 x ${lastValue} <span>$${
    lastValue * 125
  }.00</span>`;
}

function changeNextImage(imgContainer) {
  if (imgIndex === 4) {
    imgIndex = 1;
  } else {
    imgIndex++;
  }
  imgContainer.style.backgroundImage = `url("../images/image-product-${imgIndex}.jpg")`;
}

function changePreviosImage(imgContainer) {
  if (imgIndex === 1) {
    imgIndex = 4;
  } else {
    imgIndex--;
  }
  imgContainer.style.backgroundImage = `url("../images/image-product-${imgIndex}.jpg")`;
}
