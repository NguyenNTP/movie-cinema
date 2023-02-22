import "./PayCard.scss"
import React, {useEffect, useState} from 'react';
import {Button, Input, Select, Row, Col} from "antd"
import {useSelector} from "react-redux";
import {dataTicket} from "../../../Redux/Selector";
import {useNavigate, useParams} from "react-router-dom";

import {toast} from "react-toastify";
import {countDownTimer} from "../../Logic/handleDate";
import handleMoney from "../../Logic/HandleMoney";
import PaySuccess from "./PaySuccess/PaySuccess";

function PayCard() {
    const [lsbank, getLsBank] = useState(null)
    const [lsCard, getLsCard] = useState(null)
    const [cardDefaultUser, getCardDefaultUser] = useState(null)
    const [cardID, getCardID] = useState("")
    const [cardNumber, getCardNumber] = useState("")
    const [cardExp, getCardExp] = useState("")
    const [cardName, getCardName] = useState("")
    const [CVV, getCVV] = useState("")
    const ticketInfor = useSelector(dataTicket)
    const nav = useNavigate()
    const {email} = useParams()


    useEffect(() => {
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/Bank/Bank")
            .then(res => res.json())
            .then(data => getLsBank(data))
        fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/Bank/BankCard")
            .then(res => res.json())
            .then(data => {
                getLsCard(data)
            })
    }, [])

    useEffect(() => {
        fetch(`https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/Bank/CardRef/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    getCardDefaultUser(lsCard.filter(card => {
                        return card.CardNumber === data[0].CardNumber
                    }))
                } else {
                    getCardDefaultUser([{
                        BankId: "",
                        CardNumber: "",
                        ExpireDate: "",
                        CVV: "",
                        CardName: "",
                    }])
                }
            })
    }, [lsCard])

    useEffect(() => {
        if (cardDefaultUser) {
            getCardID(cardDefaultUser[0].BankId)
            getCardNumber(cardDefaultUser[0].CardNumber)
            getCardExp(cardDefaultUser[0].ExpireDate)
            getCardName(cardDefaultUser[0].CardName)
            getCVV(cardDefaultUser[0].CVV)
        }

    }, [cardDefaultUser])


    const data = {
        ...ticketInfor,
        "BankId": cardID,
        "CardNumber": cardNumber,
        "CardName": cardName,
        "ExpireDate": cardExp,
        "CVV": CVV,
        "Email": email,
    }
    console.log(data)

    useEffect(() => {
        if (ticketInfor.FilmName === undefined) {
            nav('/')
        }
    }, [])

    console.log(ticketInfor.Price.toString())

    const handlePay = () => {
        if(ticketInfor) {
        localStorage.setItem("Ticket", ticketInfor.Price.toString()
        )}

        fetch('https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/Ticket', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    nav('/PaySuccess?showCode=' + ticketInfor.ShowCode + '&seatCode=' + ticketInfor.SeatCode)
                } else {
                    console.log(response.status)
                    toast.error("Sai thông tin thẻ")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (cardDefaultUser) {
            let timeLimit = 60 * 20,
                display = document.querySelector('#time-countdown');
            countDownTimer(timeLimit, display)
        }
    }, [cardDefaultUser])


    return (
        cardDefaultUser && <div className="PayCard fl fl-cen pt-60 pb-60">
            <div className="mainSize fl fl-cen">
                <div className="Pay-ticket fl fl-cen fl-col">
                    <p id="time-countdown" className="fs-20 b mb-5"/>
                    <h3 className="t-cen fs-30 b">PAYMENT DETAILS</h3>
                    <div className="inlineimage"><img alt="Bank-Logo" className="img-responsive images"
                                                      src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png"/>
                        <img alt="Bank-Logo" className="img-responsive images"
                             src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png"/>
                        <img alt="Bank-Logo" className="img-responsive images"
                             src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png"/>
                        <img alt="Bank-Logo" className="img-responsive images"
                             src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png"/>
                    </div>
                    <Select defaultValue={cardDefaultUser ? cardDefaultUser[0].BankId : ""}
                            placeholder="Vui long chon ngan hang" className="mb-20"
                            onChange={(e) => getCardID(e)}>
                        {
                            lsbank && lsbank.map(bank => {
                                return <option key={bank.name} value={bank.Id}>
                                    <div className="fl fl-spw">
                                        <div className="logoBank w-10">
                                            <img className="w-100" src={bank.Logo} alt={bank.Name}/>
                                        </div>
                                        <p>{bank.Name}</p>
                                    </div>
                                </option>
                            })
                        }
                    </Select>
                    <Input defaultValue={cardDefaultUser ? cardDefaultUser[0].CardNumber : ""} className="mb-20"
                           placeholder="Số thẻ"
                           onChange={(e) => getCardNumber(e.target.value.trim())}/>
                    <Row gutter={30} className="fl">
                        <Col sm={16}>
                            <Input defaultValue={cardDefaultUser ? cardDefaultUser[0].ExpireDate : ""} className="mb-20"
                                   placeholder="Ngày hết hạn"
                                   onChange={(e) => getCardExp(e.target.value.trim())}/>
                        </Col>
                        <Col sm={8}>
                            <Input defaultValue={cardDefaultUser ? cardDefaultUser[0].CVV : ""} className="mb-20"
                                   placeholder="CVV" onChange={(e) => getCVV(e.target.value.trim())}/>
                        </Col>
                    </Row>
                    <Input defaultValue={cardDefaultUser ? cardDefaultUser[0].CardName : ""} className="mb-20"
                           placeholder="Tên in trên thẻ"
                           onChange={(e) => getCardName(e.target.value.trim())}/>
                    <p className="total-sum">{handleMoney(ticketInfor.Price)} VNĐ</p>
                    <Button onClick={handlePay}>Thanh toán</Button>
                </div>
            </div>
        </div>
    );
}

export default PayCard;