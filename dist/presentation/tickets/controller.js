"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const ticker_service_1 = require("../services/ticker-service");
class TicketsController {
    constructor(ticketService = new ticker_service_1.TicketService()) {
        this.ticketService = ticketService;
        this.getTickets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(this.ticketService._tickets);
        });
        this.getLastTicketNumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(this.ticketService.lastTicketNumber);
        });
        this.pendingTickets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(this.ticketService.pendingTickets);
        });
        this.createTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(201).json(this.ticketService.createTicket());
        });
        this.drawTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { desk } = req.params;
            res.json(this.ticketService.drawTicket(desk));
        });
        this.ticketFinished = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ticketId } = req.params;
            res.json(this.ticketService.ticketFnished(ticketId));
        });
        this.workingOn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(this.ticketService.last4WorkingOnTickets);
        });
    }
}
exports.TicketsController = TicketsController;
