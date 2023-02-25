import * as request from "../utils/Request"

export const getLsBank = async () => {
    try {
        const res = await request.get("Bank/Bank")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getLsCard = async () => {
    try {
        const res = await request.get("Bank/BankCard")
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findCardbyEmail = async (email)=> {
    try {
        const res = await request.get(`Bank/CardRef/${email}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const postTicket = async (data)=>{
    try {
     const res =  await request.post('cinema/Ticket', data)
        return res
    }
    catch (error) {
        console.log(error)
    }
}
