
export const getSchedule = (data) => {
    return {
        type: "rdcFilm/getSchedule",
        payload: data,
    }
}

export const getFilm = (data) => {
    return {
        type: "rdcFilm/getFilm",
        payload: data,
    }
}

export const checkPayTicket = () => {
    return {
        type: "rdcPayment/checkPay"
    }
}

export const setTicketInfor = (data) =>{
    return {
        type: "rdcTicket/setTicket",
        payload: data
    }
}
