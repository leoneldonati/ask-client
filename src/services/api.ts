class Api {
  domain: string = "";
  constructor(domain: string) {
    this.domain = domain;
  }

  post = async (endpoint: string, payload: FormData): Promise<{ status: number; res?: Response; message?: string}> => {
    try {
      const res = await fetch(this.domain + endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_HOST
        },
        body: payload,
        mode: 'cors'
      });

      
      if (!res.ok) return {
        status: res.status
      }

      return {
        status: res.status,
        res
      };
    } catch (err) {
      return {
        status: 500,
        message: "Error on server",
      };
    }
  };

  get = async (endpoint:string) => {
    try {
      const res = await fetch(this.domain + endpoint, {
        method: 'GET',
        credentials: 'include',     
      })
      return {
        status: res.status,
        data: await res.json(),
      };
    }
    catch (err) {
      return {
        status: 500,
        message: "Error on server",
      };
    }
  }
}

export default Api;
