const menu = () => {
  const cardsMenu = document.querySelector('.cards-menu')
  const sectionHeading = document.querySelector('.section-heading')

  const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  const changeTitle = restaurant => {
    sectionHeading.innerHTML = `
    <h2 class="section-title restaurant-title">${restaurant.name}</h2>
					<div class="card-info">
						<div class="rating">
							${restaurant.stars}
						</div>
						<div class="price">От ${restaurant.price} ₽</div>
						<div class="category">${restaurant.kitchen}</div>
					</div>`
  }

  const addToCart = (cartItem) => {

    if (cartArray.some(item => item.id === cartItem.id)) {
      cartArray.map(item => {
        if (item.id === cartItem.id) {
          item.count++
        }
        return item
      })
    }
    else {
      cartArray.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(cartArray))
  }

  const renderCard = ({ description, id, image, name, price }) => {

    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
    <div class="card">
              <img src="${image}" alt="${name}" class="card-image" />
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">${description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">${price} ₽</strong>
                </div>
              </div>
            </div>
  `;
    card.querySelector('.button-add-cart').addEventListener('click', (e) => {
      addToCart({ name, price, id, count: 1 })
    })

    cardsMenu.append(card)
  }



  if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));

    changeTitle(restaurant)

    fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/${restaurant.products}`)
      .then(response => response.json())
      .then(response => response.forEach(data => renderCard(data)))
      .catch(error => console.error(error))
  } else {
    window.location.href = '/';
  }
}

menu()