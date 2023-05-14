let socket = io();
let userName;

Swal.fire({
  title: "Write your name",
  input: "text",
  inputValidator: (value) => !value && "please write your name",
  allowOutsideClick: false,
}).then((res) => {
  userName = res.value;
  document.getElementById("username").innerHTML = userName;
  socket.emit("auth", userName);
});

let chatbox = document.getElementById("chatBox");
chatbox.addEventListener("keyup", send);

const send = (e) => {
  if (e.key === "Enter") {
    socket.emit("new_message", { userName, message: chatbox.value });
  }
};

socket.on("all_messages", (data) => {
  document.getElementById("messages").innerHTML = data
    .map((message) => `<br><b>${message.userName}</b>: ${message.message}`)
    .join("");
});
