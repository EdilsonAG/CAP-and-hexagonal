export class User{
    private _id: string | undefined;
    public get id(): string | undefined {
        return this._id;
    }
    public set id(value: string | undefined) {
        this._id = value;
    }
    private _nome: String | undefined;
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

    public get nome(): String | undefined {
        return this._nome;
    }
    public set nome(value: String | undefined) {
        this._nome = value;
    }

  
}