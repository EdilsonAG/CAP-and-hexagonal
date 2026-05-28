import { CreateUserUseCase } from "../../../application/ports/inbound/CreateUserUseCase";
import { CreateUserInteractor } from "../../../application/use-cases/user/CreateUserInteractor";


export class UserController {

    private createUserUseCase: CreateUserUseCase;

    constructor() {
        this.createUserUseCase = new CreateUserInteractor();
    }

    registerHandlers(srv: any): void {
        srv.on('CREATE', 'User', async (req: any) => {
            try {
                // chamar use case
                console.log(req.data)
                const id = await this.createUserUseCase.createUser(req.data);
                return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        },
            // srv.before('READ', 'User', (req) => {
            //     if (!req.user || req.user.is('anonymous')) {
            //         return req.reject(401, 'Autenticação necessária');
            //     }
            // }))
        ) 
    }
}