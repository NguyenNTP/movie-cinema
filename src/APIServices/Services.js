import * as request from "../utils/Request"

export const getLsFilmAPI = async () => {

    try {
        const res = await request.get("cinema/nowAndSoon")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getFilmSchedule = async (id) => {
    try {
        const res = await request.get("cinema/movie/" + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getLsCity = async () => {
    try {
        const res = await request.get("cinema/city")
        return res

    } catch (error) {
        console.log(error)
    }
}

export const getLsCinema = async () => {
    try {
        const res = await request.get("cinema/cinemas")
        return res

    } catch (error) {
        console.log(error)
    }
}

export const getScheduleCinema = async (cinemaId) => {
    try {
        const res = await request.get(`cinema/cinemas/${cinemaId}`)
        return res

    } catch (error) {
        console.log(error)
    }
}

export const getMoreInfor = async () => {
    try {
        const res = await request.get("cinema/moreInfo")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBookingDetail = async () => {
    try {
        const res = await request.get("cinema/booking/detail")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getTicketByShowCode = async (sessionId) => {
    try {
        const res = await request.get(`cinema/TicketByShowCode/${sessionId}`)
        return res

    } catch (error) {
        console.log(error)
    }
}