import bcrypt from 'bcrypt'
import User from '../users/user.model.js'


export const registerService = async ({name, email, password, role}) => {
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

    return user
}