import { CreateUserInput } from "../../dto/CreateUserInput";

export interface FindUserUseCase{
    findUser(createUserInput:CreateUserInput):Promise<CreateUserInput>
}