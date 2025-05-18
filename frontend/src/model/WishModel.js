class WishModel {
    constructor(wish) {
      this.title = wish.title || '';
      this.content = wish.description || '';
    }
  }
  export default WishModel;