import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'


export const registerService = async ({ name, email, password, role }) => {
    //step: 1 check email cha ki chainaaa
    //TODO: CHECK THE EMAIL (DB CALL)

    const genSalt = 10
    const hashPassword = await bcrypt.hash(password, genSalt)
    console.log(hashPassword)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role: role || 'patient'
    })

    //Token ko code lekhneee
    // const token = jwt.sign(
    //     {
    //         id: user.id,
    //         role: user.role
    //     },
    //     process.env.JWT_SECRET, //secret key
    //     {
    //         expiresIn: process.env.JWT_EXPIRES_IN
    //     }
    // )


    return {
        // token,
        user
    }
}

//loginService

export const loginService = async ({ email, password }) => {
    console.log(email, password)
    //validate the email is already registered or not in DB
    const user = await User.findOne({
        where: email
    })
    if (!user) {
        throw {
            status: 404,
            message: "Please check youre email or password"
        }
    }
    console.log("user", user)

    //password validate garnee
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
        throw {
            status: 404,
            message: "Please check youre email or password"
        }
    }

    //access-token & refresh token
    //access-token 
    const accessToken = jwt.sign(  //short lived token - 15min/10min
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    )

    //refresh-token
    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    )

    //password exclude
    const { password: _, ...userData } = user.toJSON()

    return {
        accessToken,
        refreshToken,
        user: userData
    }
}