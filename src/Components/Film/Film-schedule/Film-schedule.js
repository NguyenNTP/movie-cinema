import React, {useEffect, useState} from 'react';
import {DatePicker, Select, Row, Col} from "antd";
import dayjs from "dayjs";
import "./Film-schedule.scss"
import getToday from "../../Logic/handleDate";
import {useSelector} from "react-redux";
import {dataSchedule} from "../../../Redux/Selector";
import {useNavigate} from "react-router-dom";
import * as Services from "../../../APIServices/Services"


function FilmSchedule() {
    const [lsCity, setLsCity] = useState(null);
    const [lsCinema, setlsCinema] = useState([])
    const schedule = useSelector(dataSchedule)
    const [city, setCity] = useState(null)
    let today = getToday()
    const [startDate, setStartDate] = useState(today);
    const [cinema, setCinema] = useState(null)
    const dateFormat = "DD/MM/YYYY"
    const [filterSchedule, setFilterSchedule] = useState([])
    const [cinemaFilterArr, setCinemaFilterArr] = useState([])
    let result = [];
    let res = [];
    let cinemaCityId = [];
    const nav = useNavigate()


    const convertSub = (Sub) => {
        return Sub === "sub" ? 'Phụ đề' : 'Thuyết minh'
    }

    const handleChangeCity = (event) => {
        setCity(event)
        setCinema(null)
    }

    //Loc nhung cinema theo city
    useEffect(() => {
        setCinemaFilterArr(lsCinema)
        if ((city !== null) && (lsCinema !== null)) {
            result = lsCinema.filter(n => {
                return n.cityId === city
            })
        }
        if (city !== null && lsCinema !== null) {
            setCinemaFilterArr(result)
        }
    }, [city])

    const handleChangeDay = (date, dateString) => {
        setStartDate(dateString)
    };

    const handleCinema = (event) => {
        setCinema(event)
    }

    //Loc nhung city co cinema
    useEffect(() => {

        lsCinema.map(n => {
            return cinemaCityId.push(n.cityId)
        })
        if (lsCity) {
            res = lsCity.filter((n) => {
                return cinemaCityId.includes(n.id)
            })
        }
        if (res !== []) {
            setLsCity(res)
        }
    }, [lsCinema])

    //Loc ra id cua nhung rap se chieu phim do hom nay
    useEffect(() => {
        let tmpArr = [];
        let tmpId = [];
        if (schedule) {
            schedule.filter((n) => {
                if (city) {
                    return n.cityId === city
                } else return true
            }).filter(n => {
                if (cinema) {
                    return n.id === cinema
                } else return true
            }).map(n => {
                return (tmpArr.push((n.dates.filter(d => {
                        if (startDate) {
                            return d.showDate === startDate
                        }
                    })), n.id)
                )
            })
        }
        for (let i = 0; i < tmpArr.length; i = i + 2) {
            if (tmpArr[i].length > 0) {
                tmpId.push(tmpArr[i + 1])
            }
        }
        setFilterSchedule(tmpId)
    }, [schedule, startDate])

    const showBookTickets = (sessionId, cinemaCode) => {
        nav('/Book-Ticket?cinemaId=' + cinemaCode + '&sessionId=' + sessionId)
        localStorage.removeItem("seat");
    }


    useEffect(() => {

        const fetchAPI = async () => {
            const dataLsCity = await Services.getLsCity()
            setLsCity(dataLsCity)
            const dataLsCinema = await Services.getLsCinema()
            setlsCinema(dataLsCinema)
            setCinemaFilterArr(dataLsCinema)
        }
        fetchAPI()
    }, [schedule])


    return (
        schedule && <div className='Schedule'>
            <Row className="Schedule-search fl fl-spw">
                <Col className="search-box" xs={24} sm={12} xl={8}>
                    <Select defaultValue="Cả nước"
                            id="find-citys"
                            style={{width: 200}}
                            size={"large"}
                            onChange={handleChangeCity}>
                        {
                            lsCity && lsCity.map((n) => {
                                return <option key={n.id} value={n.id}>{n.name}</option>
                            })
                        }
                    </Select>
                </Col>
                <Col className="search-box" xs={24} sm={12} xl={8} id="find-dates">
                    <DatePicker allowClear={false} onChange={handleChangeDay} format={dateFormat} size={'large'}
                                defaultValue={dayjs(today, dateFormat)}/>
                </Col>
                <Col className="search-box" xs={24} sm={24} xl={8} id="find-cinema">
                    <Select placeholder="Tất cả rạp"
                            value={cinema}
                            size={"large"}
                            style={{width: 200}}
                            onChange={handleCinema}>
                        {
                            cinemaFilterArr.map(n => {
                                return <option key={n.id} value={n.id}>{n.name}</option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
            <div className="Schedule-content">
                {
                    schedule.filter(n => {
                        if (city) {
                            return n.cityId === city
                        } else return true
                    }).filter(n => {
                        if (cinema) {
                            return n.id === cinema
                        } else return true
                    }).filter(n => {
                        if (filterSchedule !== []) {
                            return filterSchedule.includes(n.id)
                        }
                    })
                        .map((n) => {
                            return <div key={n.name} className='mb-60'>
                                {<div className=" fs-13 title-cinema">
                                    <h3>{n.name}</h3>
                                </div>}
                                {
                                    n.dates.filter(d => {
                                        if (startDate) {
                                            return d.showDate === startDate
                                        }
                                    })
                                        .map((d) => {
                                            return <div key={d.showDate} className="CardDay">
                                                <div className='boxDate'>
                                                    {
                                                        d.bundles.map((b) => {
                                                            return <Row className="" key={b.version}>
                                                                <Col span={5}>
                                                                    <h5 className="sub"><span
                                                                        className="sub t-upper">{b.version}</span> - {convertSub(b.caption)}
                                                                    </h5>
                                                                </Col>
                                                                <Col span={19} className="movie-time">
                                                                    {
                                                                        b.sessions.map((t) => {
                                                                            return <span key={t.sessionId}
                                                                                         onClick={() => showBookTickets(t.sessionId, n.code)}>
                                                                        {t.showTime}
                                                                                {/*  <div className='popup'>
                                                                            Hello {t.showTime}
                                                                        </div>*/}
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
                        })
                }
            </div>

        </div>
    );
}

export default FilmSchedule;