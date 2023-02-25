import "./Book-Ticket.scss"
import {Col, Row, Button, Input, Popover} from "antd"
import {ArrowRightOutlined, PlusCircleOutlined, MinusCircleOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState, Suspense} from 'react';
import {useDispatch} from "react-redux";
import {setTicketInfor} from "../../Redux/Action";
import handleMoney from "../Logic/HandleMoney";
import {toast} from "react-toastify";
import * as Services from "../../APIServices/Services"
import Loading from "../Loading/Loading";

const BookSeat = React.lazy(() => import('../Book-Seat/Book-seat'));
const PayTicKet = React.lazy(() => import('../PayTicket/PayTicket'))


function BookTicket() {

    const [film, setFilm] = useState({});
    const [cinema, setCinema] = useState(null)
    const [dataTicket, setDataTicket] = useState(null)
    const [valueTicket, setValueTicket] = useState([])
    // Get Sum Couple Ticket
    const [detailValTicket, setDetailValTicket] = useState(0)
    const [dataSumTicket, setDataSumTicket] = useState([])
    const [sumTicket, setSumTicket] = useState(0)
    const [totalSeat, setTotalSeat] = useState(0)
    const [valueCombo, setValueCombo] = useState([])
    const [dataSumCombo, setDataSumCombo] = useState([])
    const [nameCombo, setNameCombo] = useState([])
    const [sumCombo, setSumCombo] = useState(0)

    const [arrCombo, setArrCombo] = useState([])
    const [openPopover, setOpenPopover] = useState(false)
    const [showTicketdetail, setShowTicketdetail] = useState(true)
    const [showBookSeat, setShowBookSeat] = useState(false)
    const [showPayTicket, setShowPayTicket] = useState(false)
    const [searchParams] = useSearchParams()
    const cinemaId = searchParams.get("cinemaId")
    const sessionId = searchParams.get("sessionId")
    //Lay so ghe tu component Book-seat
    const [seatCode, setSeatCode] = useState('')
    const seat = localStorage.getItem("seat")

    const dispatch = useDispatch()


    useEffect(() => {

        const fetchAPI = async () => {

            //Lay thong tin film

            const res = await Services.getScheduleCinema(cinemaId)
            console.log(res)
            res.map(n => {
                n.dates.map(date => {
                    date.bundles.map(bundle => {
                        bundle.sessions.map(session => {
                            if (session.sessionId === sessionId) {
                                setFilm({
                                    name: n.name,
                                    imageLandscape: n.imageLandscape,
                                    imagePortrait: n.imagePortrait,
                                    age: n.age,
                                    showDate: date.showDate,
                                    dayOfWeekLabel: date.dayOfWeekLabel,
                                    showTime: session.showTime,
                                    screenName: session.screenName,
                                })
                            }
                        })
                    })
                })
            })

            const dtTicket = await Services.getBookingDetail()
            setDataTicket(dtTicket)

            const lsCinema = await Services.getLsCinema()
            setCinema([
                ...lsCinema.filter(n => {
                    return n.code === cinemaId
                })
            ])
        }
        fetchAPI()

    }, [])

    useEffect(() => {
        setSeatCode(seat)
    }, [seat])

    //Empty Check
    useEffect(() => {

        let tmpTicket = []
        let tmpCombo = []
        let tmpNameCombo = []

        if (dataTicket) {
            for (let i = 0; i < dataTicket.ticket.length; i++) {
                tmpTicket.push(0)
            }
            for (let i = 0; i < dataTicket.consession[0].concessionItems.length; i++) {
                tmpCombo.push(0)
            }

            dataTicket.consession[0].concessionItems.map(n => {
                tmpNameCombo.push(n.description)
            })

        }
        setValueTicket(tmpTicket)
        setValueCombo(tmpCombo)
        setNameCombo(tmpNameCombo)

    }, [dataTicket])

    useEffect(() => {
        dataTicket && dataTicket.ticket.forEach((combo, index) => {

            if (combo.name === "GHE DOI") {

                setDetailValTicket(valueTicket[index])
            }
        })


        //tong so ghe bang tong so ve ban dau tru cho so ve doi + so ghe doi

    }, [valueTicket])

    useEffect(() => {
        let tmp = Object.values(valueTicket)
        let sum = 0
        tmp.forEach(item => {
            sum = sum + item
        })
        setTotalSeat((sum - detailValTicket) + detailValTicket * 2)
    })


    const valuePlus = (index, price) => {
        if (valueTicket[index] < 8) {
            setValueTicket({
                ...valueTicket,
                [index]: valueTicket[index] + 1,
            })
            setDataSumTicket({
                    ...dataSumTicket,
                    [index]: valueTicket[index] * price + price
                }
            )
        }
    }

    const valueMinus = (index, price) => {
        localStorage.setItem("seat", "")
        if (valueTicket[index] > 0) {
            setValueTicket({
                ...valueTicket,
                [index]: valueTicket[index] - 1,
            })
            setDataSumTicket({
                    ...dataSumTicket,
                    [index]: valueTicket[index] * price - price
                }
            )
        }
    }

    const valuePlusCombo = (index, price) => {
        if (valueCombo[index] < 19) {
            setValueCombo({
                ...valueCombo,
                [index]: valueCombo[index] + 1,
            })
            setDataSumCombo({
                    ...dataSumCombo,
                    [index]: valueCombo[index] * price + price
                }
            )
        }
    }

    const valueMinusCombo = (index, price) => {
        if (valueCombo[index] > 0) {
            setValueCombo({
                ...valueCombo,
                [index]: valueCombo[index] - 1,
            })
            setDataSumCombo({
                    ...dataSumCombo,
                    [index]: valueCombo[index] * price - price
                }
            )
        }
    }


    useEffect(() => {
        let arrTmp = Object.values(dataSumTicket)
        let sumTmp = 0


        arrTmp.forEach(n => {
            if (n !== 0)
                sumTmp += n
        })
        setSumTicket(sumTmp)
    }, [dataSumTicket])

    useEffect(() => {
        let arrTmpCombo = Object.values(dataSumCombo)
        let sumTmpCombo = 0
        arrTmpCombo.forEach(n => {
            if (n !== 0)
                sumTmpCombo += n
        })
        setSumCombo(sumTmpCombo)
    }, [dataSumCombo])

    const handleBookSeat = () => {
        if ((sumTicket) === 0) {
            setOpenPopover(true)
            setInterval(() => {
                setOpenPopover(false)
            }, 2000)
        } else {
            setShowBookSeat(true)
            setShowTicketdetail(false)
        }
    }
    const handleComeBack = () => {
        setShowBookSeat(false)
        setShowTicketdetail(true)
        setSeatCode("")
        localStorage.removeItem("seat")
    }

    const comebackPayCard = () => {
        setShowBookSeat(true)
        setShowPayTicket(false)
    }

    const convertDate = (filmShowDate, filmShowTime) => {
        let year = filmShowDate.slice(6, 10)
        let month = filmShowDate.slice(3, 5)
        let day = filmShowDate.slice(0, 2)

        let showDateConvert = year + '-' + month + '-' + day;

        return showDateConvert + 'T' + filmShowTime + 'Z'
    }


    const handlePayTicket = () => {
        let tmp = JSON.stringify(seat)

        if (tmp.split(',').length === totalSeat) {
            setShowPayTicket(true)
            setShowBookSeat(false)

            dispatch(setTicketInfor({
                "Price": sumTicket + sumCombo,
                "ShowCode": sessionId,
                "CinemaName": cinema[0].name,
                "TheaterName": film.screenName,
                "FilmName": film.name,
                "Combo": Object.entries(arrCombo).map(n => {
                    if (n[1] !== 0) {
                        return n[0] + `(${n[1]})`
                    }
                },).join(' '),
                "SeatCode": seatCode,
                "ShowTime": convertDate(film.showDate, film.showTime),
                "ImageLandscape": film.imageLandscape,
                "ImagePortrait": film.imagePortrait,
            }))
        } else {
            toast.warning(`Vui lòng chọn đủ ${totalSeat} ghế`)
        }
    }


    //Set Arr Combo

    useEffect(() => {

        Object.values(valueCombo).map((n, index) => {
                if (n !== 0) {
                    setArrCombo(prev => {
                            return {
                                ...prev,
                                [nameCombo[index]]: n
                            }
                        }
                    )
                } else {
                    setArrCombo(prev => {
                            return {
                                ...prev,
                                [nameCombo[index]]: 0
                            }
                        }
                    )
                }
            }
        )
    }, [valueCombo])


    const callbackFunction = (childdata) => {
        setSeatCode(childdata)
    }

    return (
        <Suspense fallback={<Loading />}>
        <div className="book-ticket fl fl-cen">

            <div className="mainSize">
                <div className="prev-ticket-mb">
                    <div className="prev-ticket-cover">
                        <Row>
                            <Col className="prev-ticket-top mb-20" span={24}>
                                <div className="w-100 pt-5 pl-30 pr-30 bx-siz">
                                    <img className="w-100" src={film.imageLandscape} alt={film.name}/>
                                </div>
                                <h3 className="t-white">{film.name}</h3>
                            </Col>
                            <Col span={24}>
                                <h5><span className="film-age">C{film.age}</span> *Phim chỉ dành cho khán giả
                                    trên {film.age} tuổi</h5>
                                <p><span className="b t-white">Rạp:</span> <span
                                    className="t-white">{cinema && cinema[0].name} | {film.screenName}</span>
                                </p>
                                <p><span className="b">Suất chiếu:</span> {film.showDate} | <span
                                    className="t-white">{film.dayOfWeekLabel}, {film.showTime} </span>
                                </p>
                                <p><span className="b">Combo:</span> {
                                    Object.entries(arrCombo).map(n => {
                                        if (n[1] !== 0) {
                                            return n[0] + `(${n[1]})`
                                        }
                                    },).join(' ')
                                }</p>
                                <p><span className="b">Ghế: {seatCode}</span></p>
                                <h3 className="t-white">Tổng: {handleMoney(sumTicket + sumCombo)} VNĐ</h3>
                                <div className="fl fl-cen mt-20">
                                    {
                                        (showTicketdetail) &&
                                        <Popover open={openPopover} content="Vui lòng chọn vé">
                                            <Button type="primary" className="btn-next" icon={<ArrowRightOutlined/>}
                                                    onClick={handleBookSeat}>Tiếp
                                                tục</Button>
                                        </Popover>
                                    }
                                    {
                                        showBookSeat &&
                                        <>
                                            <Button type="primary" className="btn-next mr-20"
                                                    icon={<ArrowLeftOutlined/>}
                                                    onClick={handleComeBack}>Quay lại
                                            </Button>
                                            <Button type="primary" className="btn-next" icon={<ArrowRightOutlined/>}
                                                    onClick={handlePayTicket}
                                            >Tiếp
                                                tục</Button>
                                        </>
                                    }

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Row gutter={20} className="pt-20 pb-20">

                    <Col xs={24} ms={24} lg={15} xl={18}>
                        {showTicketdetail &&
                            <div className="book-detail">
                                <h2 className="pb-5">XIN MỜI CHỌN VÉ, ĐỒ ĂN</h2>
                                <div className="table">
                                    <Row className="table-title">
                                        <Col xs={12} sm={12} lg={11}>Loại vé</Col>
                                        <Col className="t-cen" xs={6} sm={6} lg={5}>Số lượng</Col>
                                        <Col className="t-end" xs={6} sm={6} lg={3}>Giá (VNĐ)</Col>
                                        <Col className="t-end" xs={0} sm={0} lg={5}>Tổng (VNĐ)</Col>
                                    </Row>
                                    {
                                        dataTicket && dataTicket.ticket.map((n, index) => {
                                            return <Row key={index} className="table-content">
                                                <Col xs={12} sm={12} lg={11}><p className="b">{n.name}</p>
                                                    <p>{n.description}</p>
                                                </Col>
                                                <Col xs={8} sm={6} lg={5} className="fl t-cen">
                                                    <div className="fl fl-cen fl-mid">
                                                        <Button type="ghost"
                                                                icon={<MinusCircleOutlined style={{color: '#fdb73b'}}/>}
                                                                onClick={() => valueMinus(index, n.displayPrice)}/>
                                                        <Input disabled={true} value={valueTicket[index]}
                                                               type="string"/>
                                                        <Button type="ghost"
                                                                icon={<PlusCircleOutlined style={{color: '#fdb73b'}}/>}
                                                                onClick={() => valuePlus(index, n.displayPrice)}/>
                                                    </div>
                                                </Col>
                                                <Col xs={4} sm={6} className=" fl fl-mid fl-r" lg={3}>
                                                    <p>{handleMoney(n.displayPrice)}</p></Col>
                                                {dataSumTicket !== [] &&
                                                    <Col xs={0} sm={0} lg={5} className=" fl fl-mid fl-r"
                                                    ><p>{handleMoney(dataSumTicket[index])}</p></Col>}
                                            </Row>
                                        })
                                    }
                                    <Row className="table-content table-end b">
                                        <Col span={19}>Tổng</Col>
                                        <Col className="t-end" span={5}>{handleMoney(sumTicket)}</Col>
                                    </Row>
                                </div>
                                <div className="table">
                                    <Row className="table-title">
                                        <Col xs={12} sm={12} lg={11}>Combo</Col>
                                        <Col className="t-cen" xs={6} sm={6} lg={3}>Số lượng</Col>
                                        <Col className="t-end" xs={6} sm={6} lg={5}>Giá (VNĐ)</Col>
                                        <Col className="t-end" xs={0} sm={0} lg={5}>Tổng (VNĐ)</Col>
                                    </Row>
                                    {
                                        dataTicket && dataTicket.consession[0].concessionItems.map((n, index) => {
                                            return <Row key={index} className="table-content">
                                                <Col className="fl" xs={24} sm={12} lg={11}>
                                                    <div className="mr-20 img-combo-cover">
                                                        <img className="w-100" src={n.imageUrl} alt={n.description}/>
                                                    </div>
                                                    <did>
                                                        <p className="b">{n.description}</p>
                                                        <p className="fs-13">{n.extendedDescription}</p>
                                                    </did>
                                                </Col>
                                                <Col xs={12} sm={6} lg={5} className="fl t-cen fl-mid">
                                                    <Button type="ghost"
                                                            icon={<MinusCircleOutlined style={{color: '#fdb73b'}}/>}
                                                            onClick={() => valueMinusCombo(index, n.displayPrice)}/>
                                                    <Input disabled={true} value={valueCombo[index]}
                                                           type="string"/>
                                                    <Button type="ghost"
                                                            icon={<PlusCircleOutlined style={{color: '#fdb73b'}}/>}
                                                            onClick={() => valuePlusCombo(index, n.displayPrice)}/>
                                                </Col>
                                                <Col className="fl fl-mid fl-r" xs={12} sm={6} lg={3}>
                                                    <p>{handleMoney(n.displayPrice)}</p>
                                                </Col>
                                                {dataSumCombo !== [] &&
                                                    <Col xs={0} sm={0} lg={5} className="fl fl-mid fl-r"
                                                    ><p>{handleMoney(dataSumCombo[index])}</p></Col>}
                                            </Row>
                                        })
                                    }
                                    <Row className="table-content table-end b">
                                        <Col span={19}>Tổng</Col>
                                        <Col className="t-end" span={5}>{handleMoney(sumCombo)}</Col>
                                    </Row>
                                </div>
                            </div>
                        }
                        {
                            showBookSeat &&
                          /*  <Suspense fallback={<Loading/>}>*/
                                <BookSeat parentCallback={callbackFunction} sumTicket={valueTicket}
                                          coupleTicket={detailValTicket}/>
/*
                            </Suspense>
*/
                        }
                        {
                            showPayTicket &&
/*
                            <Suspense fallback={<Loading/>}>
*/
                                <PayTicKet comeBack={comebackPayCard}/>
/*
                            </Suspense>
*/

                        }
                    </Col>

                    <Col lg={9} xl={6} className="prev-ticket">
                        <div className="prev-ticket-cover">
                            <Row>
                                <Col className="prev-ticket-top mb-20" span={24}>
                                    <div className="w-100 pt-5 pl-30 pr-30 bx-siz">
                                        <img className="w-100" src={film.imageLandscape} alt={film.name}/>
                                    </div>
                                    <h3 className="t-white">{film.name}</h3>
                                </Col>
                                <Col span={24}>
                                    <h5><span className="film-age">C{film.age}</span> *Phim chỉ dành cho khán giả
                                        trên {film.age} tuổi</h5>
                                    <p><span className="b t-white">Rạp:</span> <span
                                        className="t-white">{cinema && cinema[0].name} | {film.screenName}</span>
                                    </p>
                                    <p><span className="b">Suất chiếu:</span> {film.showDate} | <span
                                        className="t-white">{film.dayOfWeekLabel}, {film.showTime} </span>
                                    </p>
                                    <p><span className="b">Combo:</span> {
                                        Object.entries(arrCombo).map(n => {
                                            if (n[1] !== 0) {
                                                return n[0] + `(${n[1]})`
                                            }
                                        },).join(' ')
                                    }</p>
                                    <p><span className="b">Ghế: {seatCode}</span></p>
                                    <h3 className="t-white">Tổng: {handleMoney(sumTicket + sumCombo)} VNĐ</h3>
                                    <div className="fl fl-cen mt-20">
                                        {
                                            (showTicketdetail) &&
                                            <Popover open={openPopover} content="Vui lòng chọn vé">
                                                <Button type="primary" className="btn-next"
                                                        icon={<ArrowRightOutlined/>}
                                                        onClick={handleBookSeat}>Tiếp
                                                    tục</Button>
                                            </Popover>
                                        }
                                        {
                                            showBookSeat &&
                                            <>
                                                <Button type="primary" className="btn-next mr-20"
                                                        icon={<ArrowLeftOutlined/>}
                                                        onClick={handleComeBack}>Quay lại
                                                </Button>
                                                <Button type="primary" className="btn-next"
                                                        icon={<ArrowRightOutlined/>}
                                                        onClick={handlePayTicket}
                                                >Tiếp
                                                    tục</Button>
                                            </>
                                        }

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        </Suspense>
    );
}

export default BookTicket;