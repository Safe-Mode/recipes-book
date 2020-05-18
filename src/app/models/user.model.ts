export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpDate: Date
  ) {
  }

  get token(): string {
    return (this._token && new Date() < this._tokenExpDate) ? this._token : null;
  }
}
