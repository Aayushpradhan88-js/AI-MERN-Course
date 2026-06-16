import sequelize from "../config/connection.js"
import User from "../feature/user/user.model.js"
import Post from "../feature/post/post.model.js"

// Define associations
User.hasMany(
    Post,
    {
        foreignKey: 'userId',
        as: 'posts'
    }
)
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

const connectionDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully")

        await sequelize.sync(
            {
                force: false
            }
        )
        console.log("Database synchronized successfully")
    } catch (error) {
        console.error("Error connecting to the database:", error)
    }
}

export { connectionDB, sequelize }