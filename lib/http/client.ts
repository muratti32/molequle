class HttpClient {

  private readonly host = `${process.env.NEXT_PUBLIC_API_HOST}/api`;

  private defaultOptions = {
    headers: {
      Authorization: "Token e10daed0a38225816452370c003a3ded",
      "Content-Type": "application/json"
    },
  };

  setToken(token: string) {
    this.defaultOptions.headers.Authorization = `Token ${token}`;
  }

  private call(url: string, fetchOptions?: RequestInit) {
    return fetch(this.host + url, { ...fetchOptions, ...this.defaultOptions });
  }

  public async get<T>(url: string, fetchOptions?: RequestInit): Promise<T> {
    const res = await this.call(url, fetchOptions);
    return (await res.json()) as T;
  }

  public async post<T>(url: string, fetchOptions?: RequestInit): Promise<T> {
    const res = await this.call(url, { method: "Post", ...fetchOptions });
    return (await res.json()) as T;
  }
}

export const HttpClientSingleton = new HttpClient();
