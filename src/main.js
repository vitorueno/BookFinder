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
        this.formEl.onsubmit = event => this.addBook(event);
    }


    async addBook(event) {
        event.preventDefault();
        
        const search = this.bookInput.value;

        if (search.length === 0) return;
        
        const requestedBooks = await api.get(`/volumes?q=${search}`);

        console.log(requestedBooks);

        requestedBooks.data.items.forEach(book => {
            this.books.push({
            link: book.selfLink,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            publicationDate: book.volumeInfo.publishedDate,
            publisher: book.volumeInfo.publisher,
            img: book.volumeInfo.imageLinks.thumbnail  ? book.volumeInfo.imageLinks.thumbnail : null
            })
            this.render();
        });

    }

    render() {
        this.bookList.innerHTML = ''

        this.books.forEach(book => {
            let imgEL = document.createElement('img');
            imgEL.setAttribute('src', book.img);
             
            let divTitle = document.createElement('div');
            divTitle.setAttribute('class', 'book_title');

            let divAuthor = document.createElement('div');
            divAuthor.setAttribute('class', 'author');

            let divPubliDate = document.createElement('div');
            divPubliDate.setAttribute('class', 'publication_date');

            let divPublisher = document.createElement('div');
            divPublisher.setAttribute('class', 'publisher');

            let strongTitle = document.createElement('strong');
            strongTitle.appendChild(document.createTextNode('Title: '))

            let strongAuthor = document.createElement('strong');
            strongAuthor.appendChild(document.createTextNode('Author: '))
            
            let strongPubliDate = document.createElement('strong');
            strongPubliDate.appendChild(document.createTextNode('Publication Date: '))
            
            let strongPublisher = document.createElement('strong');
            strongPublisher.appendChild(document.createTextNode('Publisher: '))
            
            let linkEL = document.createElement('a');
            linkEL.setAttribute('targe','_blank');
            linkEL.setAttribute('href', book.bookLink);
            linkEL.appendChild(document.createTextNode(book.title));

            divTitle.appendChild(strongTitle);
            divTitle.appendChild(linkEL);

            divAuthor.appendChild(strongAuthor);
            divAuthor.appendChild(document.createTextNode(book.author));

            divPubliDate.appendChild(strongPubliDate);
            divPubliDate.appendChild(document.createTextNode(book.publicationDate));

            divPublisher.appendChild(strongPublisher);
            divPublisher.appendChild(document.createTextNode(book.publisher));
            
            let divBook = document.createElement('div');
            divBook.appendChild(imgEL);
            divBook.appendChild(divTitle);
            divBook.appendChild(divAuthor);
            divBook.appendChild(divPubliDate);
            divBook.appendChild(divPublisher);
            
            this.bookList.appendChild(divBook);
        });
    }
}

new App();