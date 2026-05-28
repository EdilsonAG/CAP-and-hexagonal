import { Product } from "../../../product/domain/product/entity/Product";
import { Carrinho } from "./Carrinho";

export class ItemCarrinho {
    private _id: Number | undefined;
    private _produto: Product | undefined;
    private _carrinho: Carrinho | undefined;
    private _quantidade: Number | undefined;
    
    public get id(): Number | undefined {
        return this._id;
    }
    public set id(value: Number | undefined) {
        this._id = value;
    }

    public get produto(): Product | undefined {
        return this._produto;
    }
    public set produto(value: Product | undefined) {
        this._produto = value;
    }

    public get quantidade(): Number | undefined {
        return this._quantidade;
    }
    public set quantidade(value: Number | undefined) {
        this._quantidade = value;
    }

    public get carrinho(): Carrinho | undefined {
        return this._carrinho;
    }
    public set carrinho(value: Carrinho | undefined) {
        this._carrinho = value;
    }
}