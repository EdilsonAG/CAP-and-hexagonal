import { User } from "../../../domain/user/entity/User";
import { UserCryptService } from "../../../domain/user/service/UserCryptService";
import { UserRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { CreateUserInput } from "../../dto/CreateUserInput";
import { CreateUserUseCase } from "../../ports/inbound/CreateUserUseCase";
import { UserPersistencePort } from "../../ports/outbound/UserPersistencePort";

export class CreateUserInteractor implements CreateUserUseCase{

    private userCryptService:UserCryptService;
    private userPersistencePort:UserPersistencePort;

    constructor(){
       this.userPersistencePort= new UserRepositoryPostgres();
       this.userCryptService = new UserCryptService();
    }

    async createUser(createUserInput: CreateUserInput): Promise<CreateUserInput> {

        const user = new User();
        user.email = createUserInput.email
        user.nome = createUserInput.nome
        user.senha = createUserInput.senha

        console.log("criptografando")
        let newPass:String= await this.userCryptService.criptografandoSenha(user.senha?.toString())
        
        createUserInput.senha = newPass
        user.senha = newPass;

        await this.userPersistencePort.create(user)

        return createUserInput;
    }

}