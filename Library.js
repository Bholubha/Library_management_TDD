const Book = require('./Book')

class Library {
      // Declare #BOOKS as a private field
      #BOOKS = {};

      // Method to get all books (return copy of BOOKS)
      getAllBooks() {
        return { ...this.#BOOKS }
      }

      // Method for get and set all books (used internally by helpers so return reference)      
      _getBooksReference() {
        return this.#BOOKS;
     }
    
}

// class for adding book
class AddBookHelper {
    // binding class with particular library through library's instance
    constructor(libraryInstance) {
        this.library = libraryInstance;
    }

    addBook(ISBN, title, author, publication_year) {

        const books = this.library._getBooksReference()
        const book = new Book(ISBN, title, author, publication_year);
        books[ISBN] = {}
        books[ISBN].bookDetails = book
        return "Book stored successfully"
    }    

}    

module.exports = {Library, AddBookHelper}