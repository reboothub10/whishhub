class UserModel {
    constructor(user) {
      this.username = user.username || '';
      this.email = user.email || '';
      this.password = user.password || '';
      this.gender =  user.gender || 'female';
      this.industry =  user.industry || 'IT';
      this.age_group =  user.gender || '18-24';
    }
  }
  export default UserModel;