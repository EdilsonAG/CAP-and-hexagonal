import { Carrinho } from "../../dto/Carrinho";

export interface CarPersistencePort{

    createCarrinho(car:Carrinho): Promise<void>;

}