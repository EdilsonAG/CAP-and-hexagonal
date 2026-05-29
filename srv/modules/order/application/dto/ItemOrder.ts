import { Product } from "../../../product/domain/product/entity/Product";
import { Order } from "./Order";

export class ItemOrder{
    private _id: String | undefined;     
    private _preco: number | undefined; 
    private _order_id: Order | undefined;   
    private _product_id: Product | undefined;
    private _quantidade: number | undefined;
    
    

    public get id(): String | undefined {
        return this._id;
    }
    public set id(value: String | undefined) {
        this._id = value;
    }
    public get order_id(): Order | undefined {
        return this._order_id;
    }
    public set order_id(value: Order | undefined) {
        this._order_id = value;
    }
    public get product_id(): Product | undefined {
        return this._product_id;
    }
    public set product_id(value: Product | undefined) {
        this._product_id = value;
    }
    public get quantidade(): number | undefined {
        return this._quantidade;
    }
    public set quantidade(value: number | undefined) {
        this._quantidade = value;
    }
    public get preco(): number | undefined {
        return this._preco;
    }
    public set preco(value: number | undefined) {
        this._preco = value;
    }
}