const ip_room = document.getElementById('room');
const btn_join = document.getElementById('btn_join');

const ip_message = document.getElementById('ip_message');
const btn_send = document.getElementById('btn_send');

const ul_message = document.getElementById('ul_message');
let socket = io.connect();

let my_name = localStorage.getItem('username');
socket.on('connect', function (data) {
  console.log(data);
});

btn_join.addEventListener('click', () => {
  const room = ip_room.value;
  socket.emit('join', room);
  alert('joined room: ' + room);
});
const sendMessage = () => {
  const message = ip_message.value;
  if (!message) {
    return;
  }
  const user = {
    name: my_name,
    message: message,
  };
  socket.emit('message', JSON.stringify(user));
  ip_message.value = '';
  ip_message.focus();
};
btn_send.addEventListener('click', () => sendMessage());

ip_message.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

socket.on('thread', function (data) {
  const obj = JSON.parse(data);
  const li = document.createElement('li');
  li.classList.add('my-message', 'message');
  li.innerHTML = obj.message;
  if (obj.name === my_name) {
    li.classList.add('guest-message', 'message', 'guest');
  }
  ul_message.appendChild(li);

  ul_message.scrollTop = ul_message.scrollHeight;
});
