const initialState = {
    film: {},
    schedule: [],
}

const rdcFilm = (state = initialState, {type, payload}) => {
    switch (type) {
        case "rdcFilm/getSchedule" :
            return {
                ...state,
               schedule: payload
            }
        case "rdcFilm/getFilm":
            return {
                ...state,
                film: payload
            }
        default:
            return state
    }
}

export default rdcFilm