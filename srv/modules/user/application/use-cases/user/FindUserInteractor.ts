import { User } from "../../../domain/user/entity/User";
import { UserRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { CreateUserInput } from "../../dto/CreateUserInput";
import { FindUserUseCase } from "../../ports/inbound/FindUserUseCase";
import { UserPersistencePort } from "../../ports/outbound/UserPersistencePort";

export class FindUserInteractor implements FindUserUseCase{

    private userPersistencePort:UserPersistencePort;
    constructor(){
        this.userPersistencePort= new UserRepositoryPostgres();
    }

    async findUser(createUserInput: CreateUserInput): Promise<User | undefined> {

        const user:User = new User();
        user.email = createUserInput.email
        user.id = createUserInput.id
        user.nome = createUserInput.nome
        user.senha = createUserInput.senha

        if(user.email === undefined){
            throw new Error("favor informar email");
        }

        let userEncontrado = await this.userPersistencePort.findByEmail(user.email);
        
        return userEncontrado;
         

    }

}