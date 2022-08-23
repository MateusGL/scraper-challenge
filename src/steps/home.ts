import urls from '../config/url'
import axios from 'axios'
export default async function home() {
    const { status, data } = await axios.get(urls.home)

    if (status == 200) {
        return data
    }

    throw new Error(`error on home with status: ${status}`)
}