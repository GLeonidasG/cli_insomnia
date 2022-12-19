
type Headers = Record<string, string>
type Body = Record<string, unknown>
type Query = Record<string, string | number>

export class RequestBuilder {

  private mountHeader(): string {
    const headerKeys = Object.keys(this._headers);
    let header = "";
    for (const key of headerKeys) {
      header += ` -H ${key}: ${this._headers[key]}`;
    }
    return header;
  }

  private mountQuery(): string {
    const queryKeys = Object.keys(this._query);
    let query = [];
    for (const key of queryKeys) {
      query.push(`${key}=${this._query[key]}`)
    }
    return query.join("&");
  }

  private _headers: Headers
  private _body: Body
  private _query: Query

  constructor(private URL: string) {
    this._headers = {}
    this._query = {}
    this._body = {}
  }

  public headers(headersBody: Headers): RequestBuilder {
    this._headers = Object.assign({}, headersBody);
    return this;
  }

  public body(requestBody: Body): RequestBuilder {
    this._body = Object.assign({}, requestBody);
    return this;
  }

  public query(requestQueries: Query): RequestBuilder {
    this._query = Object.assign({}, requestQueries);
    return this;
  }

  public request(): void {
    const header = this.mountHeader();
    const query = this.mountQuery();
    const body = JSON.stringify(this._body || {});
    console.table([{ header, query, body, url: this.URL }]);
  }
}

