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
                        <h2>PHIM ĐANG CHIẾU</h2>
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
                                                                    <span>Time: {item.duration} phút</span>
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
                                <h2>GIÁ VÉ</h2>
                            </div>
                            <div>
                                <img
                                    className="imgHeader"
                                    src="https://cdn.galaxycine.vn/media/2023/1/18/nguyen-du-100_1674015247628.jpg"
                                    alt=""
                                />
                            </div>

                            <p style={{borderBottom: "1px solid black"}} className="thongtin mb-10">THÔNG TIN CHI
                                TIẾT</p>
                            <div className="diachi">
                                <p>
                                    {" "}
                                    <span>Địa chỉ</span> : {inforRap.address ? inforRap.address : "Lầu 2, TTTM Sense City, số 9, Trần Hưng Đạo, P.5, Tp. Cà Mau"}
                                </p>
                                <p>
                                    {" "}
                                    <span>Số điện thoại</span> {inforRap.phone ? inforRap.phone : "1900 2224"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-5">
                                    Là rạp chiếu đầu tiên và đông khách nhất trong hệ thống, Galaxy
                                    Nguyễn Du chính thức đi vào hoạt động từ ngày 20/5/2005 và được
                                    xem là một trong những cụm rạp mang tiêu chuẩn quốc tế hiện đại
                                    bậc nhất đầu tiên xuất hiện tại Việt Nam. Galaxy Nguyễn Du là
                                    một trong những rạp chiếu phim tiên phong mang đến cho khán giả
                                    những trải nghiệm phim chiếu rạp tốt nhất. Xem thêm tại:
                                    https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
                                </p>

                                <p className="mb-5">
                                    Galaxy Nguyễn Du gồm 5 phòng chiếu với hơn 1000 chỗ ngồi, trong
                                    đó có 1 phòng chiếu phim 3D và 4 phòng chiếu phim 2D, với hơn
                                    1000 chỗ ngồi được thiết kế tinh tế giúp khách hàng có thể xem
                                    những bộ phim hay một cách thoải mái và thuận tiện nhất. Chất
                                    lượng hình ảnh rõ nét, âm thanh Dolby 7.1 cùng màn hình chiếu kỹ
                                    thuật 3D và Digital vô cùng sắc mịn, mang đến một không gian
                                    giải trí vô cùng sống động. Xem thêm tại:
                                    https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
                                </p>

                                <p className="mb-5">
                                    Bên cạnh đó, với lợi thế gần khu vực sầm uất bậc nhất ở trung
                                    tâm thành phố, bãi để xe rộng rãi, có tiệm cafe ngoài trời – đây
                                    là nơi cực thu hút bạn trẻ đến xem phim và check-in. Xem thêm
                                    tại: https://www.galaxycine.vn/rap-gia-ve/galaxy-nguyen-du
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