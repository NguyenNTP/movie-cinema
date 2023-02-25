import React, {useEffect, useState, Suspense} from 'react';
import {useSearchParams} from "react-router-dom"
import "./Book-seat.scss"
import {Col, Row} from "antd";
import * as Services from "../../APIServices/Services"
import Loading from "../Loading/Loading";

function BookSeat(props) {

    const [seatData, setSeatData] = useState(null)
    const [selectId, setSelectId] = useState([])
    const [cpSeat, selectCpSeat] = useState([])
    const [lsTicketPick, getLsTicketPick] = useState([])

    const arrTicketPick = []
    //Tong so ve don
    const [totalTicket, getTotalTicket] = useState(0)
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("sessionId")
    const seat = localStorage.getItem("seat")
    const [seatPicking, setSeatPicking] = useState([])


    useEffect(() => {

        const fetchAPI = async () => {
            const seatDt = await Services.getBookingDetail()
            setSeatData(seatDt.seatPlan.seatLayoutData.areas)

            //Tinh tong so ve don
            let tmp = Object.values(props.sumTicket)
            let sum = 0
            tmp.forEach(item => {
                sum = sum + item
            })
            getTotalTicket(sum - props.coupleTicket)

            const tickeyByShowCode = await Services.getTicketByShowCode()
            getLsTicketPick(tickeyByShowCode)
        }
        fetchAPI()

    }, [])

    /*
        console.log(seatPicking)
    */

    const handleSeat = (rowName, seatName) => {

        if (totalTicket !== 0) {
            localStorage.removeItem("seat");

            if (!selectId.includes(rowName + seatName)) {

                if (selectId.length < totalTicket) {
                    setSelectId([
                        ...selectId,
                        rowName + seatName
                    ])
                } else {
                    selectId.shift()
                    setSelectId([
                        ...selectId,
                        rowName + seatName
                    ])
                }
            }
        }
    }


    const handleSeatCouple = (rowName, seatName) => {
        if (props.coupleTicket !== 0) {
            localStorage.removeItem("seat");
            if (!cpSeat.includes(rowName + seatName)) {
                if (cpSeat.length < props.coupleTicket * 2) {

                    if (seatName % 2 === 0) {
                        selectCpSeat([
                            ...cpSeat,
                            rowName + seatName,
                            rowName + (seatName - 1),
                        ])
                    } else {
                        selectCpSeat([
                            ...cpSeat,
                            rowName + seatName,
                            rowName + (seatName * 1 + 1),
                        ])
                    }
                } else {
                    cpSeat.shift()
                    cpSeat.shift()
                    if (seatName % 2 === 0) {
                        selectCpSeat([
                            ...cpSeat,
                            rowName + seatName,
                            rowName + (seatName - 1),
                        ])
                    } else {
                        selectCpSeat([
                            ...cpSeat,
                            rowName + seatName,
                            rowName + (seatName * 1 + 1),
                        ])
                    }
                }
            }
        }
    }

    props.parentCallback([...selectId, ...cpSeat].join(', '))


    if (lsTicketPick)
        lsTicketPick.map(n => {
            arrTicketPick.push(...n.SeatCode.split(', '))
        })


    useEffect(() => {
        if (!seat)
            localStorage.setItem("seat", [...selectId, ...cpSeat].join(', '))
        setSeatPicking([...selectId, ...cpSeat])
        if (seat) {
            setSeatPicking(seat.split(","))
        }

    }, [selectId, cpSeat])

    console.log(arrTicketPick)

    return (
            <div className="book-seat">
                <h2 className="pb-10">CHỌN GHẾ: {[...selectId, ...cpSeat].join(', ')} </h2>
                {
                    seatData && <div className="block-seat">
                        <Row className="w-100 mb-20">
                            <Col span={24}>
                                {
                                    seatData[1].rows.map(row => {
                                        if (row.physicalName)
                                            return <Row className="fl fl-spw fl-mid">
                                                <Col className="name-row">{row.physicalName}</Col>
                                                <Col>
                                                    <Row>
                                                        {
                                                            row.seats.map(seat => {
                                                                if (arrTicketPick.includes((row.physicalName + seat.id))) {
                                                                    return <Col
                                                                        className="cant-pick-seat"
                                                                        id={row.physicalName + seat.id}>{seat.id}</Col>
                                                                }

                                                                if (cpSeat.includes(row.physicalName + seat.id))
                                                                    return <Col
                                                                        onClick={() => handleSeatCouple(row.physicalName, seat.id)}
                                                                        className="picked-seat">{seat.id}</Col>
                                                                else {
                                                                    return <Col
                                                                        onClick={() => handleSeatCouple(row.physicalName, seat.id)}
                                                                        className="name-seat">{seat.id}</Col>
                                                                }
                                                            })
                                                        }
                                                    </Row>
                                                </Col>
                                                <Col className="name-row">{row.physicalName}</Col>
                                            </Row>
                                    })
                                }
                            </Col>
                        </Row>
                        <Row className="w-100">
                            <Col span={24}>
                                {
                                    seatData[0].rows.map(row => {
                                        if (row.physicalName)
                                            return <Row className="fl fl-spw fl-mid">
                                                <Col className="name-row">{row.physicalName}</Col>
                                                <Col>
                                                    <Row>
                                                        {
                                                            row.seats.map(seat => {

                                                                if (arrTicketPick.includes(row.physicalName + seat.id)) {
                                                                    return <Col
                                                                        className="cant-pick-seat"
                                                                        id={row.physicalName + seat.id}>{seat.id}</Col>
                                                                }

                                                                if (selectId.includes(row.physicalName + seat.id))
                                                                    return <Col
                                                                        onClick={() => handleSeat(row.physicalName, seat.id)}
                                                                        className="picked-seat"
                                                                        id={row.physicalName + seat.id}>{seat.id}</Col>
                                                                else return <Col
                                                                    onClick={() => handleSeat(row.physicalName, seat.id)}
                                                                    className="name-seat"
                                                                    id={row.physicalName + seat.id}>{seat.id}
                                                                </Col>
                                                            })
                                                        }
                                                    </Row>
                                                </Col>
                                                <Col className="name-row">{row.physicalName}</Col>
                                            </Row>
                                    })
                                }
                            </Col>
                        </Row>
                        <div className="screen-block">
                            <div className="t-cen mt-20 fs-15">Màn hình</div>
                            <div className="fl fl-cen mt-5">
                                <div className="screen-line"></div>
                            </div>
                        </div>
                        <div className="seat-note fl fl-cen mt-20">
                            <p className="mr-20">
                                <span className="bx-green"></span><span>Ghế đang chọn</span>
                            </p>
                            <p className="mr-20">
                                <span className="bx-red"></span><span> Ghế đã đặt</span>
                            </p>
                            <p>
                                <span className="bx-gray"></span><span> Ghế có thể chọn</span>
                            </p>
                        </div>
                    </div>
                }
            </div>
    );

}

export default BookSeat;
