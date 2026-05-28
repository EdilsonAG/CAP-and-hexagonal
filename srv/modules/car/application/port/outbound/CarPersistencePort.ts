import { Carrinho } from "../../dto/Carrinho";

export interface CarPersistencePort{

    createCarrinho(car:Carrinho): Promise<void>;
    findCarByUser(id_user: String): Promise<Carrinho | undefined>
}