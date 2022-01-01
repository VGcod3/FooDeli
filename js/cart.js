const cart = () => {
  const buttonCart = document.querySelector('.button-cart')
  const modalCart = document.querySelector('.modal-cart')
  const cartCross = modalCart.querySelector('.close')
  const body = modalCart.querySelector('.modal-body')
  const buttonSend = modalCart.querySelector('.button-primary')
  const clearCart = modalCart.querySelector('.clear-cart')
  const modalPriceTag = modalCart.querySelector('.modal-pricetag')

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
    renderTotalPrice()

  })

  buttonSend.addEventListener('click', (e) => {
    let cartArray = JSON.parse(localStorage.getItem('cart'))

    try {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: cartArray
      })
        .then(response => {
          if (response.ok) {
            closeCart()

            body.innerHTML = '';
          }
        })
    } catch (error) {
      console.error(e)
    }

    localStorage.removeItem('cart')
    renderTotalPrice()

  })

  function openCart() {
    disableScroll()

    renderTotalPrice()

    modalCart.classList.add('is-open')

  }

  function closeCart() {
    modalCart.classList.remove('is-open')

    renderTotalPrice()

    enableScroll()
  }

  function incremetnCount(itemId) {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.forEach(el => {
      if (el.id == itemId) {
        el.count++;
      }
    })

    localStorage.setItem('cart', JSON.stringify(cartArray))

    renderTotalPrice()

    renderItems(cartArray)

    cartArray.splice(0, 0, cartArray.length)
  }

  function decrementCount(itemId) {
    let cartArray = JSON.parse(localStorage.getItem('cart'))

    cartArray.forEach(el => {
      if (el.id == itemId) {
        el.count = el.count > 0 ? el.count - 1 : 0;
      }
    })
    cartArray = cartArray.filter(item => item.count > 0);

    localStorage.setItem('cart', JSON.stringify(cartArray))

    if (cartArray.length == 0) {
      localStorage.removeItem('cart')
    }
    renderTotalPrice()

    renderItems(cartArray)
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

    renderTotalPrice()
  }

  function renderTotalPrice() {
    if (localStorage.getItem('cart')) {
      modalPriceTag.innerText = JSON.parse(localStorage.getItem('cart'))
        .map(el => el.price * el.count)
        .reduce((acc, curr) => acc + curr, 0) + '₽'
    }

    if (!localStorage.getItem('cart')) modalPriceTag.innerText = 'The cart is empty'
  }

  function disableScroll() {
    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.body.dbScrollY = window.scrollY
    document.body.style.cssText = `
		position: fixed;
		top: ${-window.scrollY}px;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding-right: ${widthScroll}px;
	`

    modalCart.style.overflow = ''
  }

  function enableScroll() {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dbScrollY
    })
  }
}

export default cart