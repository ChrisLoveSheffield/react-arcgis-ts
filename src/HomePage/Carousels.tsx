import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import img from '../images/BackGround.png'
import img1 from '../images/AutodeskForgeLogo.png'
import img2 from '../images/EsrLogo.png'
import img3 from '../images/AecomLogo.png'
import './css/Carousel.css'

function HomePageCarousel() {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }

    return (
        <Carousel id="Carousel" activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="w-50 d-block "
                    src={img1}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}
                    alt="First slide"
                ></img>
                <img className="d-block w-10 custromCarousel" src={img} alt="Second slide" />
                <Carousel.Caption>
                    <h3>Autodesk Forge</h3>
                    <p>View Extension</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-50 d-block "
                    src={img2}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}
                    alt="First slide"
                ></img>
                <img className="d-block h-10 custromCarousel " height={'100%'} src={img} alt="Second slide" />

                <Carousel.Caption>
                    <h3>Esri Arcgis</h3>
                    <p>Map Javascript Api</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-50 d-block "
                    src={img3}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' }}
                    alt="First slide"
                ></img>
                <img className="d-block w-10 custromCarousel" src={img} alt="Third slide" />

                <Carousel.Caption>
                    <h3>AECOM</h3>
                    <p>Digital Solution Software Developer</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export { HomePageCarousel }
