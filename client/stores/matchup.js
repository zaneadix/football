import { create } from 'zustand';
import { produce } from 'immer';
import { io } from 'socket.io-client';
import _set from 'lodash/set';

import { SOCKET_EVENTS } from '@shared/constants';

const { CONNECT, MATCHUP_SUBSCRIBE, MATCHUP_UPDATE } =
  SOCKET_EVENTS;

const useMatchupStore = create((set, get) => ({
  matchup: null,
  socket: null,
  initializeMatchup: async (matchup) => {
    let socket = get().socket;

    if (!socket) {
      await fetch(`/api/io`);
      socket = io();

      socket.on(CONNECT, () => {
        console.log(
          'connected. subscribing to',
          matchup._id
        );
        socket.emit(MATCHUP_SUBSCRIBE, matchup._id);
      });

      socket.on(MATCHUP_UPDATE, (update) => {
        get().updateMatchup(update);
      });
    }

    set({ matchup, socket });
  },
  haltMatchup: () => {
    get().socket?.disconnect();
  },
  updateMatchup: (update) => {
    set(
      produce((state) => {
        Object.entries(update).forEach(([key, value]) => {
          _set(state.matchup, key, value);
        });
      })
    );
  },
}));

export default useMatchupStore;
