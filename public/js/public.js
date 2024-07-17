console.log('Público HTML')

let tickets = []

async function getLastWorkingOnTickets(){
    const response = await fetch('/api/tickets/working-on')
    tickets = await response.json()
    drawTicketsOnScreen()
}

function drawTicketsOnScreen() {
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
getLastWorkingOnTickets()