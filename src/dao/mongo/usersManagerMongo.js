import { UsersModel } from "./models/users.model.js";

export class UserManager {
    constructor (){
        this.model = UsersModel
    }

    async createUser(userInfo) {
        const newUser = await this.model.create(userInfo);
        return newUser;
      }
    
      async getUserById(userId) {
        const user = await this.model.findById(userId);
        return user;
      }

      async getUsers() {
        const user = await this.model.find();
        return user;
      }
    
      async getUserByEmail(email) {
        const user = await this.model.findOne({ email: email });
        return user;
      }
    
      async updateUserById(userId, user) {
        const userUpdate = await this.model.findByIdAndUpdate(userId, user);
        return userUpdate;
      }

      async deleteInactiveUser (id){
        const result = await this.model.findByIdAndDelete (id)
        return result
      }

}