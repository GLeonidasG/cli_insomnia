import axios, { AxiosRequestConfig } from "axios";


type Headers = Record<string, string>
type Body = Record<string, unknown>
type Query = Record<string, string | number>

export class RequestBuilder {

    private requestConfig: AxiosRequestConfig;

    constructor(url: string) {
        this.requestConfig = { url };
    }

    public auth(login: {user: string, password: string}): RequestBuilder {
        this.requestConfig.auth = { username: login.user, password: login.password };
        return this;
    }

    public headers(headersBody: Headers): RequestBuilder {
        this.requestConfig.headers = Object.assign({}, headersBody);
        return this;
    }

    public body(requestBody: Body): RequestBuilder {
        this.requestConfig.data = Object.assign({}, requestBody);
        return this;
    }

    public query(requestQueries: Query): RequestBuilder {
        this.requestConfig.params = Object.assign({}, requestQueries);
        return this;
    }

    public GET(): RequestBuilder {
        this.requestConfig.method = "GET";
        return this;
    }

    public POST(): RequestBuilder {
        this.requestConfig.method = "POST";
        return this;
    }
    
    public PUT(): RequestBuilder {
        this.requestConfig.method = "PUT";
        return this;
    }
    
    public PATCH(): RequestBuilder {
        this.requestConfig.method = "PATCH";
        return this;
    }

    public DELETE(): RequestBuilder {
        this.requestConfig.method = "DELETE";
        return this;
    }

    public async request(): Promise<void> {
        try {
            const { data, status } = await axios.request(this.requestConfig);
            console.table({ status });
            console.log("Response Data: \n", data);
            console.log("=======================");
        } catch (error) {
            console.log("================ Request error ================");
            const { data: response, status } = (error as any).response;
            console.table({response, status});
            console.log("===============================================");
        }
    }
}

