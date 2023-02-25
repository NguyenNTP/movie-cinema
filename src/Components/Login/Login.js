// import React from 'react';
import React, {useState, useEffect, useRef} from "react";
import {Link, Navigate} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {AiOutlineHome} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {toast} from "react-toastify";

import "./login.scss";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();

    // const userRedux = useSelector(state => state.rdcUser)
    // console.log(userRedux)

    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("nguyen1234@gmail.com");
    const [password, setPassword] = useState("Nguyen@123");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    // const [validEmail, setValidEmail] = useState(false);
    // const [emailFocus, setEmailFocus] = useState(false);

    // const [validPassword, setValidPassword] = useState(false);
    // const [passwordFocus, setPasswordFocus] = useState(false);
    // const nav = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault(); // ngan chan trang reload, tuong tu onSubmit = false trong false

        try {
            let formValue = {
                Email: email,
                Password: password,
            };
            // console.log(formValue);
            let res = await axios.post(
                "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/Login",
                formValue
            );
            console.log(res)
            let data = await res.data; // post len sever, neu co user thi respon data res
            console.log(data);

            localStorage.setItem("user", JSON.stringify(data));
            dispatch({type: "SetUser", payload: data});
            setSuccess(true);
            // nav("/rap")

        } catch (error) {

            toast.error("Sai thông tin đăng nhập hoặc mật khẩu")
            errRef.current.focus();
        }
    };

    const [user, setUser] = useState("");

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            setUser(user);
        }
    }, []);

    if (user) {
        return (
            <>
                <Navigate to="/movie-cinema" replace/>
            </>
        );
    }
    return (
        <>
            {success ? (
                <Navigate to="/movie-cinema" replace/>
            ) : (

                <div className="loginForm fl fl-cen fl-mid">
                    <div className="mainSize fl fl-cen fl-mid">
                        <div className="login">
                            <form onSubmit={handleSubmit}>
                                <p
                                    ref={errRef}
                                    className={errMsg ? "errmsg" : "offscreen"}
                                    aria-live="assertive"
                                >
                                    {errMsg}
                                </p>
                                <h2 className="t-upper">Đăng nhập</h2>
                                <input
                                    type="text"
                                    defaultValue="nguyen1234@gmail.com"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    value={email}
                                    required
                                />
                                <input
                                    defaultValue="Nguyen@123"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                <div className="fl fl-cen">
                                    <button disabled={!email || !password ? true : false}>
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className=" fl fl-mid fl-col mt-40 t-white">
                                    <p>Chưa có tài khoản?</p>
                                    <Link to="/register" className="register">
                                        <span className="registerTitle">Đăng ký ngay</span>
                                    </Link>
                                </div>
                                {/*    <div className="loginHeader">

                                    <Link to="/" className="home">
                                        <AiOutlineHome/> <span className="homeTitle">Home</span>
                                    </Link>
                                    <p className="googleLogin">
                                        <FcGoogle/>{" "}
                                        <span className="googleTitle">Google Login</span>
                                    </p>
                                    <p className='forgotPassword'><RiLockPasswordLine/> <span className='forgotTitle'>Forgot password ???</span>
                                    </p>
                                    <Link to="/verifyEmail">
                                        {" "}
                                        <RiLockPasswordLine/>{" "}
                                        <span className="forgotTitle">
                      Forgot password ???
                    </span>{" "}
                                    </Link>
                                </div>*/}
                            </form>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default Login;