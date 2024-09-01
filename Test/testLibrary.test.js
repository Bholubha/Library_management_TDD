const {Library,AddBookHelper} = require('../Library')
const Book = require('../Book')

// Unit Test for Adding book
describe('Add Book Testing', () => {

    // addBookHelper is Class for performing addBook operation to particular library, declare addBookHelperInstance for storing instance of it.make instance of Libray also.
    let addBookHelperInstance
    let libraryInstance

    beforeAll(() => {
        libraryInstance = new Library
        // pass instance of Library in constructor so book get added in desired library.
        addBookHelperInstance = new AddBookHelper(libraryInstance)
    });

    test('should return successfull message of adding book', () => {
        const message = addBookHelperInstance.addBook('978-0135166307',"Effective Java","Joshua Bloch","2018")
        // addBook should return message of type string, if book added successfully
        expect(message).toBe("Book stored successfully")
    });

    // testing that book actually store in Database
    test('should store book in Database',()=>{
        addBookHelperInstance.addBook('978-0596805524',"JavaScript: The Good Parts","Douglas Crockford","2008")
        
        // libraryInstance.getAllBooks should return all books present in database as 'Object'
        // now check book with particular ISBN was define or undefine
        expect(libraryInstance.getAllBooks()['978-0596805524']).toBeDefined()

        // if define then also match the bookDetails(object of 'Book') with expected object of 'Book'
        expect(libraryInstance.getAllBooks()['978-0596805524'].bookDetails).toEqual(new Book('978-0596805524',"JavaScript: The Good Parts","Douglas Crockford","2008"))

    })

     // all information must be provided about book
     test('should throw an error if enough information about book was NOT provided',()=>{        
        expect(()=> addBookHelperInstance.addBook('978-0134685991',"Java: The Complete Reference")).toThrow("Please provide enough informations")
    })


})