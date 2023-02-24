import React, {useEffect, useState, Suspense} from 'react';
import "./Home.scss";
import * as Services from '../../APIServices/Services'
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import Loading from "../Loading/Loading";

const MovieNow = React.lazy(() => import("./MovieNow/MovieNow"))
const MovieSoon = React.lazy(() => import("./MovieSoon/MovieSoon"))

function Home() {
    const [film, setFilm] = useState();

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await Services.getLsFilmAPI()
            setFilm(res)
        }
        fetchAPI()
    }, [])

    return (
        <Suspense fallback={<Loading/>}>
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
        </Suspense>
    );
}

export default Home;