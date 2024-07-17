"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TicketsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const ticketController = new controller_1.TicketsController();
        router.get('/', ticketController.getTickets);
        router.get('/last', ticketController.getLastTicketNumber);
        router.get('/pending', ticketController.pendingTickets);
        router.post('/', ticketController.createTicket);
        router.get('/draw/:desk', ticketController.drawTicket);
        router.put('/done/:ticketId', ticketController.ticketFinished);
        router.get('/working-on', ticketController.workingOn);
        return router;
    }
}
exports.TicketsRoutes = TicketsRoutes;
