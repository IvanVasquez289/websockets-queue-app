



const lblPending = document.querySelector('#lbl-pending');
const desklbl = document.querySelector('h1');
const alertDiv = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
  window.location = 'index.html'
}

const desk = searchParams.get('escritorio');
desklbl.innerText = desk

function checkTicketCount(currentCount = 0){
  
  if(currentCount === 0) {
    alertDiv.classList.remove('d-none');
    lblPending.classList.add('d-none');

  }else{
    alertDiv.classList.add('d-none');
    lblPending.classList.remove('d-none');
    lblPending.innerText = currentCount;
  }

}

async function getPendingTickets() {
    const response = await fetch('/api/tickets/pending');
    const tickets = await response.json();
    checkTicketCount(tickets.length);
}

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      //console.log(event.data);
      const {type,payload} = JSON.parse( event.data );
      if(type !== "on-ticket-count-changed") return;
      console.log(payload)
      checkTicketCount(payload);
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
      getPendingTickets();
    };
  
  }
  


getPendingTickets()
connectToWebSockets();