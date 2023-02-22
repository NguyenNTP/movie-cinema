import React, {useEffect, useState} from 'react';
import "./FindTicket.scss"
import {Row, Col, Modal, QRCode} from "antd"
import {convertDate} from "../../Logic/handleDate";
import handleMoney from "../../Logic/HandleMoney";
import {useParams} from "react-router-dom";

function FindTicket() {

    let user = localStorage.getItem("user");
    const email = JSON.parse(user).Email
    const [lsTicket, getLsTicket] = useState([])
    const [idTicket, setIdTicket] = useState("")
    const [ticket, seTicket] = useState(null)
    const nav = useParams()

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

    useEffect(() => {
        fetch(`https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/TicketByEmail/${email}`)
            .then(res => res.json())
            .then(data => getLsTicket(data))
    }, [])

    useEffect(() => {
        if (idTicket) {
            let tmp = lsTicket.filter(ticket => {
                return ticket.Id === idTicket
            })
            seTicket(tmp[0])
        }
    }, [idTicket])

    const convertTime = (date) => {
        let tmp2
        if (lsTicket) {
            let tmp = date.slice(0, 16)
            tmp2 = tmp.split('T')

            return convertDate(tmp2[0]) + ', ' + tmp2[1]
        }
    }
    console.log(ticket)

    return (
        <div className="findTicket fl fl-cen">
            <div className="mainSize">
                <h2 className="mb-20 t-upper">Vé đã mua bởi tài khoản</h2>
                <Row className="table-Ticket">
                    <Col span={24}>
                        <div className=" title-table">
                            <Row className="pl-20 pr-20 pt-10 pb-10">
                                <Col span={3}>
                                    ID
                                </Col>
                                <Col span={9}>
                                    Phim
                                </Col>
                                <Col span={9}>
                                    Cinema
                                </Col>
                                <Col span={3}>
                                    Ngày chiếu
                                </Col>
                            </Row>
                        </div>
                        {
                            lsTicket.map(ticket => {
                                return <Row onClick={() => {
                                    setIdTicket(ticket.Id)
                                    setIsModalOpen(true)
                                }} className="ticket-item">
                                    <Col span={3}>
                                        {ticket.Id}
                                    </Col>
                                    <Col span={9}>
                                        {
                                            ticket.FilmName
                                        }
                                    </Col>
                                    <Col span={9}>
                                        {
                                            ticket.CinemaName
                                        }
                                    </Col>
                                    <Col span={3}>
                                        {
                                            convertTime(ticket.ShowTime)
                                        }
                                    </Col>
                                </Row>
                            })
                        }
                    </Col>
                </Row>
                {ticket && <div>
                    <Modal className="b" title="Thông tin vé" open={isModalOpen} onOk={handleOk}
                           okText={"Về trang chủ"}
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
                                    <Row className="mb-20 mt-20" gutter={20}>
                                        <Col span={24}>
                                            <div className="img-film-cover">
                                                <img className="bx-siz w-100 pl-20 pr-20" src={ticket.ImageLandscape}
                                                     alt={ticket.FilmName}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Mã đặt vé:
                                        </Col>
                                        <Col span={16}>
                                            {ticket.Id}
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Rạp: </Col>
                                        <Col span={16}>
                                            {
                                                ticket.TheaterName
                                            }
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Thông tin phim:
                                        </Col>
                                        <Col span={16}>
                                            {
                                                ticket.FilmName
                                            }
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Suất chiếu: </Col>
                                        <Col span={16}>
                                            {
                                                convertTime(ticket.ShowTime)
                                            }
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Thông tin ghế: </Col>
                                        <Col span={16}>
                                            {
                                                ticket.SeatCode
                                            }
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            Đồ ăn và thức uống: </Col>
                                        <Col span={16}>
                                            {
                                                ticket.Combo
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </div>
                }
            </div>
        </div>
    );
}

export default FindTicket;