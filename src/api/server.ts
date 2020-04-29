import io from 'socket.io-client';

const socket = io('http://localhost:9000');

export const configureSocket = dispatch => {
    // make sure our socket is connected to the port
    console.log('Все хорошо, просто ждем подключения socket.io');
    socket.on('connect', () => {
        console.log('connected socket.io');
        dispatch({type: 'IS_CONNECTED'})
    });

    socket.on('GET_USERS', (users, callback) => {
            dispatch({type: 'ADD_USERS', payload: users});
            callback && callback();
        }
    );

    socket.on('SEND_MESSAGES', (messages: { name: string, msg: string }[]) => {
        dispatch({type: 'SET_MESSAGES', payload: messages})
    });
};

export const registerUser = (user, callback) => socket.emit('SEND_USER', user, callback);
export const sendMessage = (props: { name: string, msg: string }) => socket.emit('SEND_MSG', props);
export const logout = (name) => socket.emit("LOGOUT", name);