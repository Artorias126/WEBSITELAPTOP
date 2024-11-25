import styled from "styled-components";
import Slider from "react-slick";

export const WrapperSliderStyle = styled(Slider)`
  .slick-arrow.slick-prev {
    left: 12px;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    &::before {
      font-size: 40px;
      color: #fff;
      content: '←'; /* Hoặc để mặc định */
    }
  }

  .slick-arrow.slick-next {
    right: 28px;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    &::before {
      font-size: 40px;
      color: #fff;
      content: '→'; /* Hoặc để mặc định */
    }
  }

  .slick-dots {
    z-index: 10;
    bottom: 2px !important;
    li {
      button {
        &::before {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }
      }

      &.slick-active {
        button {
          &::before {
            color: #fff;
          }
        }
      }
    }
  }
`;
