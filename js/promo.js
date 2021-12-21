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

export default promoJS