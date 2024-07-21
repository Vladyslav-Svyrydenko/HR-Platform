




const connectWebSocket = (io) => {
      
    io.on("connection", (socket) => {

      console.log(socket.id);
      console.log("Waiting for Room");

      socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
      });

      socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
      });

      socket.on("disconnect", () => {
        console.log("CHAT OVER");
      });

    });
  };
  
  module.exports = {
    connectWebSocket,
  };