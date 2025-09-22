import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type Role = 'user' | 'assistant' | 'system';

export type Message = {
  id: string;
  role: Role;
  text: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  loading?: boolean;
  typing?: boolean;
};

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    newChat: {
      reducer(state, action: PayloadAction<Chat>) {
        state.chats.unshift(action.payload);
        state.activeChatId = action.payload.id;
      },
      prepare(title?: string) {
        const id = nanoid();
        return {
          payload: {
            id,
            title: title || 'New chat',
            messages: [],
            loading: false,
            typing: false,
          } as Chat,
        };
      },
    },
    addMessageToChat: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) chat.messages.push(message);
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    setChatLoading: (state, action: PayloadAction<{ chatId: string; loading: boolean }>) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) chat.loading = action.payload.loading;
    },
    setChatTyping: (state, action: PayloadAction<{ chatId: string; typing: boolean }>) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) chat.typing = action.payload.typing;
    },
  },
});

export const { newChat, addMessageToChat, setActiveChat, setChatLoading, setChatTyping } = chatSlice.actions;
export default chatSlice.reducer;
