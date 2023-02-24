import axios from "axios";

const request = axios.create({
    baseURL: "https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/"
})

export const get = async (patch) => {
    const response = await request.get(patch)
    return response.data
}


export default request