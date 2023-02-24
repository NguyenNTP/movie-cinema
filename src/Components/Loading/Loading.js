import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import "./Loading.scss"

const loadingIcon = (<LoadingOutlined style={{fontSize: 150, color: "#FDB73B"}}/>)


function Loading() {
    return (
        <div className="absolute loading fl fl-cen fl-mid">
            <Spin indicator={loadingIcon}/>
        </div>
    );
}

export default Loading;