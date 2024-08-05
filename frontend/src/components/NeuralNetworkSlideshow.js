// src/components/Slideshow.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slideshow.css'; // Optional: for custom styling

import image1 from '../pics/NN-img01.png';
import image2 from '../pics/NN-img02.png';
import image3 from '../pics/NN-img03.png';
import image4 from '../pics/NN-img04.png';
import image5 from '../pics/NN-img05.png';



const NeuralNetworkSlideshow = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" 
            style={{
                width: '50%', // Optional: Set image width
                height: '50%', // Optional: Set image height
            }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NeuralNetworkSlideshow;
