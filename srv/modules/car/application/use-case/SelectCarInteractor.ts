import { CarRepositoryPostgres } from "../../infraestucture/database/CarRepositoryPostgres";
import { ItemCarrinho } from "../dto/ItemCarrinho";
import { SelectCarUseCase } from "../port/inbound/SelectCarUseCase";
import { CarPersistencePort } from "../port/outbound/CarPersistencePort";

export class SelectCarInteractor implements SelectCarUseCase {
    private carPersistencePort: CarPersistencePort;


    constructor() {
        this.carPersistencePort = new CarRepositoryPostgres();
    }

    public async findItemCar(id: string): Promise<Array<ItemCarrinho>> {
        const carrinho = await this.carPersistencePort.selectCar(id);
        if (carrinho?.id === undefined) {
            throw new Error("carrinho não encontrado");
        }
        const itens: Array<ItemCarrinho> = await this.carPersistencePort.selectItemCar(carrinho?.id);
        return itens;
    }
}