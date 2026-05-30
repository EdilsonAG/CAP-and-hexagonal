import { ItemCarrinho } from "../../../car/application/dto/ItemCarrinho";
import { SelectCarUseCase } from "../../../car/application/port/inbound/SelectCarUseCase";
import { CarPersistencePort } from "../../../car/application/port/outbound/CarPersistencePort";
import { SelectCarInteractor } from "../../../car/application/use-case/SelectCarInteractor";
import { CarRepositoryPostgres } from "../../../car/infraestucture/database/CarRepositoryPostgres";
import { UserPersistencePort } from "../../../user/application/ports/outbound/UserPersistencePort";
import { UserRepositoryPostgres } from "../../../user/infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { OrderRepositoryPostgres } from "../../instraestructure/web/database/OrderRepositoryPostgres";
import { ItemOrder } from "../dto/ItemOrder";
import { Order } from "../dto/Order";
import { CreateOrderUseCase } from "../ports/inbound/CreateOrderUseCase";
import { OrderPersistencePort } from "../ports/outbound/OrderPersistencePort";

export class CreateOrderInteractor implements CreateOrderUseCase {

    private carPersistencePort: CarPersistencePort;
    private selectCar: SelectCarUseCase;
    private userRepositoryPort: UserPersistencePort
    private orderPersistencePort: OrderPersistencePort

    constructor() {
        this.carPersistencePort = new CarRepositoryPostgres();
        this.selectCar = new SelectCarInteractor()
        this.userRepositoryPort = new UserRepositoryPostgres()
        this.orderPersistencePort = new OrderRepositoryPostgres()
    }

    public async createOrder(idUser: string) {

        const user = await this.userRepositoryPort.findById(idUser)
        const ordem = new Order()
        const itenss = new Array<ItemOrder>

        if (user?.id === undefined) {
            throw new Error("usuário não existe")
        }

        const itensCarrinho: Array<ItemCarrinho> = await this.selectCar.findItemCar(user.id)



        ordem.nomeOrdem = "ORDENS"
        ordem.usuario = user;

        //salvar ordem

        const ordemSalva: Order | undefined = await this.orderPersistencePort.createOrder(ordem)

        const precoTotal: number = itensCarrinho.reduce((acumulador, item) => {
            const preco = item.produto?.preco ?? 0
            const quantidade = item.quantidade  ?? 0
            return acumulador + (preco * quantidade)
        }, 0)

        itensCarrinho.map(item => {
            const itens = new ItemOrder()
            itens.order_id = ordemSalva
            itens.product_id = item.produto
            itens.quantidade = item.quantidade
            itens.preco = item.produto?.preco

            itenss.push(itens)
        })

        //salvar itemOrdem
        this

    }
}