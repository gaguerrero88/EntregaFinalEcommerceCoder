


export class UserRepository {
  constructor (dao){
    this.dao = dao
  }
    async createUser(userInfo) {
        const result = await this.dao.createUser(userInfo);
        return result;
      }

      async getUsers() {
        const result = await this.dao.getUsers();
        return result;
      }
    
      async getUserById(userId) {
        const result = await this.dao.getUserById(userId);
        return result;
      }
    
      async getUserByEmail(email) {
        const result = await this.dao.getUserByEmail(email);
        return result;
      }
    
      async updateUserById(userId, user) {
        const result = await this.dao.updateUserById(userId, user);
        return result;
      }

      async deleteInactiveUser (id){
        const result = await this.dao.deleteInactiveUser(id)
        return result
      }
}