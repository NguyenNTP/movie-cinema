import React from 'react';
import "./Footer.scss";
import {FacebookOutlined} from "@ant-design/icons"
import {InstagramOutlined} from "@ant-design/icons"
import {AppleOutlined} from "@ant-design/icons"
import {AndroidOutlined} from "@ant-design/icons"
import {YoutubeOutlined} from "@ant-design/icons"
import {Row, Col} from  "antd"

function Footer() {
    return (
        <div className="Footer fl fl-cen">
            <div className="mainSize">
                    <Row gutter={[0, 10]} className="content">
                        <Col className="mb-5" xs={12} md={6} xl={6}>
                            <h2>Giới thiệu</h2>
                            <p>Về chúng tôi</p>
                            <p>Thỏa thuận sử dụng</p>
                            <p>Quy chế hoạt động</p>
                            <p>Chính sách bảo mật</p>
                        </Col>

                        <Col className="mb-5" xs={12} md={6} xl={6}>
                            <h2>Góc điện ảnh</h2>
                            <p>Thể loại phim</p>
                            <p>Bình luận phim</p>
                            <p>Blog điện ảnh</p>
                            <p>Phim hay tháng</p>
                        </Col>

                        <Col className="mb-5" xs={12} md={6} xl={6}>
                            <h2>Hỗ trợ</h2>
                            <p>Góp ý</p>
                            <p>Sale & Service</p>
                            <p>Rạp / Giá vé</p>
                            <p>Tuyển dụng</p>
                        </Col>

                        <Col className="mb-5" xs={12} md={6} xl={6}>
                            <h2>Kết nối Cinema</h2>
                            <div className="social fl">
                                <div className="content-img-cover">
                                    <FacebookOutlined style={{fontSize: 30}}/>
                                </div>
                                <div className="content-img-cover">
                                    <YoutubeOutlined style={{fontSize: 30}}/>
                                </div>
                                <div className="content-img-cover">
                                    <InstagramOutlined style={{fontSize: 30}}/>
                                </div>
                            </div>
                            <h2>Download App</h2>
                            <div className="mobile fl">
                                <div className="content-img-cover">
                                    <AppleOutlined style={{fontSize: 30}}/>
                                </div>
                                <div className="content-img-cover">
                                    <AndroidOutlined style={{fontSize: 30}}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                <div className="company-name t-cen">
                    © 2023 Phương Nguyên Nguyễn
                </div>
            </div>
        </div>
    )
        ;
}

export default Footer;