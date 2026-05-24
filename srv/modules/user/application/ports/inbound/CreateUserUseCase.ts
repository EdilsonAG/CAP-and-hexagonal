import { CreateUserInput } from "../../dto/CreateUserInput";

export interface CreateUserUseCase{

    createUser(createUserInput:CreateUserInput):Promise<CreateUserInput>
}