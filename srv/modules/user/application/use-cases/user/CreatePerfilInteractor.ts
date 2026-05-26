import { Perfil } from "../../../domain/user/entity/Perfil";
import { Permissao } from "../../../domain/user/entity/Permissao";
import { User } from "../../../domain/user/entity/User";
import { PerfilRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/PerfilRepositoryPostgres";
import { CreatePerfilUseCase } from "../../ports/inbound/CreatePerfilUseCase";
import { PerfilPersistencePort } from "../../ports/outbound/PerfilPersistencePort";

export class CreatePerfilInteractor implements CreatePerfilUseCase{

    private perfilPersistencePort:PerfilPersistencePort;

    constructor(){
        this.perfilPersistencePort = new PerfilRepositoryPostgres();
    }

    setPerfilToUser(user:User):void{
        const perfil:Perfil = new Perfil();

        perfil.user = user;
        perfil.descricao = "simple Perfil"
        perfil.permissao = Permissao.user

        this.perfilPersistencePort.createPerfil(perfil);

    }

}