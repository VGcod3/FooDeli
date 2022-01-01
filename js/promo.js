import Swiper, { Navigation } from 'swiper';
import 'swiper/css';

Swiper.use([Navigation]);


function promoJS() {

  const containerPromo = document.querySelector('.container-promo')

  containerPromo.classList.add('swiper')

  try {
    fetch(`https://foodeli-e9cf4-default-rtdb.europe-west1.firebasedatabase.app/db/containerPromoContent.json`)
      .then(response => response.json())
      .then(data => {
        try {
          renderPromo(data)
        } catch (error) {
          console.log(error);
        }

      })
  } catch (error) {
    console.error(error)
  }


  function renderPromo(data) {

    const swiperWrapper = document.createElement('div')
    swiperWrapper.classList.add('swiper-wrapper', 'wrapper')
    containerPromo.append(swiperWrapper);


    Object.entries(data).forEach(data => {
      const promocard = document.createElement('section')
      promocard.classList.add(`${data[0]}`, 'promo', 'swiper-slide')
      promocard.innerHTML = data[1]

      swiperWrapper.append(promocard)
    })


    addArrows()

    makeSlider()
  }

  function addArrows() {

    const arrows = document.createElement('div')
    arrows.classList.add('arrows')

    containerPromo.append(arrows)

    const arrowL = document.createElement('div')
    arrowL.classList.add("arrow", "swiper-button-next")
    arrows.append(arrowL)
    arrowL.innerHTML = ''

    const imgL = document.createElement('img')
    imgL.setAttribute('src', "img/icon/arrowL.svg")
    arrowL.append(imgL)


    console.log(arrows);

    const arrowR = document.createElement('div')
    arrowR.classList.add("arrow", "swiper-button-prev")
    arrows.append(arrowR)
    arrowR.innerHTML = ''

    const imgR = document.createElement('img')
    imgR.setAttribute('src', "img/icon/arrowR.svg")
    arrowR.append(imgR)

    /*  containerPromo.innerHTML += `
       <div class="swiper-button-prev"></div>
   <div class="swiper-button-next"></div>
     ` */


  }


  function makeSlider() {

    let slider = new Swiper('.container-promo', {

      spaceBetween: 30,

      // Navigation arrows
      navigation: {
        prevEl: '.swiper-button-next',
        nextEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 50,
      },

      observer: true,
      observeParents: true,

      loop: true,

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },

    });

  }

  document.addEventListener('click', e => console.log(e.target))


}

export default promoJS