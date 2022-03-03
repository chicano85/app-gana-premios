import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, content: '', type: 'success' };

const messageSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const { isOpen, content, type } = action.payload;
      state.isOpen = isOpen;
      state.content = content;
      state.type = type;
    },
    hideMessage: (state) => {
      state.isOpen = false;
    },
    clearMessage: (state) => {
      state.content = '';
    }
  }
});

const { reducer, actions } = messageSlice;

export const { setMessage, hideMessage, clearMessage } = actions;

export default reducer;
