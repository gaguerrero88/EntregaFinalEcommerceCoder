

export class TicketsRepository {

  constructor (dao){
    this.dao = dao
  }

  async createTicket (ticket) {
  const result= await this.dao.createTicket (ticket)
  return result
}


}


