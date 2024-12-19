import React from "react";
import { Image } from "antd";
import { WrapperSliderStyle } from "./style";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
  };

  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`slider-${index}`}
            preview={false}
            width="100%"
            height="350px"
            style={{ objectFit: "cover" }} // Đảm bảo ảnh vừa khung
          />
      ))}
    </WrapperSliderStyle>
  );
};

export default SliderComponent;
