import { apiVersion, serverHost } from "../constants";
import Api from "./api";

const { get } = new Api(serverHost)
async function getUserBy(id: string) {
  try {
    const { status, data, message } = await get(`/${apiVersion}/users?id=${id}`)

    if (status > 399) return { ok: false, message}

    return {
      ok: true,
      data,
      message
    }
  }
  catch (err) {
    return {
      ok: false,
      err
    }
  }
}

export {
  getUserBy
}