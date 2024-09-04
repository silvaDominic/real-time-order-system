import { io, Socket } from 'socket.io-client';

const serverUrl: string = 'http://localhost:4000';

export const SocketService = {
  socket: null as Socket | null,

  connect() {
    if (!this.socket) {
      this.socket = io(serverUrl);
      this.socket.on('connect', () => {
        console.log('Connecting to server...');
      });
      this.socket.on('disconnect', () => {
        console.log('Disconnecting from server...');
      });
      this.socket.on('error', (error: Error) => {
        console.error('Error:', error);
      });
    }
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  },
};
