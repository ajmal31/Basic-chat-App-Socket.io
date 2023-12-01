import dotenv from "dotenv"
dotenv.config()

export default{

    SOCKET_PORT:process.env.SOCKET_PORT,
    SERVER_PORT:process.env.SERVER_PORT
}