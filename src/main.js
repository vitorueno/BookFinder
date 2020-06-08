import api from "./api";

class App {
    constructor() {
        this.books = [];

        this.formEl = document.getElementById('info-form');
        this.bookInput = document.querySelector('input[name=search_params]')
        this.bookList = document.getElementById('book_list');

        this.registerHandlers();
    }


    registerHandlers() {        
        this.formEl.onsubmit = event => this.addBooks(event);
    }

    async removeOldSearchedBooks() {
        this.books = []
        this.bookList.innerHTML = ''
    }

    async addBooks(event) {
        event.preventDefault();
        await this.removeOldSearchedBooks()
        
        const search = this.bookInput.value;

        if (search.length === 0) return;
        
        const requestedBooks = await api.get(`/volumes?q=${search}`);
        console.log(requestedBooks)
        requestedBooks.data.items.forEach(book => {
            this.books.push({
                link: book.volumeInfo.previewLink,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors,
                publicationDate: book.volumeInfo.publishedDate,
                publisher: book.volumeInfo.publisher,
                img: book.volumeInfo.imageLinks.thumbnail  ? book.volumeInfo.imageLinks.thumbnail : null
            })
            this.render();
        });

    }
    
    redirectToBookPage(bookLink) {
        window.location = bookLink
    }

    render() {
        this.books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList = 'book-card'

            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', book.img)

            const divElement = document.createElement('div')

            const bookTitleParagraphElement = document.createElement('p')
            bookTitleParagraphElement.innerHTML = book.title ? book.title : ''

            const bookAuthorParagraphElement = document.createElement('p')
            bookAuthorParagraphElement.innerHTML = book.author ? book.author : ''

            const bookPublisherParagraphElement = document.createElement('p')
            bookPublisherParagraphElement.innerHTML = book.publisher ? book.publisher : ''

            const buttonElement = document.createElement('button')

            buttonElement.setAttribute('href', book.link);
            buttonElement.innerHTML = 'View'
            buttonElement.addEventListener('click', () => this.redirectToBookPage(book.link))

            divElement.appendChild(bookTitleParagraphElement)
            divElement.appendChild(bookAuthorParagraphElement)
            divElement.appendChild(bookPublisherParagraphElement)
            divElement.appendChild(buttonElement)

            bookCard.appendChild(imgElement)
            bookCard.appendChild(divElement)

            this.bookList.appendChild(bookCard);
        });
    }
}

new App();