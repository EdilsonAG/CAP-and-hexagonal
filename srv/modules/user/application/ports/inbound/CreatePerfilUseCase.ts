import { Perfil } from "../../../domain/user/entity/Perfil";
import { User } from "../../../domain/user/entity/User";

export interface CreatePerfilUseCase{
    setPerfilToUser(user:User):Promise <void>
}