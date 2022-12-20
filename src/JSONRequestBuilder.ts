import { RequestBuilder } from "./RequestBuilder.js";

export class JSONRequestBuilder extends RequestBuilder {

    constructor(url: string) {
        super(url);
    }

    public headers(headersBody: { [x: string]: string; }): RequestBuilder {
        super.headers(headersBody);
        this.requestConfig.headers = 
            Object.assign({...this.requestConfig.headers}, { "content-type": "application/json" });
        return this;
    }

}
