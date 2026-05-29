import { ItemCarrinho } from "../../../car/application/dto/ItemCarrinho";
import { SelectCarUseCase } from "../../../car/application/port/inbound/SelectCarUseCase";
import { CarPersistencePort } from "../../../car/application/port/outbound/CarPersistencePort";
import { SelectCarInteractor } from "../../../car/application/use-case/SelectCarInteractor";
import { CarRepositoryPostgres } from "../../../car/infraestucture/database/CarRepositoryPostgres";
import { UserPersistencePort } from "../../../user/application/ports/outbound/UserPersistencePort";
import { UserRepositoryPostgres } from "../../../user/infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { ItemOrder } from "../dto/ItemOrder";
import { Order } from "../dto/Order";
import { CreateOrderUseCase } from "../ports/inbound/CreateOrderUseCase";

export class CreateOrderInteractor implements CreateOrderUseCase {

    private carPersistencePort: CarPersistencePort;
    private selectCar:SelectCarUseCase;
    private userRepositoryPort: UserPersistencePort

    constructor() {
        this.carPersistencePort = new CarRepositoryPostgres();
        this.selectCar = new SelectCarInteractor()
        this.userRepositoryPort = new UserRepositoryPostgres()
    }

    public async createOrder(idUser: string) {

        const user = await this.userRepositoryPort.findById(idUser)
        const ordem = new Order()
        const itens = new Array<ItemOrder>

        if(user?.id === undefined){
            throw new Error("usuário não existe")
        }

        const itensCarrinho:Array<ItemCarrinho> = await this.selectCar.findItemCar(user.id)

        
        
        ordem.nomeOrdem = "ORDENS"
        ordem.usuario = user;

        //salvar ordem
        
        itensCarrinho.map(item => {
            const itens = new ItemOrder()
             
          
        })

        //salvar itemOrdem

    }
}