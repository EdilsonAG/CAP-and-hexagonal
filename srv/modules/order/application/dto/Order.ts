import { User } from "../../../user/domain/user/entity/User";
import { ItemOrder } from "./ItemOrder";

export class Order {
    private _id: string | undefined;
    private _usuario: User | undefined;
    private _nomeOrdem: string | undefined;
    private _itens = new Array<ItemOrder>;

    
    public get itens() {
        return this._itens;
    }
    public set itens(value) {
        this._itens = value;
    }

   



    public get id(): string | undefined {
        return this._id;
    }
    public set id(value: string | undefined) {
        this._id = value;
    }
    public get nomeOrdem(): string | undefined {
        return this._nomeOrdem;
    }
    public set nomeOrdem(value: string | undefined) {
        this._nomeOrdem = value;
    }
    public get usuario(): User | undefined {
        return this._usuario;
    }
    public set usuario(value: User | undefined) {
        this._usuario = value;
    }


}