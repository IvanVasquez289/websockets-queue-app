const lblPending = document.querySelector('#lbl-pending');

console.log('Escritorio HTML');

async function getPendingTickets() {
    const response = await fetch('/api/tickets/pending');
    const tickets = await response.json();
    lblPending.innerText = tickets.length;
}
function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      //console.log(event.data);
      const {type,payload} = JSON.parse( event.data );
      if(type !== "on-ticket-count-changed") return;
      lblPending.innerText = payload;
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
    };
  
  }
  


getPendingTickets()
connectToWebSockets();