import jwt from "jsonwebtoken";
import config from "./config.js";

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name:user.name,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token isn\'t supplied.' });
    }
};

const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: 'Admin Token isn\'t valid.' });
};


export {getToken, isAuth, isAdmin}