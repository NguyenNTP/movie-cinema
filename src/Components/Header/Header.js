import React, {useEffect, useState} from 'react';
import "./Header.scss"
import {BsSearch} from 'react-icons/bs'
import {UserOutlined, UnorderedListOutlined, ShopOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {RiLockPasswordLine} from "react-icons/ri";
import {FiUserPlus} from "react-icons/fi";
import {useNavigate, Link} from "react-router-dom";

function Header() {
    const userInLocalstorage = localStorage.getItem("user")
    const [checkLogin, setCheckLogin] = useState("Login")

    const nav = useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        nav('/Login')
    }
    useEffect(() => {

        if (userInLocalstorage) {
            setCheckLogin("Logout")
        } else
            setCheckLogin("Login")
    }, [userInLocalstorage])

    const items = [
        {
            key: 'User',
            icon: <UserOutlined/>,
            children: [
                {
                    label: (<Link to={"changePass"}>
                        Đổi Password
                    </Link>),
                    key: '1',
                    icon: <RiLockPasswordLine/>,
                },
                {
                    label: (<Link to={"/manageUser"}>
                        Quản lý tài khoản
                    </Link>),
                    key: '2',
                    icon: <UserOutlined/>,
                },
                {
                    label: (<Link to={"/Register"}>
                        Tạo tải khoản mới
                    </Link>),
                    key: '3',
                    icon: <FiUserPlus/>,
                },
                {
                    label: (<Link to={"/bank"}>
                        Thêm thẻ mới
                    </Link>),
                    key: '4',
                    icon: <FiUserPlus/>,
                },
                {
                    label: (<Link to={"/FindTicket"}>
                        Lịch sử vé
                    </Link>),
                    key: '5',
                    icon: <ShopOutlined />
                },
                {
                    label: <span onClick={handleLogOut}>{checkLogin}</span>,
                    key: '6',
                    icon: <FiUserPlus/>,
                },
            ]

        },
        {
            id: "list-page-mb",
            key: "list-page-mb",
            icon: <UnorderedListOutlined/>,
            children: [
                {
                    label: <Link to={"/Muave"}>Mua vé</Link>,
                    key: 'BuyTicket',
                },
                {
                    label: <Link to={"/"}>Phim</Link>,
                    key: 'Movie',
                },
                {
                    label: <Link to={"/rap"}>Rạp</Link>,
                    key: 'Cinema',
                },
            ]
        },
    ]

    return (
        <div className="header fl fl-cen pt-10 pb-10">
            <div className="mainSize fl fl-mid fl-spw">
                <div className="fl fl-mid">
                    <Link className="Logo" to={"/"}>
                        <img className="w-100" src={require('./logo_Desktop.png')} alt="Logo"/>
                    </Link>
                    <div className="Search relative ml-10">
                        <form className="Search-Form fl fl-cen fl-mid">
                            <BsSearch className="icon-search absolute ml-10"/>
                            <input type="text" className="rad-20 pl-40 pt-10 pb-10 w-100"
                                   placeholder="Movie or theater"/>
                        </form>
                    </div>
                </div>
                <div className="fl fl-mid">
                    <ul className="list-page fl bx-siz">
                        <li><Link to={"/Muave"}>Mua vé</Link></li>
                        <li><Link to={"/"}>Phim</Link></li>
                        <li><Link to={"/rap"}>Rạp</Link></li>
                    </ul>
                    {userInLocalstorage &&
                        <span className="mr-5 ml-5 user-name">{JSON.parse(userInLocalstorage).Name}</span>}
                    <Menu style={{background: "transparent"}} items={items} mode="horizontal">
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;