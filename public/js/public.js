console.log('Público HTML')


async function getLastWorkingOnTickets(){
    const response = await fetch('/api/tickets/working-on')
    const tickets = await response.json()
    drawTicketsOnScreen(tickets)
}

function drawTicketsOnScreen(tickets = []) {
    if(tickets.length === 0) return

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];

        const lblTicket = document.querySelector(`#lbl-ticket-0${i+1}`)
        const lblDesk = document.querySelector(`#lbl-desk-0${i+1}`)
        
        lblTicket.innerText = 'Ticket ' + ticket.number
        lblDesk.innerText = ticket.handledAtDesk
        
    }

    console.log(tickets)
}


function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      const {type,payload} = JSON.parse( event.data );
      if(type !== "on-working-on-tickets-changed") return;
      drawTicketsOnScreen(payload);

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
  
connectToWebSockets();
getLastWorkingOnTickets()