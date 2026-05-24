export class CreateUserInput{
    private _id: Number | undefined;
    private _nome: String | undefined;
    private _email: String | undefined;

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

    public get id(): Number | undefined {
        return this._id;
    }
    public set id(value: Number | undefined) {
        this._id = value;
    }

 
}