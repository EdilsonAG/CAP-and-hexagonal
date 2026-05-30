import { Order } from "../../../application/dto/Order";
import cds from '@sap/cds';
import { OrderPersistencePort } from "../../../application/ports/outbound/OrderPersistencePort";
import { ItemOrder } from "../../../application/dto/ItemOrder";


export class OrderRepositoryPostgres implements OrderPersistencePort {

    public async createOrder(ordem: Order): Promise<Order | undefined> {
        try {
            const db = await cds.connect.to("db")
            const result = await db.run(
                cds.ql.INSERT.into("app.Order").entries({

                    nomeOrdem: ordem.nomeOrdem,
                    usuario: ordem.usuario?.id
                })
            )
            if (!result) return undefined;

            return result;
        } catch (error) {
            throw new Error("erro ao criar ordem")
        }
    }

    public async selectOrderById(idOrdem: string) {
        try {
            const db = await cds.connect.to("db")
            const result = await db.run(
                cds.ql.SELECT.one.from("app.Order").where({ id: idOrdem }))
            if (!result) return undefined;

            return result;

        } catch (error) {
            throw new Error("erro ao selecionar ordem")
        }
    }

    public async createItensOrder( itens:Array<ItemOrder>){
        try {

             const entra = itens.map(item => ({
            ID:         cds.utils.uuid(),
            order_id_ID:    item.order_id?.id,     
            product_id_ID:  item.product_id?.id,   
            quantidade: item.quantidade,
            preco:      item.preco
        }))
            const db = await cds.connect.to("db")
            const result = await db.run(
                cds.ql.INSERT.into("app.ItemOrder").entries(entra))
            if (!result) return undefined;

            return result;

        } catch (error) {
            throw new Error("erro ao inserir itens da ordem")
        }
    }

}