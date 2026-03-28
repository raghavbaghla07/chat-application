import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();
  function sendMessage() {
    //whenever this app component mounts, then i want to create persistent websocket sever
    // not on every render
    if (!socket) return;

    const message = inputRef.current.value;
    //@ts-ignore
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <input ref={inputRef} type="text" placeholder="message"></input>
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default App;
