import React from 'react';

function HandleDate() {


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    return today
}

export const convertDate = (date) => {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8, 10)
    return (day + "/" + month + "/" + year)
}

export const countDownTimer = (duration, display) => {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


export default HandleDate;

