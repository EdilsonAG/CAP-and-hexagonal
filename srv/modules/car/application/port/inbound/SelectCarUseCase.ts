import { ItemCarrinho } from "../../dto/ItemCarrinho";

export interface SelectCarUseCase {
    findItemCar(id: string): Promise<Array<ItemCarrinho>>;
}