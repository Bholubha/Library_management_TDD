const {Library,AddBookHelper,BorrowBookHelper,ReturnBookHelper,ViewBooksHelper} = require('../Library')
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

    // testing copy_count field 
    test('should decrement copy_count of book',()=>{
        addBookHelperInstance.addBook('978-0133379937',"Programming in C","Stephen G. Kochan","2004")
        borrowBookHelperInstance.borrowBook('978-0133379937');
        // copy_count must be zero after borrowing this book
        expect(libraryInstance.getAllBooks()['978-0133379937'].copy_count).toBe(0)
    })

    // throw an error if book is not present in Database
    test('should throw an error if book is not present in Database with provided ISBN',()=>{
        expect(()=>borrowBookHelperInstance.borrowBook('978-0201616224')).toThrow('Book is not present in the database with this ISBN')
    })

    // throw an error if book is currently unavailable
    test('should throw an error if book is  currently unavailable',()=>{
        addBookHelperInstance.addBook('978-0321563842',"Effective C++","Scott Meyers","2005");
        borrowBookHelperInstance.borrowBook('978-0321563842')
        expect(()=>borrowBookHelperInstance.borrowBook('978-0321563842')).toThrow('Book is currently unavailable')
    })

})

// Unit test for Return Book
describe('Return Book Testing',()=>{
    // Declare all Instance variable which will required..
    let addBookHelperInstance;
    let borrowBookHelperInstance;
    let returnBookHelperInstance
    let libraryInstance
    beforeAll(() => {
        libraryInstance = new Library
        addBookHelperInstance = new AddBookHelper(libraryInstance);
        borrowBookHelperInstance = new BorrowBookHelper(libraryInstance);
        returnBookHelperInstance = new ReturnBookHelper(libraryInstance)
    });

    // First test expect success message of returning book only
    test('should return successfull message of returning book',()=>{

        addBookHelperInstance.addBook('978-1449355739',"Learning Python","Mark Lutz","2013");
        borrowBookHelperInstance.borrowBook('978-1449355739')
        const message = returnBookHelperInstance.returnBook('978-1449355739')
        expect(message).toBe("Book returned successfully")

    })

    // After returning book copy_count should be increased
    test('should increment copy_count of book in Database',()=>{

        addBookHelperInstance.addBook('978-0132354165',"Effective Modern C++","Scott Meyers","2014");
        borrowBookHelperInstance.borrowBook('978-0132354165')
        returnBookHelperInstance.returnBook('978-0132354165')
        // tested that copy_count decrement by borrowBook, so now it increment by returnBook also.
        expect(libraryInstance.getAllBooks()['978-0132354165'].copy_count).toBe(1)

    })

    // throw error if book which user want to return is not in Database.
    test('should throw an error if book is not present in Database with provided ISBN',()=>{
        expect(()=>returnBookHelperInstance.returnBook('123456')).toThrow("There is no record of the provided ISBN")
    })

})

// Unit-test for View Books
describe('View Books Testing',()=>{

    // Declare all Instance variable which will required..
    let libraryInstance
    let addBookHelperInstance;
    let borrowBookHelperInstance;
    let returnBookHelperInstance
    let viewBooksHelperInstance
    beforeAll(() => {
        libraryInstance = new Library
        addBookHelperInstance = new AddBookHelper(libraryInstance)
        borrowBookHelperInstance = new BorrowBookHelper(libraryInstance)
        returnBookHelperInstance = new ReturnBookHelper(libraryInstance)
        viewBooksHelperInstance = new ViewBooksHelper(libraryInstance)
    });

    // viewBooks should return an empty array when there is not any books
    test('should return empty array for instance of Library which not contains any books',()=>{
        let books =  viewBooksHelperInstance.viewBooks()
        expect(books).toEqual([])
    })

    // testing that viewBook remain consistent after applying add, borrow and return as well.
    test('should return available books after applying add,borrow and return',()=>{
        
        // add two books
        addBookHelperInstance.addBook('978-0134754499',"Automate the Boring Stuff with Python","Al Sweigart","2015")
        addBookHelperInstance.addBook('978-0132354165',"Effective Modern C++","Scott Meyers","2014")

        let books =  viewBooksHelperInstance.viewBooks()
        // viewBook should return array of object(type 'Book') of 2 books
        let expected_books = [new Book('978-0134754499',"Automate the Boring Stuff with Python","Al Sweigart","2015"), new Book('978-0132354165',"Effective Modern C++","Scott Meyers","2014")]

        expect(books).toEqual(expected_books)

        // borrow one book
        borrowBookHelperInstance.borrowBook('978-0132354165')
        books =  viewBooksHelperInstance.viewBooks()
        // After borrowing viewBook should return only one object(type 'Book') of book
        expected_books = [new Book('978-0134754499',"Automate the Boring Stuff with Python","Al Sweigart","2015")]
        expect(books).toEqual(expected_books)

        // return borrowed book
        returnBookHelperInstance.returnBook('978-0132354165')
        books =  viewBooksHelperInstance.viewBooks()
        // After return book viewBook should again return array of object(type 'Book') of 2 books
        expected_books = [new Book('978-0134754499',"Automate the Boring Stuff with Python","Al Sweigart","2015"), new Book('978-0132354165',"Effective Modern C++","Scott Meyers","2014")]
        expect(books).toEqual(expected_books)

    })
})