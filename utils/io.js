module.exports = function (io) {
  // All io Codes are here
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
