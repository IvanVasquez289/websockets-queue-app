"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WssService = void 0;
const ws_1 = require("ws");
class WssService {
    constructor(options) {
        const { server, path = '/ws' } = options; // localhost:3000/ws
        this.wss = new ws_1.WebSocketServer({ server, path });
        this.start();
    }
    static initWss(options) {
        if (WssService._instance)
            throw new Error('WssService already initialized');
        WssService._instance = new WssService(options);
    }
    static get instance() {
        if (!WssService._instance)
            throw new Error('WssService not initialized');
        return WssService._instance;
    }
    start() {
        this.wss.on('connection', (ws) => {
            console.log('client connected');
            ws.on('close', () => {
                console.log('client disconnected');
            });
        });
    }
    sendMessage(type, payload) {
        this.wss.clients.forEach(client => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify({ type, payload }));
            }
        });
    }
}
exports.WssService = WssService;
