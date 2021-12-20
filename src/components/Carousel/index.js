import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Autoplay, Pagination } from "swiper";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import "./index.css";

SwiperCore.use([Autoplay, Pagination]);

const Carousel = props => {

    const {
        children,
        ...other
    } = props;

    return (
        <Swiper
            {...other}
            className="carousel-swiper"
            autoplay={{
                delay: 3000
            }}
            
        >
            {children.map((value, index) => (
                <SwiperSlide
                 key={index}
                 >
                     {value}
                     </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Carousel;