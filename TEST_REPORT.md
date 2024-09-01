# Add Book Unit-Test
   > ###  1. First Test for checking message of successfully adding book

```javascript
   test('should return successfull message of adding book', () => {
        const message = addBookHelperInstance.addBook('978-0135166307',"Effective Java","Joshua Bloch","2018")
        // addBook should return message of type string, if book added successfully
        expect(message).toBe("Book stored successfully")
    });
```
#### addBook should return suceess message of adding book

![image](https://github.com/user-attachments/assets/dde5b0f6-fa47-456c-a0a2-624528926154)

#### Create Library Class and AddBookHelper Class, implement addBook method.

![image](https://github.com/user-attachments/assets/a5954cf2-a372-430c-a10b-6f6093b8d5f2)

   > ###  2. Test for testing presence of book in Database.

```javascript
test('should store book in Database',()=>{
        addBookHelperInstance.addBook('978-0596805524',"JavaScript: The Good Parts","Douglas Crockford","2008")
        
        // libraryInstance.getAllBooks should return all books present in database as 'Object'
        // now check book with particular ISBN was define or undefine
        expect(libraryInstance.getAllBooks()['978-0596805524']).toBeDefined()

        // if define then also match the bookDetails(object of 'Book') with expected object of 'Book'
        expect(libraryInstance.getAllBooks()['978-0596805524'].bookDetails).toEqual(new Book('978-0596805524',"JavaScript: The Good Parts","Douglas Crockford","2008"))

    })
```
#### Added book must be present in Database

![image](https://github.com/user-attachments/assets/1408ef36-f44d-4313-8c54-39341e242f33)

#### Adding code in addBook method for storing book in 'BOOKS' object of Library

![image](https://github.com/user-attachments/assets/10d0d97f-028f-4b47-98b1-6b903df7179a)

   > ###  3. All information about book must provided. ( ISBN, title, author, publication_year must provided )

```javascript
     test('should throw an error if enough information about book was NOT provided',()=>{        
        expect(()=> addBookHelperInstance.addBook('978-0134685991',"Java: The Complete Reference")).toThrow("Please provide enough informations")
    })
```

#### If any field of book is not provided while adding book then throw an error.

![image](https://github.com/user-attachments/assets/28991836-b766-4dd5-a358-6c74b26f33d6)

#### Add check and if any field have not value then throw an error from addBook method of AddBookHelper Class

![image](https://github.com/user-attachments/assets/74e034da-2ebd-4499-b6e6-11b1253fc959)

   > ###  4. Test format of ISBN

```javascript
    test('should throw an error if ISBN is not in valid format',()=>{
        expect(()=> addBookHelperInstance.addBook('978-01359570avc',"JavaScript and JQuery","Jon Duckett","2014")).toThrow("Please provide correct ISBN")
    })
```

#### Add test which check that if ISBN is in valid format otherwise throw an error

![image](https://github.com/user-attachments/assets/19c5ab70-8525-47a0-9b63-7dfa0fd62d68)

#### Add code for validate format of ISBN

![image](https://github.com/user-attachments/assets/a56f41a7-c947-406f-a51d-e3bc74e0cc51)

   > ###  5. Test for testing copy_count field of Database which track number of same copy of book.

```javascript
  test('should track number of same copy of identical book',()=>{
        addBookHelperInstance.addBook('978-1118531648',"JavaScript: The Definitive Guide","David Flanagan","2020")
        addBookHelperInstance.addBook('978-1118531648',"JavaScript: The Definitive Guide","David Flanagan","2020")

        // after adding two identical book copy_count must be 2
        expect(libraryInstance.getAllBooks()['978-1118531648'].copy_count).toBe(2)
    })
```

#### Adding two identical book in test so now copy_count should be 2 for that book.

![image](https://github.com/user-attachments/assets/3009d96e-04a0-427e-a8d6-b12da44932b6)

#### Implement logic for tracking count of same books

![image](https://github.com/user-attachments/assets/a9a9e483-efea-4822-8f03-52dc5b052876)

   > ###  6. Test for unique ISBN.

```javascript
    test('should throw an error if ISBN is already present for different book',()=>{
        addBookHelperInstance.addBook('978-0134757599',"Head First Java","Kathy Sierra, Bert Bates","2005")
        expect(()=> addBookHelperInstance.addBook('978-0134757599',"Mathematics","Ramanujav","2005")).toThrow("Provided ISBN already present for other book")
    })
```

#### Should throw an error if ISBN is already present for different book

![image](https://github.com/user-attachments/assets/1d34fd07-327f-42f0-91c6-811efeb62800)

#### Add code in addBook for maintaining uniqueness of ISBN.

![image](https://github.com/user-attachments/assets/ae77494c-7d10-4c72-978b-90bc5c875203)

---
<br>

# Borrow Book Unit-Test
   > ###  1. Add test for checking that borrowBook should return desired Book object
```javascript
    test('should return details of book correspond to ISBN',()=>{
        addBookHelperInstance.addBook('978-0134845623',"Python Crash Course","Eric Matthes","2015")
        const response = borrowBookHelperInstance.borrowBook('978-0134845623');
        expect(response).toEqual(new Book('978-0134845623',"Python Crash Course","Eric Matthes","2015"))

    })
```
#### borrowBook should return Object of Book correspond to ISBN.

![image](https://github.com/user-attachments/assets/364fc61b-ee1f-45c0-8d30-0493b473ba9d)

#### Create BorrowBookHelper and implement borrowBook Method

![image](https://github.com/user-attachments/assets/6b96cb0e-8916-43d2-a0bf-8ecae8fa7932)

   > ###  2. Add test for testing copy_count field after borrow operation
```javascript
    test('should decrement copy_count of book',()=>{
        addBookHelperInstance.addBook('978-0133379937',"Programming in C","Stephen G. Kochan","2004")
        borrowBookHelperInstance.borrowBook('978-0133379937');
        // copy_count must be zero after borrowing this book
        expect(libraryInstance.getAllBooks()['978-0133379937'].copy_count).toBe(0)
    })
```
#### borrowBook should decrement copy_count after apply borrow operation

![image](https://github.com/user-attachments/assets/ec78080d-81a2-492e-8a2c-f164d558721f)

#### Add logic for decrement copy_count of borrowed book.

![image](https://github.com/user-attachments/assets/43634b82-bafa-4f40-935f-8055241fc1b3)

   > ###  3. Add test that if Book is not present in Database then throw an error.

```javascript
 test('should throw an error if book is not present in Database with provided ISBN',()=>{
        expect(()=>borrowBookHelperInstance.borrowBook('978-0201616224')).toThrow('Book is not present in the database with this ISBN')
    })
```

#### If book is not in Database then borrowBook should throw an Error.

![image](https://github.com/user-attachments/assets/e08fc001-239a-4f88-ae6a-b9da2f1fbf5a)

#### Add check logic for Book which not present in Database

![image](https://github.com/user-attachments/assets/de7ac781-d33a-40a3-865c-be42246b55b5)

   > ###  4. Add test that if Book is currently unavailable then throw an Error.

```javascript
   test('should throw an error if book is  currently unavailable',()=>{
        addBookHelperInstance.addBook('978-0321563842',"Effective C++","Scott Meyers","2005");
        borrowBookHelperInstance.borrowBook('978-0321563842')
        expect(()=>borrowBookHelperInstance.borrowBook('978-0321563842')).toThrow('Book is currently unavailable')
    })
```

#### borrowBook should throw an Error if copy_count of book is 0

![image](https://github.com/user-attachments/assets/77f30de0-1359-40ae-9204-27a8fea25357)

#### Add check of copy_count before returning book.

![image](https://github.com/user-attachments/assets/99d2849e-70c8-49a3-83e0-fb10373a11d3)

---
<br>

# Return Book Unit-Test

   > ###  1. Add first test of return book expect success message of returning book.

```javascript
 test('should return successfull message of returning book',()=>{
        addBookHelperInstance.addBook('978-1449355739',"Learning Python","Mark Lutz","2013");
        borrowBookHelperInstance.borrowBook('978-1449355739')
        const message = returnBookHelperInstance.returnBook('978-1449355739')
        expect(message).toBe("Book returned successfully")        
    })
```
#### returnBook method should return success message of returning book.

![image](https://github.com/user-attachments/assets/0487fbec-e1ec-4d05-8637-1cee4877566e)

#### Create ReturnBookHelper Class and implement returnBook method

![image](https://github.com/user-attachments/assets/561a9d91-efe5-447e-a22e-032693fed64a)

   > ###  2. Add Test that check copy_count field after returning book
```javascript
    test('should increment copy_count of book in Database',()=>{

        addBookHelperInstance.addBook('978-0132354165',"Effective Modern C++","Scott Meyers","2014");
        borrowBookHelperInstance.borrowBook('978-0132354165')
        returnBookHelperInstance.returnBook('978-0132354165')
        // tested that copy_count decrement by borrowBook, so now it increment by returnBook also.
        expect(libraryInstance.getAllBooks()['978-0132354165'].copy_count).toBe(1)

    })
```
#### After returning book copy_count must be incremented

![image](https://github.com/user-attachments/assets/97466b44-e1da-44fd-967b-4fdec9fa26c7)

#### Create changes in returnBook method

![image](https://github.com/user-attachments/assets/77e88205-0219-429e-92b4-b3b0d4e790a8)

   > ###  3. Add Test -> If book which user want to return not present in Database then throw Error.

```javascript
   test('should throw an error if book is not present in Database with provided ISBN',()=>{
        expect(()=>returnBookHelperInstance.returnBook('123456')).toThrow("There is no record of the provided ISBN")
    })
```

#### There is not any record with ISBN-123456 so it should throw error.

![image](https://github.com/user-attachments/assets/b7c75588-ab29-4058-85a9-72322a540289)

#### Add check in returnBook method for check that provided ISBN is present in Database or not

![image](https://github.com/user-attachments/assets/25c9dd4f-348c-4ee3-b353-e9511d80234b)

---
<br>

# View Book Unit-Test

   > ###  1. Add first test for checking viewBook should return empty array when there is not any books

```javascript
    test('should return empty array for instance of Library which not contains any books',()=>{
        let books =  viewBooksHelperInstance.viewBooks()
        expect(books).toEqual([])
    })
```

#### viewBook should return empty array for instance of Library which not contains any books

![image](https://github.com/user-attachments/assets/14477cae-ce87-427b-91ec-e2c98b834ef6)

#### Create ViewBooksHelper Class and implement viewBooks method

![image](https://github.com/user-attachments/assets/7bc5eafa-5425-4238-a5a8-013f90a6e9d4)

   > ###  2. Add test -> after applying add, borrow and return book operation viewBooks return expected array of books

```javascript
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
```

#### viewBook should remain consistent even after applying borrow and return operations

![image](https://github.com/user-attachments/assets/94c44e7a-fce3-43dd-a989-a5aaef802ad9)

#### viewBook return only those books which have copy_count > 0 

![image](https://github.com/user-attachments/assets/5d757f28-44f1-4978-bfd7-3f8ffac0eb54)
