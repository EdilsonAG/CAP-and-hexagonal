import { Perfil } from "../../../domain/user/entity/Perfil";

export interface PerfilPersistencePort{
    createPerfil(user: Perfil): Promise<void>;
}