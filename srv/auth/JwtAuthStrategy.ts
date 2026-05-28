// src/auth/JwtAuthStrategy.ts
const cds = require('@sap/cds');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtAuthStrategy {
    async authenticate(req: any) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            req.user = new cds.User('anonymous');
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = new cds.User(decoded.sub);
            user._roles = decoded.roles ?? [];
            user.attr = { id: decoded.id };
            req.user = user;
        } catch (err) {
            req.user = new cds.User('anonymous');
        }
    }
}

export default JwtAuthStrategy; // <- mudou aqui