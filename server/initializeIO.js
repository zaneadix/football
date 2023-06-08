import { Server } from "socket.io";
import { SOCKET_EVENTS } from "@shared/constants";
import Matchup from "@models/Matchup";

const initializeIO = (server) => {
  const io = new Server(server);
  const matchupStream = Matchup.watch();

  io.on("connection", (socket) => {
    socket.on(
      SOCKET_EVENTS.MATCHUP_SUBSCRIBE,
      (matchupId) => {
        socket.join(matchupId);
      }
    );
  });

  matchupStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "update") {
      const matchupId = change.documentKey._id.toString();
      const { updatedFields } = change.updateDescription;
      io.to(matchupId).emit(
        SOCKET_EVENTS.MATCHUP_UPDATE,
        updatedFields
      );
    }
  });

  return io;
};

export default initializeIO;
