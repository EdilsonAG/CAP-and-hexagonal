import { AddItemCarUseCase } from "../port/inbound/AddItemCarUseCase";

export class AddItemCarInteractor implements AddItemCarUseCase{
    addItemCar(quantidade: Number, id_produto: String, id_user: String) {
        
        console.log("\n\n")
        console.log("=====carrinho======")
        console.log(quantidade)
        console.log(id_produto)
        console.log(id_user)
        console.log("===================")
        console.log("\n\n")
    }

}