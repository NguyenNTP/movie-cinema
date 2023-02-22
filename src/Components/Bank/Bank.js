import React, {useState} from "react";
import "./Bank.scss";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Bank = () => {
    const bankRedux = useSelector((state) => state.rdcBank);
    console.log(bankRedux);

    const [bankId, setBankId] = useState(null);
    const [cardNumber, setcardNumber] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [expireDate, setExpireDate] = useState(null);
    const [cvv, setCvv] = useState(null);
    const [balance, setBalance] = useState(null);

    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const CreateBank = async (e) => {
        e.preventDefault();
        const formValue = {
            BankId: bankId,
            CardNumber: cardNumber,
            CardName: cardName,
            ExpireDate: expireDate,
            CVV: cvv,
            balance: balance
        };
        let res = await axios.post(
            "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/Bank/BankCard",
            formValue
        );
        let data = await res.data;
        console.log(data);
        if (data === "Create Fail") {
            // console.log("bi loi ở đâu rồi");
            toast.warning("Ban nen dien thong tin dung")
        } else {
            dispatch({type: "SetBank", payload: formValue});
            setSuccess(true);
            toast.success("You just create completely a credit card")
        }

    };

    return success ? (
        <section className="LoginSuccess">
            <h1>Bạn đã thanh toán thành công!</h1>
            <Link to="/" style={{textDecoration: "none"}}>
                Trang chủ
            </Link>
        </section>
    ) : (
        <div className="bank fl fl-cen">
            <div className="mainSize fl-cen fl fl-mid">
                <form className="w-25" onSubmit={CreateBank}>
                    <h1 className="t-upper mb-20">Tạo thẻ mới</h1>
                    <label>BankID</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                    />
                    <label>Số thẻ</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={cardNumber}
                        onChange={(e) => setcardNumber(e.target.value)}
                    />
                    <label>Tên in trên thẻ</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                    <label>Ngày hết hạn</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                    />
                    <label>CVV</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />

                    <label>Số dư</label>
                    <input
                        type="text"
                        placeholder="Nhập thông tin..."
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />

                    <div className="footerBank fl fl-cen">
                        <button>Tạo mới</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Bank;
