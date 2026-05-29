import { Order } from "../../../application/dto/Order";
import cds from '@sap/cds';


export class OrderRepositoryPostgres {

    public async createOrder(ordem: Order) {
        try {
            const db = await cds.connect.to("db")
            db.run(
                cds.ql.INSERT.into("app.Order").entries({

                    nomeOrdem: ordem.nomeOrdem,
                    usuario: ordem.usuario?.id
                })

            )

        } catch (error) {

        }
    }

}