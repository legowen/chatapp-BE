module.exports = function (io) {
  // All io Codes are here
  io.on("Connection", async (socket) => {
    console.log("Client is connected", socket.id);
  });
};
