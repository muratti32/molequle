export class WrapperApi {
  private readonly host: string = process.env.NEXT_PUBLIC_API_HOST || "";
  
  private readonly  token:string = "e10daed0a38225816452370c003a3ded"
  private defaultOptions = {
    // headers: {
    //   Authorization: `Bearer ${token}`, // temporally solution
    //   "Content-Type": "application/json",
    //   "X-Sync": "true"
    // },
    headers: {
      Authorization: 'Token e10daed0a38225816452370c003a3ded',
      'Content-Type': 'application/json',
      "X-Sync": "true"
    },
  };

  private generateURL(path: string): string {
     /**
     * temporarily using mock api until the api is ready
     * When the http://20.54.135.214 host value in the env file is used, 
     * some APIs do not work, so the values are temporarily harcoded.
     */
      const tempPath = ["/people/2414048","/activities/groups","/campaigns","/activities?person_id=2414048&"]
      
      const mockHost = tempPath.includes(path) ? "http://20.54.135.214/api" : this.host
      return !process.browser ? mockHost + path : path;

    // return !process.browser ? this.host + path : path;
  }

  post(path: string, options?: RequestOptions): Promise<Response> {
    return fetch(this.generateURL(path), { method: "POST", ...options, ...this.defaultOptions });
  }
  /* eslint-disable-next-line */
  get(path: string, options?: RequestOptions): Promise<ResponseBasic | any> {
    return fetch(this.generateURL(path), {
      method: "GET",
      ...options,
      ...this.defaultOptions,
    }).then((res) => res.json());
  }
}

interface RequestOptions {
  [key: string]: string;
}

interface ResponseBasic {
  prev: string | undefined;
  next: string | undefined;
  results: Array<RequestOptions>;
}
