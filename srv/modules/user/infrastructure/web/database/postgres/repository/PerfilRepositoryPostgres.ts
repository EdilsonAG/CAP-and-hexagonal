import { PerfilPersistencePort } from "../../../../../application/ports/outbound/PerfilPersistencePort";
import { Perfil } from "../../../../../domain/user/entity/Perfil";
import cds from '@sap/cds';

export class PerfilRepositoryPostgres implements PerfilPersistencePort {

    async createPerfil(perfil: Perfil): Promise<void> {
        try {
            const db = await cds.connect.to('db');
            console.log(perfil.descricao)

            // ✅ cds.entities() em vez de db.entities()
            const { Perfil: PerfilEntity } = cds.entities('app');

            await db.run(
                cds.ql.INSERT.into("app.Perfil").entries({
                    descricao: perfil.descricao,
                    permissao: perfil.permissao,
                    user: perfil.user,
                })
            );
        } catch (error: any) {
            throw new Error(`Erro ao criar perfil: ${error.message}`);
        }
    }
}