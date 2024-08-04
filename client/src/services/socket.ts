import { io } from 'socket.io-client';
import { SERVER_URL } from '~/config';

const URL = SERVER_URL;
export const socket = io(URL, {
  autoConnect: false, // Disable auto connect
});
