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


cds.on('bootstrap', (app) => {
    const findUserByEmail = new FindUserInteractor();
    // Necessário para ler o body JSON
    app.use(require('express').json());

    //simulando banco de dadados, 
    const USERS = [{ id: 1, user: "ed", pass: "123", roles: ["admin"] }]

    async function jwt_auth(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]

        if (!token) {
            // ✅ Sem token: usuário anônimo, deixa o CAP decidir
            req.user = new cds.User.Anonymous();
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                req.user = new cds.User.Anonymous();
                return next();
            }
            req.user = new cds.User({
                id: decoded.sub,
                roles: decoded.roles ?? [],
                attr: { id: decoded.id }
            })
            return next();
        })

    }

    app.post('/login', async (req, res) => {
        //const { user, pass } = req.body
        //const users = USERS.find(u => u.user === user && u.pass === pass)

        try{
        const { email, senha } = req.body;

        // monta o input
        const loginInput = new LoginUserInput();
        loginInput.email = email;
        loginInput.senha = senha;

        const usuarioEncontrado = await findUserByEmail.findUser(loginInput)
        console.log("usuário encontrado")
        //const usuarioNew = new User();
        // usuarioEncontrado.then((e) => {
        //     usuarioNew.email = e?.email;
        //     usuarioNew.senha = e?.senha;
        //     usuarioNew.id = e?.id;
        //     usuarioNew.nome = e?.nome;
        // })

        //const users = await findUserByEmail.findUser(req.data)


        if (!usuarioEncontrado) return res.status(401).json({ message: "credenciais invalidas" })
        console.log("chegou aqui")
        const token = jwt.sign(
            {
                id: usuarioEncontrado.id?.toString(),

            },
            // chave privada
            //privateKey,
            process.env.JWT_SECRET,

            {
                //algorithm: 'RS256',  vou implementar com chave
                subject: usuarioEncontrado.id,          // claim "sub"
                issuer: 'minha-api',       // claim "iss"
                expiresIn: '1h',
            }
        );
        res.json({ access_token: token, })
    }catch(err: any){
        return res.status(401).json({ message: err.message });
    }
    })


    app.use('/odata', jwt_auth);
}
)

