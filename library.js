let myLibrary = [];
const bookArea = document.querySelector('.book-area')

//Book constructor
function Book(title, author, pages, beenRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.beenRead = beenRead

    this.info = function() {
        let readStatement = "";
        if (beenRead)
            readStatement = "read"
        else
            readStatement = "not read yet"
        return title + " by " + author + ", " + pages + " pages, " + readStatement
    }
}

function addBookToLibrary() {

}