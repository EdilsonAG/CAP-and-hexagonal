import { User } from "../../../domain/user/entity/User";
import { CreateUserInput } from "../../dto/CreateUserInput";
import { LoginUserInput } from "../../dto/LoginUserInput";

export interface FindUserUseCase{
    findUser(createUserInput:LoginUserInput):Promise<User | undefined>
}