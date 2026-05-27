import { PerfilPersistencePort } from "../../../../../application/ports/outbound/PerfilPersistencePort";
import { Perfil } from "../../../../../domain/user/entity/Perfil";
import cds from '@sap/cds';

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
}