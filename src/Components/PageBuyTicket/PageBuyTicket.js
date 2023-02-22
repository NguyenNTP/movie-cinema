import React from 'react';
import "./PageBuyTicket.scss"
import ByFilm from "./ByFilm/ByFilm";
import ByCinema from "./ByCinema/ByCinema";
import {Tabs} from 'antd';


function PageBuyTicket() {
    const items = [
        {
            key: 'ByFilm',
            label: `THEO FILM`,
            children: <ByFilm/>
        },
        {
            key: 'ByRap',
            label: `THEO RẠP`,
            children: <ByCinema/>,
        },
    ];

    return (
        <div className="page-buyticket fl fl-cen">
            <div className="mainSize">
                <Tabs classname="title-header" defaultActiveKey="1" items={items}/>
            </div>
        </div>
    );
}

export default PageBuyTicket;