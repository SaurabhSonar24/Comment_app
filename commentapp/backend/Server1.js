const express = require('express');
const mongoose = require('mongoose');
const port = 9999;
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const Server = require('socket.io')
const cors = require('cors')
// const io = new Server(httpServer)

const io = Server(httpServer, {
    cors: true,
    origins: ["localhost:3000"]
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// dbconnection
const db = "mongodb://localhost:27017/userData";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("Mongoose connected")
    }
    catch (err) {
        console.log(err.message)
    }
    const postModel = require('./db/userSchema');


    io.on('connection', (socket) => {
        postModel.find({}, (err, data) => {
            if (err) throw err;
            else {
                socket.emit('op-message', data)
            }
        })
        console.log('User Connected');
        socket.on("message", (data, _id) => {

            
            console.log(data)
            postModel.updateOne(
                { _id: _id },
                {
                    $push: {
                        comments: data,
                    },
                },
                (err) => {
                    if (err) throw err;
                    else {
                        postModel.find({}, (err, data) => {
                            if (err) throw err;
                            else {
                                io.emit("chat message", data);
                                console.log(data)
                            }
                        });
                        console.log("updated");
                    }
                }
            );
        });
    });
}
connectDB()

const postRoutes = require('./routes/socketRoutes');
app.use("/api/socket/", postRoutes);

httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`Work on *:${port}`)
})