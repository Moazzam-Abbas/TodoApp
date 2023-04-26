export default class PaginationOptions {
  constructor(currentPage = 1, perPage = 20) {
    this.currentPage = currentPage;
    this.perPage = perPage;
  }

  limit() {
    return this.perPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  offset() {
    return (this.currentPage - 1) * this.limit();
  }
}


