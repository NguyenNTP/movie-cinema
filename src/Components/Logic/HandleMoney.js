import React from 'react';

const handleMoney = (money) => {
    if(money)
    return new Intl.NumberFormat('en-US').format(money)
    else return 0
}

export default handleMoney;