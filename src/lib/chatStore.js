import { create } from "zustand";
import useUserStore from "./userStore";

const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if the current user is blocked by the user they are chatting with
    if (user.blocked.includes(currentUser.id)) {
      return set({        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if the current user has blocked the user they are chatting with
    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    // Update chat if no blocking conditions are met
    set({
      chatId,
      user: user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  toggleReceiverBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));

export default useChatStore;
