class App {
    constructor() {
        this.books = [];

        this.formEl = document.getElementById('info-form');
        this.search = document.getElementById('search_params').innerText;
        this.bookList = document.getElementById('book_list');

        this.registerHandlers();
    }


    registerHandlers() {
        this.formEl.onsubmit = event => this.addBook(event);
    }


    addBook(event) {
        event.preventDefault();

        this.books.push({
            link: 'https://books.google.com.br/books?id=XsJ645BbokAC&printsec=frontcover&dq=tolkien&hl=&cd=2&source=gbs_api#v=onepage&q=tolkien&f=false',
            title: 'O Silmarillion',
            author: 'J.R.R. Tolkien',
            publicationDate: '2019-03-18',
            publisher: 'HarperCollins Brasil',
            img: 'http://books.google.com/books/content?id=B3uFDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
        });

        this.render();
    }

    render() {
        this.bookList.innerHTML = '';

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
            linkEL.appendChild(createTextNode(book.title));

            divTitle.appendChild(strongTitle);
            divTitle.appendChild(linkEL);

            divAuthor.appendChild(strongAuthor);
            divAuthor.appendChild(createTextNode(book.author));

            divPubliDate.appendChild(strongPubliDate);
            divPubliDate.appendChild(createTextNode(book.publicationDate));

            divPublisher.appendChild(strongPublisher);
            divPublisher.appendChild(createTextNode(book.publisher));
            
            let divBook = createElement('div');
            linkEL.appendChild(imgEL);
            linkEL.appendChild(divtitle);
            linkEL.appendChild(divAuthor);
            linkEL.appendChild(divPubliDate);
            linkEL.appendChild(divPublisher);

            this.bookList.appendChild(divBook);
        });
    }
}

new App();