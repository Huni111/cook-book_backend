import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {

const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: '24h'
})

res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
})


}

export default generateToken
