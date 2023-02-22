import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./ChangPass.scss";
import axios from "axios";

const ChangePass = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPass, setNewPass] = useState("");

    const submitChangePass = async (e) => {
        e.preventDefault();

        // https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/ChangePassword
        try {
            const formValue = {
                Email: email,
                Password: password,
                PasswordNew: newPass,
            };
            console.log(formValue)
            let res = await axios.put(
                "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/ChangePassword",
                formValue,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }
            );
            console.log(res);
            // let data = await res.data
            // console.log(data)
        } catch (error) {
            console.log(error);
        }

        // console.log(email, password, newPass)
    };

    return (
        <div className="changePass fl fl-cen">
            <div className="mainSize fl fl-cen fl-mid">
                <div className="changePass-content">
                    <form onSubmit={submitChangePass}>
                        <h3 className="t-cen t-upper">Đổi mật khẩu</h3>
                        <label htmlFor="Email">Email của bạn</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email của bạn ..... "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="Password">Mật khẩu cũ</label>

                        <input
                            type="password"
                            id="Password"
                            placeholder="Nhập mật khẩu cũ"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="NewPassword">Mật khẩu mới</label>
                        <input
                            type="password"
                            htmlFor="NewPassword"
                            placeholder="Xác nhận mật khẩu mới"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />

                        <div className="fl fl-cen">
                            <button className="btnChangePass">Thay đổi</button>
                            {/* <Link to="/" className="homeChangePass">
                            Home
                        </Link>*/}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
