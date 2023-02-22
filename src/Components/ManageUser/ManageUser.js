import axios from "axios";
import React, {useState, useEffect} from "react";
import {Button, Input, Row, Col, Popover} from "antd";
import "./ManageUser.scss";

const ManageUser = () => {

    const [show, setShow] = useState(false)
    // const [editUser, setEditUser] = useState("")
    const [lsUser, setLsUser] = useState([]);
    const [, setEmailDelete] = useState("");

    const [emailUpdate, setEmailUpdate] = useState("")
    const [nameUpdate, setNameUpdate] = useState("")
    const [passUpdate, setPassUpdate] = useState("")


    useEffect(() => {
        fetch(
            "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/user"
        )
            .then((res) => res.json())
            .then((data) => setLsUser(data));
    }, []);

    const deleteUser = async (email) => {
        setEmailDelete(email.Email);
        let formValue = {
            Email: email.Email,
        };
        console.log(formValue);
        let res = await axios.delete(
            "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/user",
            {data: formValue}
            //   {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            // }},
        );
        let data = await res.data;
        console.log(data);
        let lsUserNew = lsUser.filter((ele) => ele.Email !== email.Email);
        setLsUser(lsUserNew);
    };

    const Edit = (user) => {
        setEmailUpdate(user.Email)
        setNameUpdate(user.Name)
        setShow(true)
    }

    const UpdateUser = async (e) => {
        e.preventDefault()
        let formValue = {
            Email: emailUpdate,
            Name: nameUpdate,
            Password: passUpdate
        }
        console.log(formValue)
        let res = await axios.put("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/user/user", formValue)
        let data = await res.data
        console.log(data)

        let lsUserNew = lsUser.map(ele => {
            return ele.Email === emailUpdate ? formValue : ele
        })
        // console.log(lsUserNew)
        setLsUser(lsUserNew)
    }

    const hiddenUpdate = () => {
        setShow(false)
    }

    const content = (

        <form className="form-des" onSubmit={UpdateUser}>
            <label htmlFor="Email">Email</label>
            <input className={"fl"} id="Email" type="text" value={emailUpdate}
                   onChange={(e) => setEmailUpdate(e.target.value)}/>
            <label htmlFor="Name">Tên</label>
            <input className={"fl"} id="Name" type="text" value={nameUpdate}
                   onChange={(e) => setNameUpdate(e.target.value)}/>
            <label htmlFor="Password">Mật khẩu mới</label>
            <input className={"fl"} id="Password" type="text" value={passUpdate}
                   onChange={(e) => setPassUpdate(e.target.value)}/>
            <button className="btnUpdate mt-10 t-upper">
                Cập nhật
            </button>
        </form>
    )


    return (
        <div className="manageUser fl fl-cen">
            <div className="mainSize">
                <div className="manageUser-content">
                    <h2>Danh sách khách hàng</h2>
                    <div className="tableUser fl fl-col">
                        <Row className="title-table t-cen pt-5 pb-5">
                            <Col className="b" span={14}>Email</Col>
                            <Col className="b" span={6}>Tên</Col>
                            <Col className="b" span={4}>Chức năng</Col>
                        </Row>
                        {lsUser.map((ele, index) => {
                            return (
                                <Row gutter={16} className="row-table fl fl-mid" key={index}>
                                    <Col span={12}><span>{ele.Email}</span></Col>
                                    <Col span={8}><span>{ele.Name}</span></Col>
                                    <Col className="block-btn fl fl-spw pr-10" span={4}>
                                        <button
                                            onClick={() => deleteUser(ele)}
                                            className="btnDelete"
                                        >Xóa
                                        </button>
                                            <Popover style={{width: 200}} placement="left"
                                                     className="updateUser" content={content}>
                                                <button onClick={() => Edit(ele)} className="btnEdit">Sửa</button>
                                            </Popover>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
