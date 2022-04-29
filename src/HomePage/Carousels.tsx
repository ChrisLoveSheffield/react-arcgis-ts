import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import img from '../images/BackGround.png'
import './css/Carousel.css'

function HomePageCarousel() {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }

    return (
        <Carousel id="Carousel" activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="First slide" />
                <Carousel.Caption>
                    <h3>Digital Aecom</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="Second slide" />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="Third slide" />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export { HomePageCarousel }
