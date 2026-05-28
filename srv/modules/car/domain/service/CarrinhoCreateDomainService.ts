import { User } from "../../../user/domain/user/entity/User";
import { Carrinho } from "../../application/dto/Carrinho";
import { CarPersistencePort } from "../../application/port/outbound/CarPersistencePort";
import { CarRepositoryPostgres } from "../../infraestucture/database/CarRepositoryPostgres";

export class CarrinhoCreateDomainService {

    private carPersistencePort:CarPersistencePort;

    constructor() {
        this.carPersistencePort = new CarRepositoryPostgres();
    }

    public async createCarrinho(user: User): Promise<void> {

        const carrinho = new Carrinho();

        this.carPersistencePort.createCarrinho(carrinho);

    }
}