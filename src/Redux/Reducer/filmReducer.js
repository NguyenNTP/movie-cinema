const initialState = {
    lsFilm: [
        {
            id: "",
            address: "22/77 Pham Ngọc Thạch phường 9",
            phone: 123456789,
            description:"Neu ban muon biet them ve chi tiet cac rap hay chon rap o tren thanh chon rạp"

        }
    ],
}

const rdcFilm = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SetFilm":
            return {
                lsFilm: [...state, payload]
            }

        default: 
            return state;

    }
}

export default rdcFilm





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