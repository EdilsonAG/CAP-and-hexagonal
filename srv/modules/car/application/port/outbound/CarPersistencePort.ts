import { Carrinho } from "../../dto/Carrinho";
import { ItemCarrinho } from "../../dto/ItemCarrinho";

export interface CarPersistencePort{

    createCarrinho(car:Carrinho): Promise<void>;
    findCarByUser(id_user: String): Promise<Carrinho | undefined>
    addItemCarrinho(itemCarrinho: ItemCarrinho):Promise<void>
     selectItemCar(idCarrinho: string): Promise<Array<ItemCarrinho >>
}