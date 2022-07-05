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

    displayBooks()
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
        book.innerHTML = myLibrary[i].info()
        bookCard.appendChild(book)

        //create read button
        let readBtn = document.createElement('button')
        bookCard.appendChild(readBtn)
        readBtn.innerHTML = "I read this!"
        readBtn.addEventListener('click', () => {
            myLibrary[i].beenRead = !myLibrary[i].beenRead
            if (myLibrary[i].beenRead) {
                bookCard.classList.add('been-read')
            }
            else bookCard.classList.remove('been-read')
            book.innerHTML = myLibrary[i].info()
        })

        //create delete button


        bookArea.appendChild(bookCard)
    }
}