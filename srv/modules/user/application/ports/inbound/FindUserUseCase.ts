import { User } from "../../../domain/user/entity/User";
import { CreateUserInput } from "../../dto/CreateUserInput";

export interface FindUserUseCase{
    findUser(createUserInput:CreateUserInput):Promise<User | undefined>
}