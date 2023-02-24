import * as request from "../utils/Request"

export const getLsFilmAPI = async () => {

    try {
        const res = await request.get("cinema/nowAndSoon")
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}