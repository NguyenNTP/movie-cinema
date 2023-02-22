import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import {Button} from './Style';
import {HomeOutlined} from "@ant-design/icons"
import "./TopButton.scss"

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button checkmb>
            <HomeOutlined onClick={scrollToTop}
                          style={{display: visible ? 'inline' : 'none'}}/>
        </Button>
    );
}

export default ScrollButton;