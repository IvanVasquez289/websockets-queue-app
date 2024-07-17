"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const uuid_adapter_1 = require("../../config/uuid-adapter");
const wss_service_1 = require("./wss-service");
class TicketService {
    constructor(wssService = wss_service_1.WssService.instance) {
        this.wssService = wssService;
        this._tickets = [
            { id: uuid_adapter_1.UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
            { id: uuid_adapter_1.UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
            { id: uuid_adapter_1.UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
            { id: uuid_adapter_1.UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
            { id: uuid_adapter_1.UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
        ];
        this.workingOnTickets = [];
    }
    get last4WorkingOnTickets() {
        return this.workingOnTickets.slice(0, 4);
    }
    get pendingTickets() {
        return this._tickets.filter(ticket => !ticket.handledAtDesk);
    }
    get lastTicketNumber() {
        return this._tickets.length > 0 ? this._tickets.at(-1).number : 0;
    }
    createTicket() {
        const ticket = {
            id: uuid_adapter_1.UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createdAt: new Date(),
            handledAtDesk: undefined,
            handledAt: undefined,
            done: false
        };
        this._tickets.push(ticket);
        //TODO: WS
        this.onTicketCountChanged();
        return ticket;
    }
    drawTicket(desk) {
        const ticket = this._tickets.find(t => !t.handledAtDesk); // obtener el primer ticket que no este atendido
        if (!ticket)
            return { status: 'error', message: 'No hay tickets pendientes' };
        ticket.handledAtDesk = desk;
        ticket.handledAt = new Date();
        this.workingOnTickets.unshift(Object.assign({}, ticket));
        //TODO: WS
        this.onTicketCountChanged();
        this.onWorkingOnTicketsChanged();
        return { status: 'success', ticket };
    }
    ticketFnished(id) {
        const ticket = this._tickets.find(t => t.id === id);
        if (!ticket)
            return { status: 'error', message: 'No se encontro el ticket' };
        this._tickets = this._tickets.map(ticket => {
            if (ticket.id === id) {
                ticket.done = true;
            }
            return ticket;
        });
        return { status: 'success' };
    }
    onTicketCountChanged() {
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
    }
    onWorkingOnTicketsChanged() {
        this.wssService.sendMessage('on-working-on-tickets-changed', this.last4WorkingOnTickets);
    }
}
exports.TicketService = TicketService;
