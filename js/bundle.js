/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/auth.js":
/*!********************!*\
  !*** ./js/auth.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const auth = () => {
  const buttonAuth = document.querySelector('.button-auth')
  const buttonOut = document.querySelector('.button-out')
  const modalAuth = document.querySelector('.modal-auth')

  const userName = document.querySelector('.user-name')

  const modalClose = document.querySelector('.close-auth')

  const logInForm = document.getElementById('logInForm')
  const inputLogin = document.getElementById('login')
  const inputPassword = document.getElementById('password')

  const buttonCart = document.querySelector('.button-cart')


  buttonAuth.addEventListener('click', (e) => {
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')));
      logIn(JSON.parse(localStorage.getItem('user')))
    } else {
      openLogin()
    }
  })

  modalClose.addEventListener('click', (e) => {
    closeLogin()
  })

  modalAuth.addEventListener('click', (e) => {
    if (e.target == modalAuth) {
      closeLogin()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') closeLogin()
  })

  buttonOut.addEventListener('click', () => {
    logOut()
  })

  logInForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = {
      login: inputLogin.value,
      password: inputPassword.value
    }


    logIn(user)
    closeLogin()

    localStorage.setItem('user', JSON.stringify(user))

    inputPassword.style.border = ""
  })



  function openLogin() {
    modalAuth.style.display = 'flex'
  }

  function closeLogin() {
    modalAuth.style.display = 'none'
  }

  function logIn(user) {
    buttonAuth.style.display = 'none';

    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    userName.textContent = user.login;
    buttonCart.style.display = 'flex'
  }

  function logOut() {
    console.log('OUT');

    buttonAuth.style.display = 'flex';

    buttonOut.style.display = "";
    userName.style.display = "";
    buttonCart.style.display = '';


    localStorage.removeItem('user')
  }


  if (localStorage.getItem('user')) {
    logIn(JSON.parse(localStorage.getItem('user')));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (auth);

/***/ }),

/***/ "./js/cart.js":
/*!********************!*\
  !*** ./js/cart.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cart = () => {
  const buttonCart = document.querySelector('.button-cart')
  const modalCart = document.querySelector('.modal-cart')
  const cartCross = modalCart.querySelector('.close')
  const body = modalCart.querySelector('.modal-body')
  const buttonSend = modalCart.querySelector('.button-primary')
  const clearCart = modalCart.querySelector('.clear-cart')


  buttonCart.addEventListener("click", (e) => {
    openCart()

    if (localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')))
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target == modalCart) {
      closeCart()
    }
  })

  cartCross.addEventListener('click', () => {
    closeCart()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
      closeCart()
    }
  })

  body.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.classList.contains('btn-inc')) {
      incremetnCount(e.target.dataset.index)
    } else if (e.target.classList.contains('btn-dec')) {
      decrementCount(e.target.dataset.index)
    }
  })

  clearCart.addEventListener('click', (e) => {
    e.preventDefault()

    closeCart()
    localStorage.removeItem('cart')
    body.innerHTML = '';


  })

  buttonSend.addEventListener('click', (e) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))
    try {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: cartArray
      })
        .then(response => {
          if (response.ok) {
            closeCart()

            localStorage.removeItem('cart')
            body.innerHTML = '';
          }
        })
    } catch (error) {
      console.error(e)
    }

  })

  function openCart() {
    modalCart.classList.add('is-open')
  }

  function closeCart() {
    modalCart.classList.remove('is-open')
  }

  function incremetnCount(item) {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.map(el => {


      if (el.id == item) {
        el.count++
      }
      return el
    })
    renderItems(cartArray)

    localStorage.setItem('cart', JSON.stringify(cartArray))
  }

  function decrementCount(item) {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.map(el => {

      if (el.id == item) {
        el.count = el.count > 0 ? el.count - 1 : 0;
      }
      return el
    })

    renderItems(cartArray)

    localStorage.setItem('cart', JSON.stringify(cartArray))
  }

  function renderItems(data) {
    body.innerHTML = ''

    data.forEach(item => {

      const row = document.createElement('div')

      row.classList.add('food-row')

      row.innerHTML = `
        <span class="food-name" > ${item.name}</ >
					<strong class="food-price">${item.price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button btn-dec" data-index="${item.id}"> - </button>
						<span class="counter">${item.count}</span>
						<button class="counter-button btn-inc" data-index="${item.id}"> + </button>`
      body.append(row)
    })
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cart);

/***/ }),

/***/ "./js/partners.js":
/*!************************!*\
  !*** ./js/partners.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const partners = () => {
  const cardsRestaurants = document.querySelector('.cards-restaurants')


  const renderCard = (item) => {
    const a = document.createElement('a')
    const { image, kitchen, name, price, products, stars, time_of_delivery } = item;

    a.setAttribute('href', '/restaurant.html')
    a.classList.add('card', 'card-restaurant')
    a.dataset.products = products;
    a.innerHTML = `
        <img src="${image}" alt="image" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${time_of_delivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
             ${stars}
            </div>
            <div class="price">От ${price}₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      `

    a.addEventListener('click', e => {
      e.preventDefault();

      localStorage.setItem("restaurant", JSON.stringify(item))

      window.location.href = 'restaurant.html'
      console.log(localStorage.getItem('restaurant'));
    })
    cardsRestaurants.append(a)
  }
  try {
    fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/partners.json`)
      .then(response => response.json())
      .then(response => response.forEach(data => {
        try {
          renderCard(data)
        } catch (error) {
          
        }
      }))
  } catch (error) {
    console.error(error)
  }


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partners);


/***/ }),

/***/ "./js/promo.js":
/*!*********************!*\
  !*** ./js/promo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function promoJS() {
  const containerPromo = document.querySelector('.container-promo')

  try {
    fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/containerPromoContent.json`)
      .then(response => response.json())
      .then(data => {
        try {
          renderPromo(data)
        } catch (error) {
        }

      })
  } catch (error) {
    console.error(error)
  }


  function renderPromo(data) {
    const promocard = document.createElement('section')
    promocard.classList.add('promo')
    let rEl = randomElement(data)
    promocard.classList.add(`${rEl}`)
    promocard.innerHTML = data[rEl]
    containerPromo.append(promocard)
  }

  function randomElement(data) {
    const keysArr = Object.keys(data)
    let randomN = Math.floor(Math.random() * keysArr.length)

    return keysArr[randomN]
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promoJS);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./js/auth.js");
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart */ "./js/cart.js");
/* harmony import */ var _partners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./partners */ "./js/partners.js");
/* harmony import */ var _promo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./promo */ "./js/promo.js");





(0,_auth__WEBPACK_IMPORTED_MODULE_0__["default"])()
;(0,_cart__WEBPACK_IMPORTED_MODULE_1__["default"])()
;(0,_partners__WEBPACK_IMPORTED_MODULE_2__["default"])()
;(0,_promo__WEBPACK_IMPORTED_MODULE_3__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map