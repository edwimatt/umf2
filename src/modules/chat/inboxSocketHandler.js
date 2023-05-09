import SocketIO, { EVENTS } from "../SocketIO";

export const emitLoadRecentChats = (user, cbUserChats) => {
  SocketIO.getInstance().emit(
    EVENTS.LOAD_RECENT_CHAT,
    {
      user_id: user.id,
    },
    (data) => {
      cbUserChats && cbUserChats(data);
    }
  );
};

export const emitDeleteChatThread = (payload, cbOnThreadDeleted) => {
  SocketIO.getInstance().emit(EVENTS.DELETE_CHAT_THREAD, payload, (res) => {
    cbOnThreadDeleted && cbOnThreadDeleted(res);
  });
};
