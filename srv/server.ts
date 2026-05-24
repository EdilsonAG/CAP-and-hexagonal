import { env } from "process";
require('dotenv').config();
const cds = require('@sap/cds');
const jwt = require('jsonwebtoken');
const fs = require('fs');
import { Request, Response, NextFunction } from 'express';


cds.on('bootstrap', (app) => {
    // Necessário para ler o body JSON
    app.use(require('express').json());

    //simulando banco de dadados, 
    const USERS = [{ id: 1, user: "ed", pass: "123",roles: ["admin"] } ]

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

    app.post('/login', (req, res) => {
        const { user, pass } = req.body
        const users = USERS.find(u => u.user === user && u.pass === pass)

        if (!users) return res.status(401).json({ message: "credenciais invalidas" })
        console.log("chegou aqui")
        const token = jwt.sign(
            {
                id: users.id,
                roles: users.roles
            },
            // chave privada
            //privateKey,
            process.env.JWT_SECRET,

            {
                //algorithm: 'RS256',  vou implementar com chave
                subject: users.id.toString(),          // claim "sub"
                issuer: 'minha-api',       // claim "iss"
                expiresIn: '1h',
            }
        );
        res.json({ access_token: token, })
    })


    app.use('/odata', jwt_auth);
}
)

