import { ticketsService } from "../repository/index.js"

class TicketController {
  async createTicket(ticket) {
    const result = ticketsService.createTicket(ticket);
    return result;
  }
}

export const ticketController = new TicketController();
