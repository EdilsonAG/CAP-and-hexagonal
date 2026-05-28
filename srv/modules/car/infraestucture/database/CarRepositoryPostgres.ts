import { User } from "../../../user/domain/user/entity/User";
import { Carrinho } from "../../application/dto/Carrinho";
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

    public async findCarByUser(id_user: String): Promise<Carrinho | undefined> {
        try {

            const db = await cds.connect.to("db")
            const result = await db.run(
                cds.ql.SELECT.from("app.Carrinho").where({ user_id: id_user })
            )
            if(!result){
                throw new Error("Carrinho não encontrado")
            }
            return result;
        } catch (error) {

        }
    }

    public async addItemCar() {

    }

}