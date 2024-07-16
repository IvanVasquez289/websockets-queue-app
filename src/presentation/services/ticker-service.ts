import { UuidAdapter } from "../../config/uuid-adapter";
import { Ticket } from "../../domain/interfaces/ticket";

export class TicketService {

    public readonly _tickets: Ticket[] = [
        {id: UuidAdapter.v4(), number:1 ,createdAt: new Date(), done: false},
        {id: UuidAdapter.v4(), number:2 ,createdAt: new Date(), done: false},
        {id: UuidAdapter.v4(), number:3 ,createdAt: new Date(), done: false},
        {id: UuidAdapter.v4(), number:4 ,createdAt: new Date(), done: false},
        {id: UuidAdapter.v4(), number:5 ,createdAt: new Date(), done: false},
    ]


    private readonly workingOnTickets: Ticket[] = [] 

    public get last4WorkingOnTickets(): Ticket[] {
        return this.workingOnTickets.slice(0, 4)
    }
 
    public get pendingTickets(): Ticket[] {
        return this._tickets.filter(ticket => !ticket.handledAtDesk)
    }

    public get lastTicketNumber(): number {
        return this._tickets.length > 0 ? this._tickets.at(-1)!.number : 0
    }

    public createTicket(): Ticket {
        const ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createdAt: new Date(),
            handledAtDesk: undefined,
            handledAt: undefined,
            done: false
        }

        this._tickets.push(ticket)
        //TODO: WS

        return ticket
    }

    public drawTicket(desk: string) {
        const ticket = this._tickets.find(t => !t.handledAtDesk) // obtener el primer ticket que no este atendido
        if(!ticket) return {status: 'error', message: 'No hay tickets pendientes'}

        
        ticket.handledAtDesk = desk
        ticket.handledAt = new Date()
        
        this.workingOnTickets.unshift({...ticket})

        //TODO: WS

        return {status: 'success', ticket}   
    }

    public ticketFnished(id: string){
        const ticket = this._tickets.find(t => t.id === id)
        if(!ticket) return {status: 'error', message: 'No se encontro el ticket'}

        this._tickets.map(ticket => {
            if(ticket.id === id){
                ticket.done = true
            }
            return ticket
        })

        return {status: 'success'}
    }
}   