import React from 'react';
import "./MovieNow.scss";
import {useNavigate} from "react-router-dom";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows: false
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 2,
                arrows: false
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                arrows: false
            }
        }
    ]
};

function MovieNow(props) {

    const nav = useNavigate()
    const ShowFilm = (id) => {
        nav('/Film/' + id)
    }

    return (
        <Slider className="box-movie" {...settings}>
            {
                props.data && props.data.movieShowing.map((n, index) => {
                        return <div key={index} className="movie fl fl-col" onClick={() => ShowFilm(n.id)}>
                            <div className="img-cover">
                                <img src={n.imagePortrait}
                                     alt="avatar"/>
                            </div>
                            <p className="pr-20">{n.name}</p>
                            <p className="subname fs-14 pr-20">{n.subName}</p>
                        </div>
                    }
                )
            }
        </Slider>

    );
}

export default MovieNow;