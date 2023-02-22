import React, {useEffect, useState} from 'react';
import "./Home.scss";
import MovieNow from "./MovieNow/MovieNow";
import MovieSoon from "./MovieSoon/MovieSoon";

function Home() {
    const [film, setFim] = useState();

    useEffect(() => {
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/nowAndSoon")
            .then(res => res.json())
            .then(data => {
                setFim(data)
            })
    }, [])

    return (
        <div>
            <div className="now-movie fl fl-cen">
                <div className="mainSize">
                    <div className="title-bar fl fl-spw mb-20">
                        <h3>PHIM ĐANG CHIẾU</h3>
                    </div>
                    <MovieNow data={film}/>
                </div>
            </div>

            <div className="soon-movie fl fl-cen">
                <div className="mainSize">
                    <div className="title-bar fl fl-spw mb-20">
                        <h3>PHIM SẮP CHIẾU</h3>
                    </div>
                    <MovieSoon data={film}/>
                </div>
            </div>

        </div>
    );
}

export default Home;