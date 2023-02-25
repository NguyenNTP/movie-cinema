import React from 'react';
import "./ByCimena.scss"
import {Col, Row} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Services from "../../../APIServices/Services"

function ByCinema() {
    const [lsCinema, setLsCinema] = useState(null)
    const [idCinema, setIdCinema] = useState(null)
    const [lsFilmByCinema, setLsFilmByCinema] = useState(null)
    const [lsShowtime, setLsShowTime] = useState(null)
    const [cinemaCode, setCinemaCode] = useState(null)
    const nav = useNavigate()


    useEffect(() => {

        const fetchAPI = async () => {
            const res = await Services.getLsCinema()
            setLsCinema(res)
        }
        fetchAPI()
    }, [])

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await Services.getScheduleCinema(idCinema)
            setLsFilmByCinema(res)
        }
        fetchAPI()

    }, [idCinema])

    const convertSub = (Sub) => {
        return Sub === "sub" ? 'Phụ đề' : 'Thuyết minh'
    }

    const showBookTickets = (sessionId, cinemaCode) => {
        nav('/Book-Ticket?cinemaId=' + cinemaCode + '&sessionId=' + sessionId)
        localStorage.removeItem("seat");
    }

    return (

        lsCinema && <Row className="FindByCinema" gutter={40}>
            <Col xs={24} sm={24} lg={8}>
                <h3 className="pt-10 pb-10 t-upper t-cen">chọn rạp</h3>
                <div className="list-cinema">
                    {
                        lsCinema && lsCinema.map(cinema => {
                            return <div
                                onClick={() => {
                                    setIdCinema(cinema.code)
                                }}
                                className="cinema-block">
                                {cinema.name}
                            </div>
                        })
                    }
                </div>
            </Col>
            <Col xs={24} sm={24} lg={8}>
                <h3 className="pt-10 pb-10 t-upper t-cen">chọn phim</h3>
                <div className={"list-film"}>
                    {
                        lsFilmByCinema && lsFilmByCinema.map(film => {
                            return <>
                                <div onClick={() => {
                                    setLsShowTime(film.dates)
                                }} className="fl fl-col film-block fl-cen">
                                    <Row gutter={8} className="fl">
                                        <Col span={4} className="img-film-cover">
                                            <img src={film.imageLandscape} className="w-100"
                                                 alt={film.name}/>
                                        </Col>
                                        <Col span={17}>
                                            <h4 className={"t-upper"}>{film.name}</h4>
                                            <p className="sub-name fs-13 t-upper">{film.subName}</p>
                                        </Col>
                                        <Col span={3}>
                                            <p className="film-age">C{film.age}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        })
                    }
                </div>
            </Col>
            <Col xs={24} sm={24} lg={8}>
                <h3 className="pt-10 pb-10 t-upper t-cen">chọn suất</h3>
                <div className="list-showtime">
                    {
                        lsShowtime && lsShowtime.map((d) => {
                            return <div key={d.showDate} className="CardDay">
                                <p>{d.dayOfWeekLabel}, {d.showDate}</p>
                                <div className='boxDate'>
                                    {
                                        d.bundles.map((b) => {
                                            return <Row className="" key={b.version}>
                                                <Col span={6}>
                                                    <h5 className="sub"><span
                                                        className="sub t-upper">{b.version}</span> - {convertSub(b.caption)}
                                                    </h5>
                                                </Col>
                                                <Col span={18} className="movie-time">
                                                    {
                                                        b.sessions.map((t) => {
                                                            return <span key={t.sessionId}
                                                                         onClick={() => showBookTickets(t.sessionId, idCinema)}
                                                            >
                                                                        {t.showTime}
                                                                    </span>
                                                        })
                                                    }
                                                </Col>
                                            </Row>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </Col>

        </Row>
    );
}

export default ByCinema;