import React, {useEffect, useState, Suspense} from 'react';
import {useParams} from "react-router-dom";
import {Col, Row} from 'antd';
import './Film.scss';
import {useDispatch} from "react-redux";
import {getSchedule, getFilm} from "../../Redux/Action";

const FilmDetail = React.lazy(() => import('./Film-detail/Film-detail'));
const FilmSchedule = React.lazy(() => import('./Film-schedule/Film-schedule'));
const MoreInfor = React.lazy(() => import('./More-Infor/More-Infor'));

function Film() {


    const {id} = useParams();
    const [film, setFilm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/nowAndSoon")
            .then(res => res.json())
            .then(data => {
                setFilm(
                    [
                        ...data.movieShowing.filter(n => n.id === id),
                        ...data.movieCommingSoon.filter(n => n.id === id)
                    ][0]
                )
            })

        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/movie/" + id)
            .then(res => res.json())
            .then(data => dispatch(getSchedule(data)))
    }, [id])

    useEffect(() => {
        if (film !== "") {
            dispatch(getFilm(film))
        }
    }, [film])


    return (
        film && <div className="container-film fl fl-col fl-mid">
            <div className="mainSize fl">
                <Row className="pr-10 pl-10" gutter={24}>
                    <Col xs={24} sm={18} className="col-left">
                        <Suspense fallback={<p>Loading...</p>}>
                            <FilmDetail film={film}/>
                            <FilmSchedule/>
                        </Suspense>
                    </Col>
                    <Col xs={0} sm={6} className="col-right">
                        <Suspense fallback={<p>Loading...</p>}>
                            <MoreInfor/>
                        </Suspense>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Film;