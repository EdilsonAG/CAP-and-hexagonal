import { UserPersistencePort } from "../../../../../application/ports/outbound/UserPersistencePort";
import { User } from "../../../../../domain/user/entity/User";
import cds from '@sap/cds';


export class UserRepositoryPostgres implements UserPersistencePort {


    private db = cds.db

    async create(user: User): Promise<String | undefined> {
        try {

            const result: User = await this.db.run(
                cds.ql.INSERT.into('app.User').entries({

                    nome: user.nome,
                    email: user.email,
                    senha: user.senha
                })
            )
            return result.nome;
        } catch (error: any) {

            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }

    }

    async findById(id: Number): Promise<User | undefined> {
        try {
            const result: User = await this.db.run(
                cds.ql.SELECT.one.from('app.User').where({ id: id })
            );

            if (!result) return undefined;

            return result;
        } catch (error: any) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

}