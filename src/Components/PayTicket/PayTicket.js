import React, {useState} from 'react';
import "./PayTicket.scss"
import {Row, Col} from "antd";
import {useNavigate} from "react-router-dom";

function PayTicKet(props) {

    const localuser = localStorage.getItem("user")
    const userEmail = JSON.parse(localuser).Email
    const [email, setEmail] = useState(userEmail)
    const [errorEmail, setErrorEmail] = useState("")

    const nav = useNavigate()

    const handleComeBack = () => {
            localStorage.removeItem("seat")
            props.comeBack()
    }

    const checkEmail = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value.trim())) {
            setEmail(e.target.value.trim())
            setErrorEmail("")
        } else {
            setErrorEmail("Email khong hop le")
            setEmail(null)
        }
    }

    const handlePay = () => {
        if (email !== null) {
            nav('/Pay/' + email)
        }
    }


    return (
        <div className="fl fl-cen">
            <div className="mainSize fl fl-cen">
                <div className="pay-ticket">
                    <div>
                        <div className="title-line fl fl-spw fl-mid pb-5">
                            <h2>VUI LÒNG THANH TOÁN</h2>
                            <p id="time-countdown" className="fs-20 b"/>
                        </div>
                        <div className="pay-content">
                            <Row className="t-line">
                                <Col span={7}>
                                    <label>Hình thức</label>
                                </Col>
                                <Col span={17}>
                                    <input placeholder="Thẻ nội địa"/>
                                </Col>
                            </Row>
                            <Row className="t-line">
                                <Col span={7}>
                                    <label>Họ và tên</label>
                                </Col>
                                <Col span={17}>
                                    <input placeholder="Họ và tên"/>
                                </Col>
                            </Row>
                            <Row className="t-line">
                                <Col span={7}>
                                    <label>Email</label>
                                </Col>
                                <Col span={17}>
                                    <input defaultValue={userEmail} placeholder="Email"
                                           onKeyUp={checkEmail}
                                    />
                                    <p className="mes-error">{errorEmail}</p>
                                </Col>
                            </Row>
                            <Row className="t-line">
                                <Col span={7}>
                                    <label>Số điện thoại</label>
                                </Col>
                                <Col span={17}>
                                    <input value="" placeholder="SĐT"/>
                                </Col>
                            </Row>
                            <Row className="t-line">
                                <Col span={7}>
                                    <label>Mã giảm giá</label>
                                </Col>
                                <Col span={17}>
                                    <input placeholder="Mã giảm giá"/>
                                </Col>
                            </Row>
                            <Row className="t-line">
                                <Col span={24}>
                                    <div className="fl fl-cen">
                                        <button className="w-100" onClick={handleComeBack}>Quay lại</button>
                                        <button className="w-100" onClick={handlePay}>Thanh toán</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayTicKet;