const { WebSocketServer } = require("ws")

const server = new WebSocketServer({ port: 4000 });

server.on("connection", (socket) => {
  socket.send(JSON.stringify({
    instrumentId:"1234",
    metadata:"instrument",
    price:1254,
    lastPrice:14587,
    volume:255555,
    name: "Something"
  }));

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);
    socket.send(JSON.stringify(packet));
  });
});