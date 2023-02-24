import * as request from "../utils/Request"

export const getLsFilmAPI = async () => {

    try {
        const res = await request.get("cinema/nowAndSoon")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getFilmSchedule = async (id) =>{
    try {
        const res = await request.get("cinema/movie/" +id)
        return res
    } catch (error) {
        console.log(error)
    }
}