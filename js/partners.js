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


  fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/partners.json`)
    .then(response => response.json())
    .then(response => response.forEach(data => renderCard(data)))
    .catch(error => console.error(error))


}

partners()