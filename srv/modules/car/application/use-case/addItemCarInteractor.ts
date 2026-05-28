import { ProductPersistencePort } from "../../../product/application/ports/outbound/ProductPersistencePort";
import { Product } from "../../../product/domain/product/entity/Product";
import { ProductRepositoryPostgres } from "../../../product/infrastructure/web/database/postgres/repository/ProductRepositoryPostgres";
import { CarRepositoryPostgres } from "../../infraestucture/database/CarRepositoryPostgres";
import { Carrinho } from "../dto/Carrinho";
import { AddItemCarUseCase } from "../port/inbound/AddItemCarUseCase";
import { CarPersistencePort } from "../port/outbound/CarPersistencePort";



export class AddItemCarInteractor implements AddItemCarUseCase{

    private carPersistencePort:CarPersistencePort
    private  productPersistencePort:ProductPersistencePort

    constructor(){
        this.carPersistencePort = new CarRepositoryPostgres();
        this.productPersistencePort = new ProductRepositoryPostgres();
    }

    async addItemCar(quantidade: Number, id_produto: String, id_user: String) {
        
        const product:Product | undefined = await this.productPersistencePort.findProductById(id_produto);

        const carrinho:Carrinho |  undefined = await this.carPersistencePort.findCarByUser(id_user);
        console.log("\n\n")
        console.log("=====carrinho======")
        console.log(product)
        console.log(quantidade)
        console.log(id_produto)
        console.log(id_user)
        console.log("===================")
        console.log("\n\n")
    }

}