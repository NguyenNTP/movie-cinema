import React, {useEffect, useState, Suspense} from 'react';
import {useParams} from "react-router-dom";
import {Col, Row} from 'antd';
import './Film.scss';
import {useDispatch} from "react-redux";
import {getSchedule, getFilm} from "../../Redux/Action";
import * as Services from "../../APIServices/Services"
import Loading from "../Loading/Loading";


const FilmDetail = React.lazy(() => import('./Film-detail/Film-detail'));
const FilmSchedule = React.lazy(() => import('./Film-schedule/Film-schedule'));
const MoreInfor = React.lazy(() => import('./More-Infor/More-Infor'));

function Film() {


    const {id} = useParams();
    const [film, setFilm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await Services.getLsFilmAPI()
            setFilm(
                [
                    ...res.movieShowing.filter(n => n.id === id),
                    ...res.movieCommingSoon.filter(n => n.id === id)
                ][0]
            )
            const filmSchedule = await Services.getFilmSchedule(id)
            dispatch(getSchedule(filmSchedule))
        }
        fetchAPI()
    }, [id])

    useEffect(() => {
        if (film !== "") {
            dispatch(getFilm(film))
        }
    }, [film])


    return (
        film &&
        <Suspense fallback={<Loading/>}>
            <div className="container-film fl fl-col fl-mid">
                <div className="mainSize fl">
                    <Row className="pr-10 pl-10" gutter={24}>
                        <Col xs={24} sm={18} className="col-left">
                            <FilmDetail film={film}/>
                            <FilmSchedule/>
                        </Col>
                        <Col xs={0} sm={6} className="col-right">
                            <MoreInfor/>
                        </Col>
                    </Row>
                </div>
            </div>
        </Suspense>
    );
}

export default Film;