import { useEffect, useState } from "react";
import { apiVersion, serverHost } from "../constants";
import Api from "../services/api";
import { useAuthStore } from "../stores/auth";

type UsersFnResponse = {
  ok: boolean;
  client: ClientData | null;
  error: unknown;
}

const {
  get
} = new Api(serverHost)
async function getProfileBy (id: string): Promise<UsersFnResponse> {
  try {

    const res = await get(`/${apiVersion}/users?id=${id}`)

    if (res.status !== 200) return {
      ok: false,
      error: await res.data,
      client: null
    }

    const client = await res.data as ClientData

    return {
      ok: true,
      error: null,
      client  
    }
  }
  catch (error) {
    return {
      ok: false,
      error,
      client: null
    }
  }
}

export default function useUsers ({ id }: { id: string; }) {
  const [client, setClient] = useState<ClientData | null>(null)
  const [error, setError] = useState<unknown | null>(null)
  const [loading, setLoading] = useState(false)

  const user = useAuthStore(state => state.client)


  useEffect(() => {
    if (user && user.id === id) {
      setClient(user)
      return
    }
    getProfileBy(id)
      .then(data => {
        setLoading(true)

        if (data.ok){
          setClient(data.client)
          setLoading(false)
          return
        }
        setError(data.error)
        setLoading(false)
      })
    
  }, [])
  return {
    client,
    error,
    loading
  }
}