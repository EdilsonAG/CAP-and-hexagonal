export class LoginUserInput {
    private _email: String | undefined;
    private _senha: String | undefined;
    public get senha(): String | undefined {
        return this._senha;
    }
    public set senha(value: String | undefined) {
        this._senha = value;
    }

    public get email(): String | undefined {
        return this._email;
    }
    public set email(value: String | undefined) {
        this._email = value;
    }
}