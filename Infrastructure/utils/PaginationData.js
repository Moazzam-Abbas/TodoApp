export default class PaginationData {
  constructor(paginationOptions, itemCount) {
    this.paginationOptions = paginationOptions;
    this.itemCount = itemCount;
   // this.items = [];
  }

  totalPages() {
    return Math.ceil(this.itemCount , this.paginationOptions.limit());
  }

  //addItem(item) {
  //  this.items.push(item);
  //}

  hasNext() {
    return this.paginationOptions.getCurrentPage() < this.totalPages();
  }

  nextPage() {
    return this.paginationOptions.getCurrentPage() + 1;
  }

  hasPrev() {
    return this.paginationOptions.getCurrentPage() > 1;
  }

  prevPage() {
    return this.paginationOptions.getCurrentPage() - 1;
  }

  getPaginatedInfo() {
    const paginationInfo = {
      itemCount: this.itemCount,
      totalPages: this.totalPages(),
      currentPage: this.paginationOptions.getCurrentPage(),
      perPage: this.paginationOptions.limit(),
      nextPage: this.hasNext() ? this.nextPage() : null,
      prevPage: this.hasPrev() ? this.prevPage() : null
    };

    return paginationInfo
  }

}
