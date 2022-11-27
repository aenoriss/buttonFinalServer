const app = require("express")();
const appWs = require("express-ws")(app);

const port = process.env.PORT || 3000;

app.ws("/echo", ws => {
    ws.on("message", msg => {
        console.log("Received from client: ", msg);
        ws.send(msg);
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}!`)
})
