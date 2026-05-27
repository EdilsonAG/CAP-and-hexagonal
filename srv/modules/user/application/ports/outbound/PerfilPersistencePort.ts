import { Perfil } from "../../../domain/user/entity/Perfil";
import { User } from "../../../domain/user/entity/User";

export interface PerfilPersistencePort{
    createPerfil(user: Perfil): Promise<void>;
     findPerfilByUser(user: User): Promise<Perfil | undefined>;
}