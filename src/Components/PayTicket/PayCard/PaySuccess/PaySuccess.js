import React, {useEffect} from 'react';
import "./PaySuccess.scss"
import {Button, Result, Modal, Row, Col} from "antd";
import {Link, useNavigate, useSearchParams} from "react-router-dom"
import {useState} from "react";
import {QRCode} from 'antd';
import handleMoney from "../../../Logic/HandleMoney";
import {useDispatch} from "react-redux";
import {convertDate} from "../../../Logic/handleDate";


function PaySuccess() {

    const [lsTicket, getLsTicket] = useState(null)
    const [ticket, setTicket] = useState(null)
    const nav = useNavigate()

    const [searchParams] = useSearchParams()
    const showCode = searchParams.get("showCode")
    const seatCode = searchParams.get("seatCode")
    const price = localStorage.getItem("Ticket")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        nav('/')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const title_ticket = (
        <p className="title_ticket fs-20 mb-20 t-upper t-cen">
            Vé đã đặt
        </p>
    )

    useEffect(() => {
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/Ticket")
            .then(res => res.json())
            .then(data => {
                    getLsTicket(data)
                }
            )
    }, [])
    useEffect(() => {
        if (lsTicket) {
            setTicket(lsTicket.filter(ticket => {
                return (ticket.ShowCode.includes(showCode) && ticket.SeatCode.includes(seatCode))
            }))
        }
    }, [lsTicket])

    const convertTime = (date) => {
        let tmp2
        if (ticket) {
            let tmp = date.slice(0, 19)
            tmp2 = tmp.split('T')
        }
        return convertDate(tmp2[0]) + ', ' + tmp2[1]
    }

    return (
        ticket && <div className="PaySuccess">
            <Result
                status="success"
                title="Chúc mừng bạn đã mua vé thành công!"
                subTitle={"Mã đặt vé của bạn là " + ticket[0].Id + ". Cảm ơn bạn đã lựa chọn chúng tôi để phục vụ nhu cầu giải trí của bạn."}
                extra={[
                    <Button className="button-yellow" onClick={showModal} type="primary" key="console">
                        Xem vé vừa mua
                    </Button>,
                    <Button className="button-low" key="buy">
                        <Link to={'/Muave'}>Mua thêm vé</Link>
                    </Button>
                ]}
            />
            <Modal className="b" title={title_ticket} open={isModalOpen} onOk={handleOk} okText={"Về trang chủ"}
                   cancelText={"Hủy"} onCancel={handleCancel} closable={false}
                   okButtonProps={{
                       style: {
                           backgroundColor: "rgb(253, 183, 59)",
                           color: "black",
                       }
                   }}>
                <div>
                    <Row>
                        <Col span={24}>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Mã vào khán phòng:
                                </Col>
                                <Col span={16}>
                                    <QRCode value="https://ant.design/"/>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Mã đặt vé:
                                </Col>
                                <Col span={16}>
                                    {ticket[0].Id}
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Rạp: </Col>
                                <Col span={16}>
                                    {
                                        ticket[0].TheaterName
                                    }
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Thông tin phim:
                                </Col>
                                <Col span={16}>
                                    {
                                        ticket[0].FilmName
                                    }
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Suất chiếu: </Col>
                                <Col span={16}>
                                    {
                                        convertTime(ticket[0].ShowTime)
                                    }
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Thông tin ghế: </Col>
                                <Col span={16}>
                                    {
                                        ticket[0].SeatCode
                                    }
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Đồ ăn và thức uống: </Col>
                                <Col span={16}>
                                    {
                                        ticket[0].Combo
                                    }
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8}>
                                    Tổng cộng: </Col>
                                <Col span={16}>
                                    {handleMoney(price)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    );
}

export default PaySuccess;