import { User } from "../../../domain/user/entity/User";
import { UserRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { CreateUserInput } from "../../dto/CreateUserInput";
import { LoginUserInput } from "../../dto/LoginUserInput";
import { FindUserUseCase } from "../../ports/inbound/FindUserUseCase";
import { UserPersistencePort } from "../../ports/outbound/UserPersistencePort";
import bcrypt from 'bcrypt';

export class FindUserInteractor implements FindUserUseCase{

    private userPersistencePort:UserPersistencePort;
    constructor(){
        this.userPersistencePort= new UserRepositoryPostgres();
    }

    

    async findUser(LoginUserInput: LoginUserInput): Promise<User | undefined> {

        const user:User = new User();
        user.email = LoginUserInput.email?.toString()
        user.senha = LoginUserInput.senha?.toString();
        // user.id = createUserInput.id
        // user.nome = createUserInput.nome

        if(user.email === undefined){
            throw new Error("favor informar email");
        }

        let userEncontrado = await this.userPersistencePort.findByEmail(user.email);
        
        if(user.senha === undefined || userEncontrado?.senha === undefined){
            throw new Error("email ou senha incorretos");
        }

        const uas:Boolean =  await bcrypt.compare(user.senha.toString(),userEncontrado?.senha.toString())
        console.log(user.senha.toString())
        console.log(userEncontrado?.senha.toString())
        if(uas){
        return userEncontrado;
        }else{
            throw new Error("erro na senha ou email")
        }

    }


}