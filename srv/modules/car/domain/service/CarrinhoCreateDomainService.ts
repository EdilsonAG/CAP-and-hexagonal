import { User } from "../../../user/domain/user/entity/User";
import { UserRepositoryPostgres } from "../../../user/infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { Carrinho } from "../../application/dto/Carrinho";
import { CarPersistencePort } from "../../application/port/outbound/CarPersistencePort";
import { CarRepositoryPostgres } from "../../infraestucture/database/CarRepositoryPostgres";

export class CarrinhoCreateDomainService {

    private carPersistencePort: CarPersistencePort;
    private userPersistencePort: UserRepositoryPostgres

    constructor() {
        this.carPersistencePort = new CarRepositoryPostgres();
        this.userPersistencePort = new UserRepositoryPostgres();
    }

    public async createCarrinho(user: User): Promise<void> {

        if (user.email === undefined) {
            throw new Error("Email não cadastrado")
        }
        console.log("ir encontrar usuario parar criacao de carrinho")
        let userEncontrado = await this.userPersistencePort.findByEmail(user.email);
        console.log("usuario encontrado para criacao de carrinho")

        const carrinho = new Carrinho();
        carrinho.user = userEncontrado;



        await this.carPersistencePort.createCarrinho(carrinho);

    }
}