let myLibrary = [];
const bookArea = document.querySelector('.book-area')
const popUp = document.querySelector('.popup')
const addBookBtn = document.getElementById('add-book-header')
addBookBtn.addEventListener('click', () => popUp.style.display = 'block')

//Book constructor
function Book(title, author, pages, beenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.beenRead = beenRead

    this.info = function() {
        let readStatement = ""
        if (beenRead)
            readStatement = "read"
        else
            readStatement = "not read yet"
        return title + " by " + author + ", " + pages + " pages, " + readStatement
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    displayBooks()
}

function displayBooks() {
    //clear book area first to avoid duplicates
    while(bookArea.firstChild) {
        bookArea.removeChild(bookArea.lastChild)
    }
    myLibrary.forEach(makeBook)

    function makeBook(currentBook) {
        let book = document.createElement('div')
        book.classList.add('book')
        book.innerHTML = currentBook.info()
        bookArea.appendChild(book)
    }
}