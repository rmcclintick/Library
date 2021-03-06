let myLibrary = [];
const bookArea = document.querySelector('.book-area')

//const + eventListeners for popup form
const popUp = document.querySelector('.popup')
const addBookBtn = document.getElementById('add-book-header')
addBookBtn.addEventListener('click', () => popUp.style.display = 'block')

const closeFormBtn = document.getElementById('form-close')
closeFormBtn.addEventListener('click', () => popUp.style.display = 'none')

const submitBtn = document.getElementById('form-add-btn')
submitBtn.addEventListener('click', addBookToLibrary)






//Book constructor
function Book(title, author, pages, beenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.beenRead = beenRead
}

Book.prototype.info = function () {
    let readStatement = ""
    if (this.beenRead)
        readStatement = "read"
    else
        readStatement = "not read yet"
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + readStatement
}

//check local storage for previously entered books
myLibrary = JSON.parse(localStorage.getItem("books") || "[]")
for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].info = function () {
        let readStatement = ""
        if (this.beenRead)
            readStatement = "read"
        else
            readStatement = "not read yet"
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + readStatement
    }
}
displayBooks();

function addBookToLibrary() {
    let title = document.querySelector("#bookTitle").value
    let author = document.querySelector("#bookAuthor").value
    let pages = document.querySelector("#bookPages").value
    let read = document.querySelector("#bookRead").checked

    let book = new Book(title, author, pages, read)
    myLibrary.push(book);

    //clear form for next time
    document.querySelector("#bookTitle").value = ""
    document.querySelector("#bookAuthor").value = ""
    document.querySelector("#bookPages").value = ""
    document.querySelector("#bookRead").checked = false

    //hide popup form
    popUp.style.display = 'none'

    saveToLocalStorage();
    displayBooks();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    saveToLocalStorage();
    displayBooks();
}

function displayBooks() {
    //clear book area first to avoid duplicates
    while (bookArea.firstChild) {
        bookArea.removeChild(bookArea.lastChild)
    }


    for (let i = 0; i < myLibrary.length; i++) {
        //create card
        let bookCard = document.createElement('div')
        bookCard.classList.add('card')

        //create book div
        let book = document.createElement('div')
        //give book element the attribute index associated with myLibrary array
        book.setAttribute("index", i)
        book.classList.add('book')
        //book object
        let tempBook = myLibrary[i];
        //tempBook.prototype = Object.create(Book.prototype);
        book.innerHTML = tempBook.info();
        bookCard.appendChild(book)

        //create buttons div
        let btnContainer = document.createElement('div')
        btnContainer.classList.add('btn-container')
        bookCard.appendChild(btnContainer)


        //create read button
        let readBtn = document.createElement('button')
        btnContainer.appendChild(readBtn)
        readBtn.innerHTML = "I read this!"
        readBtn.addEventListener('click', () => {
            myLibrary[i].beenRead = !myLibrary[i].beenRead
            book.innerHTML = myLibrary[i].info()
            displayBooks()
        })

        //green side border if book has been read
        if (myLibrary[i].beenRead) {
            bookCard.classList.add('been-read');
            saveToLocalStorage();
        }
        else {
            bookCard.classList.remove('been-read')
            saveToLocalStorage();
        }

        //create delete button
        let deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "delete"
        deleteBtn.setAttribute("index", i)
        deleteBtn.addEventListener('click', () => {
            indexToRemove = deleteBtn.getAttribute("index")
            removeBookFromLibrary(indexToRemove)
        })

        btnContainer.appendChild(deleteBtn)

        bookArea.appendChild(bookCard)
    }
}

function saveToLocalStorage()
{
    localStorage.books = JSON.stringify(myLibrary);
}