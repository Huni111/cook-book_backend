import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {

const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: '24h'
})

res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
})


}

export default generateToken