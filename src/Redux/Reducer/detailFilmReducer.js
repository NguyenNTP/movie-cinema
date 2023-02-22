const initialState = {
    detailFilm: [
        {
            nameFilm: "NHÀ BÀ NỮ",
            imageUrl: "https://cdn.galaxycine.vn/media/2023/1/14/nha-ba-nu-1_1673711231096.jpg",
            startDate: "2023",
            typeFilm: "3D",
            showDate: "01/02/2023",
            showTime: [],
        }
    ],
    // showTime: []
}

const rdcDetailFilm = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SetDetailFilm":
            return {
                // ...state,
                detailFilm: payload
            }

        // case "setShowTime": 
        //     return {
        //         ...state, 
        //         showTime: payload 
        //     }

        default: 
            return state;

    }
}

export default rdcDetailFilm





