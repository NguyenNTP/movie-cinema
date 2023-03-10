import React, {useState, useEffect} from "react";
import "./Rap.scss";
import Footer from "../Footer/Footer";
import {Row, Col} from "antd"
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as Services from "../../APIServices/Services"

const Rap = () => {


    // console.log(localStorage.getItem("user"))

    // cac dong nay format Ngay hom nay --- Date Now
    let dateNowG = Date.now();
    let todayG = new Date(dateNowG);
    // console.log("check: ", todayG.toISOString());
    let dateG = todayG.toISOString();
    let yearG = dateG.slice(0, 4);
    let monthG = dateG.slice(5, 7);
    let dayG = dateG.slice(8, 10);
    let dateNewG = dayG + "/" + monthG + "/" + yearG;
    let dateNewFormatInput = yearG + "-" + monthG + "-" + dayG;
    // console.log(dateNewG);

    const [rap, setRap] = useState("");
    const [codeRap, setCodeRap] = useState(1010);
    const [day, setDay] = useState(dateNewG);
    const [avaUser, setAvaUser] = useState("")

    const [inforRap, setInforRap] = useState("")

    const nav = useNavigate()
    const dispatch = useDispatch();
    const film = useSelector((state) => state.rdcFilm.lsFilm);
    const detailFilm = useSelector((state) => state.rdcDetailFilm);

    // const userRedux = useSelector((state) => state.rdcUser)
    // // console.log(userRedux.User)
    // let parseUser = JSON.parse(userRedux.User)
    // // console.log(parseUser.Email)
    // let emailUser = parseUser.Email

    useEffect(() => {
        let avaUser = localStorage.getItem("user")
        // console.log(avaUser)
        let parseUser = JSON.parse(avaUser)
        // console.log(parseUser.Email)
        setAvaUser(parseUser.Email)
    }, [])


    useEffect(() => {

        const fetchAPI = async () => {
            const res = await Services.getLsCinema()
            setRap(res)

        }
        fetchAPI()
    }, []);


    useEffect(() => {
        let check = (data, dayCheck) => {
            let result = [];
            // eslint-disable-next-line array-callback-return
            let pushFilmtoRedux = data.map((ele) => {
                let data = ele.dates.filter((item) => {
                    return item.showDate === dayCheck;
                });
                // console.log(data);
                if (data.length !== 0) {
                    result.push(ele);
                } else {
                    // console.log("false");
                }
            });
            let dataResult = result;
            dispatch({type: "SetDetailFilm", payload: dataResult});
        }

        const fetchAPI = async () =>{
            const res = await Services.getScheduleCinema(codeRap)
            check(res, day)
        }
        fetchAPI()
    }, [codeRap, day, dispatch, rap]);

    // console.log("checkDayCode: ", day, codeRap);

    const change = (e) => {
        setCodeRap(e.target.value);
        let filterRap = rap.find(ele => ele.code === e.target.value)
        // console.log(filterRap)
        setInforRap(filterRap)
    };

    const changeDate = async (e) => {

        if (e.keyCode === 13) {
            let date = e.target.value;
            let year = date.slice(0, 4);
            let month = date.slice(5, 7);
            let day = date.slice(8, 10);
            let dateNew = day + "/" + month + "/" + year;

            setDay(dateNew);
        }
    };
    const showBookTickets = (sessionId, cinemaCode) => {
        nav('/Book-Ticket?cinemaId=' + cinemaCode + '&sessionId=' + sessionId)
    }

    return (
        <>
            <div className="rapComponent fl fl-cen">
                <div className="mainSize">
                    {/*<h1>Username: {avaUser} </h1>*/}
                    <div className="header-rap">
                        <h2>PHIM ??ANG CHI???U</h2>
                    </div>

                    <Row className="content">
                        <Col xl={12} className="left">
                            <div>
                                <input
                                    type="date"
                                    className="leftInput"
                                    onKeyUp={changeDate}
                                    defaultValue={dateNewFormatInput}
                                />

                                <select className="selectFilm" onChange={change}>
                                    {rap &&
                                        rap.map((ele, index) => {
                                            return (
                                                <option key={index} value={ele.code}>
                                                    {" "}
                                                    {ele.name}{" "}
                                                </option>
                                            );
                                        })}
                                </select>
                                <div className="allFilm">
                                    {detailFilm &&
                                        detailFilm.detailFilm.map((item, index) => {
                                            return (
                                                <div className="cardFilm" key={index}>
                                                    <div className="imgCardFilm">
                                                        <img
                                                            className="w-100"
                                                            src={item.imagePortrait}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="infoFilm">
                                                        <div className="inforFilmHeader">
                                                            <h3> {item.name} </h3>
                                                            <div className="time">
                                                                <span> {item.startdate?.slice(0, 4)} </span>{" "}
                                                                {item.duration && (
                                                                    <span>Time: {item.duration} ph??t</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="cutheTime">
                                                            {item.dates &&
                                                                item.dates
                                                                    .filter((ele) => ele.showDate === day)
                                                                    .map((dt, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <p>
                                                                                    {" "}
                                                                                    {dt.bundles[0].version} -{" "}
                                                                                    {dt.bundles[0].caption}{" "}
                                                                                </p>
                                                                                <div key={index}
                                                                                     className="alltimefilm">
                                                                                    {dt.bundles[0].sessions.map(
                                                                                        (gio, index) => {
                                                                                            console.log(gio)
                                                                                            return (
                                                                                                <span
                                                                                                    className="gioSpan"
                                                                                                    key={index}
                                                                                                    onClick={() => showBookTickets(gio.sessionId, gio.cinemaId)}
                                                                                                >
                                                                                                    {gio.showTime}
                                                                                                </span>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </Col>

                        {/* right/////////////////// */}
                        <Col xl={12} className="right">
                            <div className="header-rap">
                                <h2>GI?? V??</h2>
                            </div>
                            <div>
                                <img
                                    className="imgHeader"
                                    src="https://cdn.galaxycine.vn/media/2023/1/18/nguyen-du-100_1674015247628.jpg"
                                    alt=""
                                />
                            </div>

                            <p style={{borderBottom: "1px solid black"}} className="thongtin mb-10">TH??NG TIN CHI
                                TI???T</p>
                            <div className="diachi">
                                <p>
                                    {" "}
                                    <span>?????a ch???</span> : {inforRap.address ? inforRap.address : "L???u 2, TTTM Sense City, s??? 9, Tr???n H??ng ?????o, P.5, Tp. C?? Mau"}
                                </p>
                                <p>
                                    {" "}
                                    <span>S??? ??i???n tho???i</span> {inforRap.phone ? inforRap.phone : "1900 2224"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-5">
                                    L?? r???p chi???u ?????u ti??n v?? ????ng kh??ch nh???t trong h??? th???ng, Galaxy
                                    Nguy???n Du ch??nh th???c ??i v??o ho???t ?????ng t??? ng??y 20/5/2005 v?? ???????c
                                    xem l?? m???t trong nh???ng c???m r???p mang ti??u chu???n qu???c t??? hi???n ?????i
                                    b???c nh???t ?????u ti??n xu???t hi???n t???i Vi???t Nam. Galaxy Nguy???n Du l??
                                    m???t trong nh???ng r???p chi???u phim ti??n phong mang ?????n cho kh??n gi???
                                    nh???ng tr???i nghi???m phim chi???u r???p t???t nh???t. Xem th??m t???i:
                                    https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
                                </p>

                                <p className="mb-5">
                                    Galaxy Nguy???n Du g???m 5 ph??ng chi???u v???i h??n 1000 ch??? ng???i, trong
                                    ???? c?? 1 ph??ng chi???u phim 3D v?? 4 ph??ng chi???u phim 2D, v???i h??n
                                    1000 ch??? ng???i ???????c thi???t k??? tinh t??? gi??p kh??ch h??ng c?? th??? xem
                                    nh???ng b??? phim hay m???t c??ch tho???i m??i v?? thu???n ti???n nh???t. Ch???t
                                    l?????ng h??nh ???nh r?? n??t, ??m thanh Dolby 7.1 c??ng m??n h??nh chi???u k???
                                    thu???t 3D v?? Digital v?? c??ng s???c m???n, mang ?????n m???t kh??ng gian
                                    gi???i tr?? v?? c??ng s???ng ?????ng. Xem th??m t???i:
                                    https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
                                </p>

                                <p className="mb-5">
                                    B??n c???nh ????, v???i l???i th??? g???n khu v???c s???m u???t b???c nh???t ??? trung
                                    t??m th??nh ph???, b??i ????? xe r???ng r??i, c?? ti???m cafe ngo??i tr???i ??? ????y
                                    l?? n??i c???c thu h??t b???n tr??? ?????n xem phim v?? check-in. Xem th??m
                                    t???i: https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default Rap;


// let res = await fetch(
//   "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/cinemas/1010"
// );
// let data = await res.json();
// console.log("check: ", data);

// let result = [];
// let pushFilmtoRedux = data.map((ele) => {
//   // console.log(ele)
//   let data = ele.dates.filter((item) => {
//     return item.showDate === dateNew;
//   });
//   console.log(data);
//   if (data.length !== 0) {
//     result.push(ele);
//   } else {
//     console.log("false");
//   }
// });
// // console.log(result)
// let dataResult = result;
// // console.log(pushFilmtoRedux)

// dispatch({ type: "SetDetailFilm", payload: dataResult });