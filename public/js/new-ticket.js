const currentTicketLbl = document.getElementById('lbl-new-ticket');
const createTicketButton = document.querySelector('button');

console.log('Nuevo Ticket HTML');

async function getLastTicket() {
    const response = await fetch('/api/tickets/last');
    const lastTicket = await response.json();
    currentTicketLbl.innerText = `Ticket ${lastTicket}`
}

getLastTicket();

createTicketButton.addEventListener('click', async () => {
    const response = await fetch('/api/tickets', {
        method: 'POST'
    });
    const ticket = await response.json();
    console.log(ticket);
    currentTicketLbl.innerText = `Ticket ${ticket.number}`;
})
