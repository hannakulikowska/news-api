type HttpMethod = 'GET' | 'POST';

interface LoaderOptions {
  apiKey: string;
  otherOption?: string;
  sources?: string;
}

export interface ILoader {
  baseLink: string;
  options: Partial<LoaderOptions>;
  getResp(
    { endpoint, options }: { endpoint: string; options?: Partial<LoaderOptions> },
    callback: (data: unknown) => void
  ): void;
  errorHandler(res: Response): Response;
  makeUrl(options: Partial<LoaderOptions>, endpoint: string): string;
  load(
    method: HttpMethod,
    endpoint: string,
    callback: (data: unknown) => void,
    options?: { [key: string]: string }
  ): void;
}

export class Loader implements ILoader {
  constructor(
    public baseLink: string,
    public options: Partial<LoaderOptions>
  ) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: { endpoint: string; options?: Partial<LoaderOptions> },
    callback: (data: T) => void = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Partial<LoaderOptions>, endpoint: string): string {
    const urlOptions: Record<string, string> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      const value = urlOptions[key];
      if (value !== undefined) {
        url += `${key}=${urlOptions[key]}&`;
      }
    });

    return url.slice(0, -1);
  }

  load<T>(
    method: HttpMethod,
    endpoint: string,
    callback: (data: T) => void,
    options: Partial<LoaderOptions> = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data as T))
      .catch((err) => console.error(err));
  }
}
