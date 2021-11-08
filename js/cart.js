const cart = () => {
  const buttonCart = document.querySelector('.button-cart')
  const modalCart = document.querySelector('.modal-cart')
  const cartCross = modalCart.querySelector('.close')
  const body = modalCart.querySelector('.modal-body')
  const buttonSend = modalCart.querySelector('.button-primary')

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

  buttonSend.addEventListener('click', (e) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray
    })
      .then(response => {
        if (response.ok) {
          closeCart()

          localStorage.removeItem('cart')
        }
      })
      .catch(e => {
        console.error(e)
      })

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

cart()