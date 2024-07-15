export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handledAtDesk?: string; // escritorio 1, escritorio 2, etc..
    handledAt?: Date; // hora a la que alguien tomo el ticket
    done: boolean;
}