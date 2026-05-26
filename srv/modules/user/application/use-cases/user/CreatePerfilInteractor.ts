import { Perfil } from "../../../domain/user/entity/Perfil";
import { Permissao } from "../../../domain/user/entity/Permissao";
import { User } from "../../../domain/user/entity/User";

export class CreatePerfilInteractor implements CreatePerfilInteractor{

    setPerfilToUser(user:User):void{
        const perfil:Perfil = new Perfil();

        perfil.user = user;
        perfil.descricao = "simple Perfil"
        perfil.permissao = Permissao.user

    }

}