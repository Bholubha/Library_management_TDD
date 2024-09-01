
class Library {
  
    
}

// class for adding book
class AddBookHelper {
    // binding class with particular library through library's instance
    constructor(libraryInstance) {
        this.library = libraryInstance;
    }

    addBook(ISBN, title, author, publication_year) {
        return "Book stored successfully"
    }    

}    

module.exports = {Library, AddBookHelper}