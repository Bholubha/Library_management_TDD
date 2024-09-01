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

    // checking ISBN is valid or not
    test('should throw an error if ISBN is not in valid format',()=>{
        expect(()=> addBookHelperInstance.addBook('978-01359570avc',"JavaScript and JQuery","Jon Duckett","2014")).toThrow("Please provide correct ISBN")
    })

    
    // Test for checking copy_count for same books
    test('should track number of same copy of identical book',()=>{
        addBookHelperInstance.addBook('978-1118531648',"JavaScript: The Definitive Guide","David Flanagan","2020")
        addBookHelperInstance.addBook('978-1118531648',"JavaScript: The Definitive Guide","David Flanagan","2020")

        // after adding two identical book copy_count must be 2
        expect(libraryInstance.getAllBooks()['978-1118531648'].copy_count).toBe(2)
    })

    
    // should throw an error if ISBN is already present, but details of book to be added are different from available one in Database
    test('should throw an error if ISBN is already present for different book',()=>{
        addBookHelperInstance.addBook('978-0134757599',"Head First Java","Kathy Sierra, Bert Bates","2005")
        expect(()=> addBookHelperInstance.addBook('978-0134757599',"Mathematics","Ramanujav","2005")).toThrow("Provided ISBN already present for other book")
    })

})

// Unit Test for Borrow book
describe('Borrow Book Testing', () => {
    // Declare all Instance variable which will required..
    let addBookHelperInstance;
    let borrowBookHelperInstance;
    let libraryInstance
    beforeAll(() => {
        libraryInstance = new Library
        addBookHelperInstance = new AddBookHelper(libraryInstance);
        borrowBookHelperInstance = new BorrowBookHelper(libraryInstance);
    });

    // borrowBook method of Helper Class should return Desired Book Object
    test('should return details of book correspond to ISBN',()=>{
        addBookHelperInstance.addBook('978-0134845623',"Python Crash Course","Eric Matthes","2015")
        const response = borrowBookHelperInstance.borrowBook('978-0134845623');
        expect(response).toEqual(new Book('978-0134845623',"Python Crash Course","Eric Matthes","2015"))

    })
})