import { ticketsModel } from "./models/tickets.model.js";

export class TicketManager {
  constructor() {
    this.model = ticketsModel;
  }

  async createTicket(ticket) {
    const newTicket = await this.model.create(ticket);
    return newTicket;
  }
}
