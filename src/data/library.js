export class Library {
    constructor() {
        this.books = [];
    }
    addBook (book) {
      this.books.push(book);
    }
    getAllBooks () {
        return this.books;
    }
    getBooksByPages (minPages, maxPages){
        return this.books.filter(book => book.pages>=minPages && book.pages<maxPages);
    }
    getAuthorBooks (author) {
        return this.books.filter(book => book.author === author);
    }
}