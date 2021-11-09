const promoJS = () => {
  const containerPromo = document.querySelector('.container-promo')


  fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/containerPromoContent.json`)
    .then(response => response.json())
    .then(data => renderPromo(data))

  function renderPromo(data) {
    const promocard = document.createElement('section')
    promocard.classList.add('promo')
    let rEl = randomElement(data)
    promocard.classList.add(`${rEl}`)
    promocard.innerHTML = data[rEl]
    console.log(promocard);
    containerPromo.append(promocard)
  }

  function randomElement(data) {
    const keysArr = Object.keys(data)
    let randomN = Math.floor(Math.random() * keysArr.length)

    return keysArr[randomN]
  }

}

promoJS()