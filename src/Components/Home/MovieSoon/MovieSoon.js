import React from 'react';
import "./MovieSoon.scss";
import Slider from "react-slick"
import {useNavigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {settings} from "../MovieNow/MovieNow";


function MovieSoon(props) {

    const nav = useNavigate()
    const ShowFilm = (id) => {
        nav('/Film/' + id)
    }

    return (
        <Slider className="box-movie" {...settings}>
            {
                props.data && props.data.movieCommingSoon.map((n, index) => {
                        return <div key={index} className="movie fl fl-col" onClick={() => ShowFilm(n.id)}>
                            <div className="img-cover">
                                <img src={n.imagePortrait}
                                     alt="avatar"/>
                            </div>
                            <p className="pr-20">{n.name}</p>
                            <p className="subname pr-20">{n.subName}</p>
                        </div>
                    }
                )
            }
        </Slider>
    );
}

export default MovieSoon;