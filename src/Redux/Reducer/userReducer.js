const initialState = {
    User: 
        {
            
            Email: "22/77 Pham Ngọc Thạch phường 9",
            Name: "123456789",
            Role:"Neu ban muon biet them ve chi tiet cac rap hay chon rap o tren thanh chon rạp"

        }
}

const rdcUser = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SetUser":
            // console.log(payload);
            return {
                // ...state,
                User: payload
            }

        default: 
            let user = localStorage.getItem("user")
            // let parseUser = JSON.parse(user)
            return {
                User: user
            }

    }
}

export default rdcUser






// const initialState = {
//     lsUser: [
//         {
//             id: 1,
//             firstname: "NHU"
//         }
//     ]
// }


// const rdcUser = (state = initialState, {type, payload}) => {
//     switch (type) {
//         case "SetUser":
//             return {
//                 lsUser: payload
//             }

//         case "Clear": {
//             return {
//                 lsUser: []
//             }
//         }

//         default: 
//             return state;

//     }
// }

// export default rdcUser