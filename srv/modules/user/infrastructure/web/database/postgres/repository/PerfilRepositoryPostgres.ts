import { PerfilPersistencePort } from "../../../../../application/ports/outbound/PerfilPersistencePort";
import { Perfil } from "../../../../../domain/user/entity/Perfil";
import cds from '@sap/cds';
import { User } from "../../../../../domain/user/entity/User";

export class PerfilRepositoryPostgres implements PerfilPersistencePort {

    async createPerfil(perfil: Perfil): Promise<void> {
        try {
            const db = await cds.connect.to('db');
            console.log(perfil.descricao)
            console.log("id user " + perfil.user?.id)

            console.log("\n\n")
            console.log("permissao")
            console.log(typeof perfil.permissao)
            console.log(perfil.permissao)

            const { Perfil } = cds.entities('app');



            await db.run(
                cds.ql.INSERT.into('app.Perfil').entries({
                    descricao: perfil.descricao,
                    permissao: String(perfil.permissao),
                    user_id: perfil.user?.id,
                })
            );
        } catch (error: any) {
            throw new Error(`Erro ao criar perfil: ${error.message}`);
        }
    }

    async findPerfilByUser(user: User): Promise<Perfil | undefined> {
        try {
            console.log("findPerfilByUser "+ user.id)
            const db = await cds.connect.to("db");

            const perfil: Perfil = await db.run(
                cds.ql.SELECT.one.from('app.Perfil').where({ user_id: user.id })
            )
            console.log("perfil encontrado: "+perfil)
            return perfil;
        } catch (error) {

        }
    }
}