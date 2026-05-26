import { Perfil } from "../../../domain/user/entity/Perfil";
import { Permissao } from "../../../domain/user/entity/Permissao";
import { User } from "../../../domain/user/entity/User";
import { PerfilRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/PerfilRepositoryPostgres";
import { UserRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { CreatePerfilUseCase } from "../../ports/inbound/CreatePerfilUseCase";
import { FindUserUseCase } from "../../ports/inbound/FindUserUseCase";
import { PerfilPersistencePort } from "../../ports/outbound/PerfilPersistencePort";
import { UserPersistencePort } from "../../ports/outbound/UserPersistencePort";
import { FindUserInteractor } from "./FindUserInteractor";

export class CreatePerfilInteractor implements CreatePerfilUseCase{

    private perfilPersistencePort:PerfilPersistencePort;
    private userPersistencePort:UserPersistencePort;

    constructor(){
        this.perfilPersistencePort = new PerfilRepositoryPostgres();
        this.userPersistencePort = new UserRepositoryPostgres();
    }

    

    async setPerfilToUser(user:User):Promise <void>{
        const perfil:Perfil = new Perfil();

        if(user.email === undefined || user === undefined){
            throw new Error("email vazio");
        }

         
        const userEncontrado:User | undefined = await this.userPersistencePort.findByEmail(user.email);

        console.log("user encontrado")
        if(userEncontrado?.email === undefined || userEncontrado.id === undefined){
            throw new Error("email ou senha incorretos");
        }

        perfil.id = userEncontrado.id
        perfil.user = userEncontrado ;
        perfil.descricao = "simple Perfil"
        perfil.permissao = Permissao.user

        console.log("ir criar o perfil")
        this.perfilPersistencePort.createPerfil(perfil);

    }

}