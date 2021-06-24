import React from 'react'
import './styles/Carousel1.scss'
import {Carousel} from 'react-bootstrap'
const Carousel1 = () => {
    return (
<div>     
  <Carousel>
    <Carousel.Item className="carousel-item">
      <img
        className="d-block w-100"
        src="https://i.picsum.photos/id/1070/5472/3648.jpg?hmac=oFxAwLeGJmas45_yf5NdpeQzexAF-tMVL6q9JwvSuo0"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Najnowsze modele</h3>
        <p>Wszystkie nasze auta sa nowe!</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://i.picsum.photos/id/1071/3000/1996.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Luksus na kazda kieszen</h3>
        <p>Oferujemy luksusowe auta w przystepnych cenach.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://i.picsum.photos/id/1072/3872/2592.jpg?hmac=I5d8vixhn6Ne9Ao1YQdtHfxS2YKNyx6_Bu8N_V1-ovk"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Idealny stan!</h3>
        <p>Gwarancja idealnego stanu wypozyczanych aut.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</div>   
        
    )
}

export default Carousel1
