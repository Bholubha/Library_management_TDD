const {Library,AddBookHelper} = require('../Library')

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

})