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

// Helper class for adding book
class AddBookHelper {
    // binding class with particular library through Library's instance
    constructor(libraryInstance) {
        this.library = libraryInstance;
    }

    addBook(ISBN, title, author, publication_year) {

        // All params have value
        if (!ISBN || !title || !author || !publication_year) {
            throw new Error('Please provide enough informations');
        }

        // ISBN should contains number and '-' only
        const regex = /^[-\d]+$/;
        if(!regex.test(ISBN)) throw new Error('Please provide correct ISBN');
        
        const books = this.library._getBooksReference()
        const book = new Book(ISBN, title, author, publication_year);

        // If book already present with same ISBN in Database then it must be same as given in input.[ for uniqueness of ISBN ]
        if (books[ISBN] !== undefined) {
            if (JSON.stringify(books[ISBN].bookDetails) !== JSON.stringify(book)) {
                throw new Error("Provided ISBN already present for other book");
            }
        }

        // Initialize object for new book with appropriate value       
            if (books[ISBN] === undefined) {
                books[ISBN] = {
                    bookDetails: book, // store book object as bookDetails property
                    copy_count: 0
                };
            }

        // increment copy_count for tracking number of identical books
        books[ISBN].copy_count += 1;
        return "Book stored successfully"
    }    

}

// Helper Class for Borrow Book
class BorrowBookHelper {

    // binding class with particular library through Library's instance
    constructor(libraryInstance) {
        this.library = libraryInstance;
    }

    borrowBook(ISBN) {
        // access all books by reference
        const books = this.library._getBooksReference();

        // If book is not present in Database then throw an error
        if (books[ISBN] === undefined) {
            throw new Error('Book is not present in the database with this ISBN');
        }

        // If copy_count = 0 then throw Error - Book is currently unavailable
        if (books[ISBN].copy_count === 0) {
            throw new Error('Book is currently unavailable');
        }

        books[ISBN].copy_count -= 1;

        // return copy of book object (not reference) by using spread operator.
        return { ...books[ISBN].bookDetails };
    }  
    
}

// Helper class for return book
class ReturnBookHelper {

    // binding class with particular library through Library's instance
    constructor(libraryInstance) {
        this.library = libraryInstance;
    }

    returnBook(ISBN) {
        // access BOOKS by reference
        const books = this.library._getBooksReference();
        
        // Increment copy_count 
        books[ISBN].copy_count += 1;

        return "Book returned successfully";
    }

}
module.exports = {Library, AddBookHelper, BorrowBookHelper,ReturnBookHelper}