const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = function (io) {
  // All io Codes are here
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      // Save User Info
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        //Find User with socket.id
        const user = await userController.checkUser(socket.id);
        // SaveMessage function(User)
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
