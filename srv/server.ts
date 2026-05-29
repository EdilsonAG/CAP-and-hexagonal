import { env } from "process";
require('dotenv').config();
const cds = require('@sap/cds');
const jwt = require('jsonwebtoken');
const fs = require('fs');
import { Request, Response, NextFunction } from 'express';
import { FindUserInteractor } from "./modules/user/application/use-cases/user/FindUserInteractor";
import { User } from "./modules/user/domain/user/entity/User";
import { json } from "stream/consumers";
import { LoginUserInput } from "./modules/user/application/dto/LoginUserInput";
import { UserRepositoryPostgres } from "./modules/user/infrastructure/web/database/postgres/repository/UserRepositoryPostgres";
import { PerfilRepositoryPostgres } from "./modules/user/infrastructure/web/database/postgres/repository/PerfilRepositoryPostgres";


cds.on('bootstrap', (app) => {
    const findUserByEmail = new FindUserInteractor();
    const perfilRepositoryPostgres = new PerfilRepositoryPostgres();
     app.use(require('express').json());

    const PUBLIC_ROUTES = [
        { method: 'GET', path: '/v4/catalog/Products' },
        { method: 'POST', path: '/v4/user/User' },
    ];

  

    async function jwt_auth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]
       
        const isPublic = PUBLIC_ROUTES.some(
            (r) => r.method === req.method && req.path.startsWith(r.path)
        );

        if (isPublic) {
            req.user = new cds.User('anonymous');
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expirado, faça login novamente' });
                }
                return res.status(401).json({ message: 'Token inválido' });
            }

            console.log(" Token decodificado:", decoded);
            console.log(" Token decodificado:", decoded);



            const user = new cds.User(decoded.sub);
            user._roles = decoded.roles ?? [];
            user.attr = { id: decoded.id };
            req.user = user;


            console.log(" req.user montado:", req.user);
            console.log(" req.user._roles", req.user._roles);
            return next();
        })

    }

    app.post('/login', async (req, res) => {
        //const { user, pass } = req.body
        //const users = USERS.find(u => u.user === user && u.pass === pass)

        try {
            const { email, senha } = req.body;

            // monta o input
            const loginInput = new LoginUserInput();
            loginInput.email = email;
            loginInput.senha = senha;

            const usuarioEncontrado = await findUserByEmail.findUser(loginInput)

            if (usuarioEncontrado === undefined) {
                throw new Error("usuário não encontrado")
            }

            const perfilEncontrado = await perfilRepositoryPostgres.findPerfilByUser(usuarioEncontrado);
            console.log("usuário encontrado")
            //const usuarioNew = new User();
            // usuarioEncontrado.then((e) => {
            //     usuarioNew.email = e?.email;
            //     usuarioNew.senha = e?.senha;
            //     usuarioNew.id = e?.id;
            //     usuarioNew.nome = e?.nome;
            // })

            //const users = await findUserByEmail.findUser(req.data)

            console.log("perfil encontrado " + perfilEncontrado)
            if (!usuarioEncontrado || !perfilEncontrado) return res.status(401).json({ message: "credenciais invalidas" })
            console.log("chegou aqui")
            const token = jwt.sign(
                {
                    id: usuarioEncontrado.id?.toString(),
                    roles: [perfilEncontrado.permissao],

                },
                // chave privada

                process.env.JWT_SECRET,

                {
                    //algorithm: 'RS256',  vou implementar com chave
                    subject: usuarioEncontrado.id,          // claim "sub
                    issuer: 'minha-api',           // clam iss
                    expiresIn: '1h',
                }
            );
            res.json({ access_token: token, })
        } catch (err: any) {
            return res.status(401).json({ message: err.message });
        }
    })


    app.use('/odata', jwt_auth);
}
)

// require('dotenv').config();
// const cds = require('@sap/cds');
// const jwt = require('jsonwebtoken');
// import { Request, Response } from 'express';
// import { FindUserInteractor } from "./modules/user/application/use-cases/user/FindUserInteractor";
// import { LoginUserInput } from "./modules/user/application/dto/LoginUserInput";
// import { PerfilRepositoryPostgres } from "./modules/user/infrastructure/web/database/postgres/repository/PerfilRepositoryPostgres";

// cds.on('bootstrap', (app) => {
//     const findUserByEmail = new FindUserInteractor();
//     const perfilRepositoryPostgres = new PerfilRepositoryPostgres();
    
//     app.use(require('express').json());

//     // Só sobrou o /login — o resto o CAP gerencia
//     app.post('/login', async (req: Request, res: Response) => {
//         try {
//             const { email, senha } = req.body;

//             const loginInput = new LoginUserInput();
//             loginInput.email = email;
//             loginInput.senha = senha;

//             const usuarioEncontrado = await findUserByEmail.findUser(loginInput);

//             if (!usuarioEncontrado) {
//                 throw new Error("Usuário não encontrado");
//             }

//             const perfilEncontrado = await perfilRepositoryPostgres.findPerfilByUser(usuarioEncontrado);

//             if (!perfilEncontrado) {
//                 return res.status(401).json({ message: "Credenciais inválidas" });
//             }

//             const token = jwt.sign(
//                 {
//                     id: usuarioEncontrado.id?.toString(),
//                     roles: [perfilEncontrado.permissao],
//                 },
//                 process.env.JWT_SECRET,
//                 {
//                     subject: usuarioEncontrado.id,
//                     issuer: 'minha-api',
//                     expiresIn: '1h',
//                 }
//             );

//             res.json({ access_token: token });

//         } catch (err: any) {
//             return res.status(401).json({ message: err.message });
//         }
//     });

//     // Removido: PUBLIC_ROUTES, isPublicRoute, jwt_auth, app.use('/odata', jwt_auth)
// });