const initialState = {
    Bank: 
        {
         
        }
}

const rdcBank = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SetBank":
            console.log(payload);
            return {
                Bank: payload
            }

        default: 
            return state
    }
}

export default rdcBank
