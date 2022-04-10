import config from "../config/config"
import app from "./express"
import mongoose from "mongoose"

app.listen(config.port, (err) => {
    if (err) {
        console.error(err)
    }
    console.info("Server start at port %s.", config.port)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

mongoose.connection.on("error", () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`)
})
