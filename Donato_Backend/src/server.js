require("dotenv").config();

const app = require("./index");
const connect = require("./configs/db");
const { connectRedis } = require("./configs/redis");

const PORT = process.env.PORT || 9900;

app.listen(PORT, async () => {
    console.log("starting");
    await connect();
    await connectRedis(); // 👈 Add this line
    console.log("✅ Redis connected");
    console.log("listening to port", PORT);
})