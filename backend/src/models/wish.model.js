class WishModel {
  constructor(wish) {
    this.title = wish.title;
    this.content = wish.content;
    this.user_id = wish.user_id;
    this.wishgroup_id = wish.wishgroup_id;
  }
}
export default WishModel;