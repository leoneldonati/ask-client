import { apiVersion, serverHost } from "../constants";
import Api from "./api";


const {
  post,
  get
} = new Api(serverHost)
async function login(payload: FormData): Promise<{ ok: boolean; client: ClientData | null; error?: unknown }> {
  try {
    const res = await post(`/${apiVersion}/auth?type=login`, payload);

    if (res.status !== 200)
      return {
        ok: false,
        error: res,
        client: null,
      };

    const client = await res.res!.json() as ClientData

    return {
      ok: true,
      client,
    };
  } catch (e) {
    return {
      ok: false,
      error: e,
      client: null,
    };
  }
}


async function signup(
  payload: FormData
): Promise<{ ok: boolean; client: ClientData | null; error?: unknown }> {

  try {
    const res = await post(
      `/${apiVersion}/auth?type=signup`,
      payload
    );

    if (res.status !== 200)
      return {
        ok: false,
        error: await res,
        client: null,
      };

    return {
      ok: true,
      client: null,
    };
  } catch (e) {
    return {
      ok: false,
      error: e,
      client: null,
    };
  }
}

async function logout() {
  return await get(`/${apiVersion}/logout`)
}

async function checkSession () {
  return await get(`/${apiVersion}/check`)
}

export { login, signup, logout, checkSession };
