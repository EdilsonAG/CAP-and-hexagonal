import { User } from "../../../user/domain/user/entity/User";
import { Carrinho } from "../../application/dto/Carrinho";
import { ItemCarrinho } from "../../application/dto/ItemCarrinho";
import { CarPersistencePort } from "../../application/port/outbound/CarPersistencePort";
import cds from '@sap/cds';



export class CarRepositoryPostgres implements CarPersistencePort {

    public async createCarrinho(car: Carrinho): Promise<void> {

        try {
            console.log("\n\ncarrinho")
            console.log(car.user?.id)
            const db = await cds.connect.to('db');
            await db.run(
                cds.ql.INSERT.into("app.Carrinho").entries(
                    {
                        user_id: car.user?.id
                    }
                )
            )
        } catch (error) {

        }

    }

    public async addItemCarrinho(itemCarrinho: ItemCarrinho):Promise<void> {
        try {
            const db = await cds.connect.to('db');
            console.log(itemCarrinho.carrinho?.id)
            await db.run(
                cds.ql.INSERT.into("app.ItemCarrinho").entries(
                    {
                        carrinho_id: itemCarrinho.carrinho?.id,
                        produto_id: itemCarrinho.produto?.id,
                        quantidade: itemCarrinho.quantidade
                    }
                )
            )
        } catch (error) {

        }
    }

    public async findCarByUser(id_user: String): Promise<Carrinho | undefined> {
        try {

            const db = await cds.connect.to("db")
            const result:Carrinho = await db.run(
                cds.ql.SELECT.one.from("app.Carrinho").where({ user_id: id_user })
            )
            if (!result) {
                throw new Error("Carrinho não encontrado")
            }
            return result;
        } catch (error) {

        }
    }

    public async addItemCar() {

    }

}