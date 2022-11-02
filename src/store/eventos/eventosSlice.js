import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  eventos: [],
  isLoading: false,
  activeElement: null,
}

export const eventosSlice = createSlice({
  name: 'eventos',
  initialState,
  reducers: {
    onLoadingEventos: (state) => {
      state.isLoading = true;
    },
    onSetEventos: (state, { payload }) => {
      state.isLoading = false;
      payload.forEach(event => {
        const exist = state.eventos.some(dbEvent => dbEvent.id === event.id);
        if (!exist) {
          state.eventos.push(event);
        }
      })
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeElement = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.eventos.push(payload);
      state.activeElement = null;
    },
    onUpdateElement: (state, { payload }) => {
      state.eventos = state.eventos.map(evento => {
        if (evento.id === payload.id) {
          return payload;
        }
        return evento;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeElement) {
        state.eventos = state.eventos.filter(evento => evento.id !== state.activeElement.id);
      }
    }
  }
});

export const { onLoadingEventos, onSetEventos, onSetActiveEvent, onAddNewEvent, onUpdateElement, onDeleteEvent } = eventosSlice.actions

