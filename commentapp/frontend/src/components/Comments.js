import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Navs from './Navs';

var socket = io('http://localhost:9999', { transports: ['websocket'] });

export default function Comments() {
  useEffect(() => {
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    var messages = document.getElementById('messages');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (input.value) {
        console.log(input.value)


        socket.emit('message', input.value);

        input.value = '';
      }
    });
    let chats = []
    socket.on("render msg", function (data) {
      for (let i = 0; i < data.length; i++) {
        chats[i] = `<li>${data[i].comments}</li>`
      }
      console.log(chats);
      messages.innerHTML = chats
    })
    socket.on('chat message', function (msg) {
      var item = document.createElement('li');
      item.style.marginTop = "15px"
      item.textContent = msg;
      messages.appendChild(item);
    });
  }, [])
  return (
    <>
      <div className='chats text-center '>
        <Navs />
        <div className='col-6 container'>
          <p id="messages" className="pt-4"></p>
          <form id="form" action="" className="mt-4">
            <textarea id="input" autoComplete="off" rows="3" cols="60" /><br />
            <button href="/dashboard" to="/dashboard" className="mt-3 btn btn-dark">COMMENTS</button>

          </form>
        </div>
      </div>
    </>
  )
}
