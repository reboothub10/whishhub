class UserModel {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.age_group = user.age_group;
    this.gender = user.gender;
    this.industry = user.industry;
    this.password = user.password;
    this.userType=user.userType;
  }
}
export default UserModel;