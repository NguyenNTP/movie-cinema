import React from 'react'
import "./Book-Fail.scss"

function BookFail() {
    return (
        <div className="book-fail fl fl-cen">
            <div className="mainSize">
                <div className="book-fail-content">
                    <h2>Lỗi mua vé</h2>
                    <div className="fl p-20">
                        <div className="sorry-img-cover">
                            <img className="w-100" src={require('./sorry-img.png')} alt="Anh bi loi"/>
                        </div>
                        <div className="">
                            <p>
                                Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực hiện giao dịch
                                online
                                lần
                                nữa và tới rạp phim gần nhất để mua vé.
                            </p>
                            <p>
                                Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách thông cảm và kiên nhẫn
                                cùng
                                nhân
                                viên CSKH.
                            </p>
                            <p>
                                Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị trừ tiền sau khi đội ngũ
                                CSKH
                                kiểm tra và xác nhận. Vui lòng gởi thông tin giao dịch lỗi về cho chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookFail;