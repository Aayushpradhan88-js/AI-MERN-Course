import sequelize from "../config/connection.js"
import User from "../features/users/user.model.js"

const connectionDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully")

        await sequelize.sync(
            {
                force:  false
            }
        )
        console.log("Database synchronized successfully")
    } catch (error) {
        console.error("Error connecting to the database:", error)
    }
}

export { connectionDB, sequelize }