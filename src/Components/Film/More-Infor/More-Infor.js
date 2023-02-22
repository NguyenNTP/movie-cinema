import React, {useEffect, useState} from 'react';
import "./More-Infor.scss";
import Slider from "react-slick"

function MoreInfor() {

    const [moreInfors, getMoreInfor] = useState(null)

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 500,
        initialSlide: 0,
    };

    const handleImgError = (id) => {
        document.getElementById(id).remove()
    }


    useEffect(() => {
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/moreInfo")
            .then(res => res.json())
            .then(data => getMoreInfor(data))
    }, [])


    return (
        moreInfors && <Slider {...settings} className=" more-infor bx-siz">
            {
                moreInfors.map(moreInfor => {
                    return <div className="mb-20 more-infor-item" id={moreInfor.name} key={moreInfor.name}>
                        <div>
                            <img className="w-100" src={moreInfor.imagePortrait}
                                 alt={moreInfor.name}
                                /*  onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src="https://cdn.galaxycine.vn/media/2/0/200_14.jpg";
                                  }}*/
                                 onError={() => handleImgError(moreInfor.name)}
                            />
                        </div>
                        <p className="t-upper mt-10">{moreInfor.name}</p>
                    </div>
                })
            }
        </Slider>
    );
}

export default MoreInfor;