const initialstate = {
    Check: false
}

const rdcPayment = (state = initialstate, {type, payload}) => {
    switch (type) {

        case "rdcPayment/checkPay":
            return {
                Check: true
            }

        default:
            return state
    }
}

export default rdcPayment