import React from 'react';
import {PlayCircleOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import ReactPlayer from "react-player";
import {convertDate} from "../../Logic/handleDate";
import ReactStars from "react-rating-stars-component";
import {useState} from "react";
import "./Film-detail.scss"

function FilmDetail(props) {


    const aroundPoint = (point) => {
        return +(Math.round(point + "e+1") + "e-1");
    }
    const ratingChanged = () => {
        setShow(false)
    };
    const showVote = () => {
        setShow(!show)
    }

    //Show modal trailer film
    const [show, setShow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="Film-detail">
            <div className="fl">
                <div className="img-film relative">
                    <img src={props.film.imageLandscape} alt={props.film.name} className="w-100 h-100"/>
                    <PlayCircleOutlined style={{color: "white", fontSize: 60}}
                                        className="btn-play absolute" onClick={showModal}/>
                    <Modal title={props.film.name}
                           open={isModalOpen}
                           onOk={handleOk}
                           onCancel={handleCancel}
                           okButtonProps={{disabled: true}}
                           cancelButtonProps={{disabled: true}}
                           width={690}
                           className="t-cen">
                        <div className="player-wrapped">
                            <ReactPlayer className='react-player' width='100%' height="100%" url={props.film.trailer}/>
                        </div>
                    </Modal>
                </div>
                <div className="film-infor">
                    <h1>{props.film.name}</h1>
                    <p className="mb-20">C{props.film.age} | {props.film.duration} phút
                        | {convertDate(props.film.startdate)}</p>
                    <div className="rating-movie fl">
                        <div className="rating-value"><strong
                            className="vote-point">{aroundPoint(props.film.point)}</strong><span>/10</span>
                            <div className="rating-view"><span
                                className="total-votes">{props.film.totalVotes}</span>
                            </div>
                        </div>
                        <button className="btn-vote" onClick={showVote}>Đánh giá</button>
                        {show && <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"/>}
                            halfIcon={<i className="fa fa-star-half-alt"/>}
                            fullIcon={<i className="fa fa-star"/>}
                            activeColor="#ffd700"
                        />}
                    </div>
                </div>
            </div>
            <p className="mt-40" dangerouslySetInnerHTML={{__html: props.film.description}}></p>
        </div>
    );
}

export default FilmDetail;