import { io } from 'socket.io-client';

const URL = 'http://localhost:8765';

const socket = io(URL);

export default socket