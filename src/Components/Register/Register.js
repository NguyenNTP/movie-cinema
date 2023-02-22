import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./register.scss";
import {AiOutlineHome} from "react-icons/ai";
import {FaCheck} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";
// import useNavigate from "react-router-dom";

//Cai Regex dùng để validate các username password
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassowrd] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [role, setRole] = useState("");
    const [validRole, setValidRole] = useState(false);
    const [roleFocus, setRoleFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const nav = useNavigate()

    useEffect(() => {
        userRef.current.focus();
        if (localStorage.getItem("user")) {
            nav('/')
            toast.warning('Vui long logout de tao tai khoan moi')
        }

    }, []); // focus vao input minh chon

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassowrd(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        // console.log(role);
        if ([1, 2, 3].includes(role * 1)) {
            console.log("true")
            setValidRole(true);
        } else {
            setValidRole(false)
        }
    }, [role]);

    useEffect(() => {
        setErrMsg("");
    }, [username, email, password, confirmPassword]);

    //Cai nay thuong se xu ly khi co axios de tuong tac vs api backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        const checkUsername = USER_REGEX.test(username);
        const checkPassword = PASSWORD_REGEX.test(password);
        // const checkConfirmPassword = password === confirmPassword;

        if (!checkUsername || !checkPassword) {
            setErrMsg("INVALID ENTRY");
            return;
        }

        let formValue = {
            Email: email,
            Name: username,
            Password: password,
            Role: role
        }
        console.log(formValue)

        try {
            let res = await axios.post("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/user", formValue)
            let data = await res.data
            console.log("res: ", data)
            if (data === "Success") {
                setSuccess(true)
            } else {
                setSuccess(false)
                setErrMsg(data)
            }
            // setSuccess(true)
        } catch (error) {
            console.log("error: ", error)
        }
    };

    return (
        <>
            {success ? (
                <section className="SuccessContent">
                    <h1>Thành công!</h1>
                    <p>
                        <Link to="/login" style={{textDecoration: "none"}}>
                            Đăng nhập vào tài khoản
                        </Link>
                    </p>
                </section>
            ) : (
                <div className="registerForm fl fl-cen">
                    <div className="mainSize fl fl-cen fl-mid">
                        <div class="register_content">
                            <form onSubmit={handleSubmit}>
                                <h2 className="registerTitle t-upper t-cen"> Đăng ký</h2>
                                <p
                                    ref={errRef}
                                    className={errMsg ? "errmsg" : "offscreen"}
                                    aria-live="assertive"
                                >
                                    {errMsg}
                                </p>
                                <label htmlFor="username">
                                    Tên tài khoản:
                                    <FaCheck
                                        className={validUserName && username ? "valid" : "hide"}
                                    />
                                    <FaTimes
                                        className={validUserName || !username ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    ref={userRef}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="username"
                                    type="text"
                                    placeholder="Nhập tên tài khoản ..."
                                    autoComplete="off" // Tu xoa het du lieu nhap
                                    required // Yeu cau khong de trong'
                                    aria-invalid={validUserName ? "false" : "true"} /* Check gia tri trong input , neu aria-invadid ma dung
                  thi lien ket xuong aria-describedby*/
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    name="Name"
                                />
                                <p
                                    id="uidnote"
                                    className={
                                        userFocus && !validUserName && username
                                            ? "instructions" // gia tri trong input sai thi hien phan o duoi , dung thi hien offscreen
                                            : "offscreen" // an no di
                                    }
                                >
                                    4 to 24 characters.
                                    4 đến 24 ký tự
                                    Cần phải bắt đầu bằng một ký tự.
                                </p>
                                <label htmlFor="email">
                                    Email:
                                    <FaCheck className={validEmail && email ? "valid" : "hide"}/>
                                    <FaTimes
                                        className={validEmail || !email ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="text"
                                    placeholder="Nhập email ..."
                                    autoComplete="off"
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidEmail"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    name="Email"
                                />
                                <p
                                    id="uidEmail"
                                    className={
                                        emailFocus && !validEmail && email
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    Email cua ban phai co @gmail.com
                                </p>
                                <label htmlFor="password">
                                    Mật khẩu:
                                    <FaCheck
                                        className={validPassword && password ? "valid" : "hide"}
                                    />
                                    <FaTimes
                                        className={validPassword || !password ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu ..."
                                    autoComplete="off"
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="uidPassword"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    name="Password"
                                />
                                <p
                                    id="uidPassword"
                                    className={
                                        passwordFocus && !validPassword && password
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    Từ 8 đến 24 ký tự
                                    Có chữ in hoa và chữ thường
                                    Có một chữ số và ký tự đặc biệt
                                    Có ký tự đặc biệt
                                    <span aria-label="exclamation mark">!</span>{" "}
                                    <span aria-label="at symbol">@</span>{" "}
                                    <span aria-label="hashtag">#</span>{" "}
                                    <span aria-label="dollar sign">$</span>{" "}
                                    <span aria-label="percent">%</span>
                                </p>

                                <label htmlFor="confirmpassword">
                                    Nhập lại mật khẩu:
                                    <FaCheck
                                        className={
                                            validConfirmPassword && confirmPassword ? "valid" : "hide"
                                        }
                                    />
                                    <FaTimes
                                        className={
                                            validConfirmPassword || !confirmPassword
                                                ? "hide"
                                                : "invalid"
                                        }
                                    />
                                </label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    id="confirmpassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu ..."
                                    autoComplete="off"
                                    required
                                    onFocus={() => setConfirmFocus(true)}
                                    onBlur={() => setConfirmFocus(false)}
                                    name="ConfirmPassword"
                                />
                                <p
                                    id="confirmnote"
                                    className={
                                        confirmFocus && !validConfirmPassword
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    Must match the first password input field.
                                </p>
                                <label htmlFor="role">
                                    Role

                                    <FaCheck
                                        className={validRole && role ? "valid" : "hide"}
                                    />
                                    <FaTimes
                                        className={validRole || !role ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    id="role"
                                    placeholder="Nhập quyền hạn"
                                    autoComplete="off"
                                    aria-invalid={validRole ? "false" : "true"}
                                    aria-describedby="uidRole"
                                    required
                                    onFocus={() => setRoleFocus(true)}
                                    onBlur={() => setRoleFocus(false)}
                                    name="Role"
                                />
                                <p
                                    id="uidRole"
                                    className={
                                        roleFocus && !validRole && role
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >1, 2, 3 tương ứng với vai trò role khác nhau mong bạn đúng số role ạ</p>
                                <div className="fl fl-cen">
                                    <button
                                        id="btn_register"
                                        disabled={
                                            !validUserName ||
                                            !validEmail ||
                                            !validPassword ||
                                            !validConfirmPassword
                                                ? true
                                                : false
                                        }
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register