const initialState = {
}

const rdcTicket = (state = initialState, {type, payload}) => {
    switch (type) {

        case "rdcTicket/setTicket":
            return {
                ...payload
            }

        default:
            return state
    }
}

export default rdcTicket