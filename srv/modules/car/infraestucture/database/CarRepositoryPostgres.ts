import { Carrinho } from "../../application/dto/Carrinho";
import { CarPersistencePort } from "../../application/port/outbound/CarPersistencePort";

export class CarRepositoryPostgres implements CarPersistencePort{
    
    createCarrinho(user: Carrinho): Promise<void> {
        throw new Error("Method not implemented.");
    }

}