import { User } from "../../../user/domain/user/entity/User";
import { ItemCarrinho } from "./ItemCarrinho";

export class Carrinho {
    private _id: String | undefined;
    private _user: User | undefined;
    private _itensCarrinho: Array<ItemCarrinho> = new Array<ItemCarrinho>;

    public get id(): String | undefined {
        return this._id;
    }
    public set id(value: String | undefined) {
        this._id = value;
    }
    public get user(): User | undefined {
        return this._user;
    }
    public set user(value: User | undefined) {
        this._user = value;
    }

    public get itensCarrinho(): Array<ItemCarrinho> {
        return this._itensCarrinho;
    }
    public set itensCarrinho(value: Array<ItemCarrinho>) {
        this._itensCarrinho = value;
    }
}