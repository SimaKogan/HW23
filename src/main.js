import { Library } from "./data/library.js";
const elementsInput = document.querySelectorAll(".form-book [name]");
const sectionElements = document.querySelectorAll("section");
const elemInputPages = document.querySelectorAll(".setPages [name]");
const sectionBooksByPages = document.querySelector(".listBooksByPages");
const sectionBooksByAuthor = document.querySelector(".listBooksByAuthor");
const inputAuthor = document.querySelector(".inputAuthor");
const sectionAddBook = document.querySelector(".addBook");
const errorMessagePages = document.getElementById("error_pageTo");

const library = new Library();
const intervalPages = [];
const ULSTYLE = "ulstyle";
let pageFROM = 0;
let pageTO = 0;
let AUTHOR = "";
const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear();
const TIME_OUT = 3500;
const MIN_PAGES = 50;
const MAX_PAGES = 2000;
let FROM_PAGE = 0;
let TO_PAGE = 0;

sectionAddBook.style.display = "none";
function onAddBook(event) {
    event.preventDefault();
    const arrBookData = Array.from(elementsInput);
    const book = arrBookData.reduce((newBook, field) => {
        newBook[field.name] = field.value;
        return newBook;
    }, {})
    console.log(book);
    library.addBook(book);
    return book;
}

function showBooks(index) {
    sectionElements.forEach(section => section.hidden = true);
    sectionElements.forEach(elem => elem.classList.remove(ULSTYLE));
    sectionElements[index].hidden = false;
    sectionAddBook.style.display = "none";
    switch (index) {
        case (0):
            sectionAddBook.style.display = "flex";
            break;
        case (1):
            showDetailsSection(index);
            sectionElements[index].innerHTML = addLIBook(library.books);
            break;
        case (2):
            showDetailsSection(index);
            break;
        case (3):
            showDetailsSection(index);
            break;
    }

}

function onChange(event) {
    const elementEvent = event.target;
    console.log(elementEvent);
    if (elementEvent.name === "publish_data") {
        isValidPublishData(elementEvent);
    }
    if (elementEvent.name === "pages") {
        isValidNumberOfPages(elementEvent);
    }
}
function isValidPublishData(elementEvent) {
    const value = elementEvent.value;
    const year = value.slice(0, 4);
    console.log(year);
    if (year < MIN_YEAR || year > MAX_YEAR) {
        showErrorMessage(elementEvent);
    }
}
function isValidNumberOfPages(elementEvent) {
    const value = elementEvent.value;
    console.log(value);
    if (value < MIN_PAGES || value > MAX_PAGES) {
        showErrorMessage(elementEvent);
    }
}
function isValidFromToPages(fromPage, toPage) {
    let res = true;
    if (fromPage > toPage) {
        res = false;
    }
    return res;
}
function showErrorMessage(elementEvent) {
    const errorMessageElem = document.getElementById(`error_${elementEvent.name}`);
    console.log(elementEvent.name)
    errorMessageElem.innerHTML = `*enter correct ${elementEvent.name}`;
    timeOutErrorMessage(errorMessageElem);
    elementEvent.value = "";
}
function timeOutErrorMessage(errorMessageElem) {
    setTimeout(() => {
        errorMessageElem.innerHTML = "";
    }, TIME_OUT);
}

function showDetailsSection(index) {
    sectionElements[index].hidden = false;
    sectionElements[index].classList.add(ULSTYLE);
}
function addLIBook(array) {
    const arrLIBooks = array.map(book => {
        let listItem = `<ul class="list-books">
        <li>Title: ${book.title}</li>
        <li>Author: ${book.author}</li>
        <li>Genre: ${book.genre}</li>
        <li>Number of pages: ${book.pages}</li>
        </ul>`
        return listItem;
    })
    console.log(arrLIBooks);
    return arrLIBooks.join('');
}
function selectBooksByPages(event) {
    event.preventDefault();
    pageFROM = +elemInputPages[0].value;
    pageTO = +elemInputPages[1].value;
    if (!isValidFromToPages(pageFROM, pageTO)) {
        errorMessagePages.innerHTML = `*page "FROM" must be least page "TO"`;
        timeOutErrorMessage(errorMessagePages);
    }
    isValidFromToPages(errorMessagePages, pageFROM, pageTO)
    const booksByPages = library.getBooksByPages(pageFROM, pageTO);
    sectionBooksByPages.innerHTML = addLIBook(booksByPages);
}
function selectBooksByAuthor(event) {
    event.preventDefault();
    AUTHOR = inputAuthor.value;
    console.log(AUTHOR);
    const booksByAuthor = library.getAuthorBooks(AUTHOR);
    sectionBooksByAuthor.innerHTML = addLIBook(booksByAuthor);
}
window.onAddBook = onAddBook;
window.showBooks = showBooks;
window.addLIBook = addLIBook;
window.selectBooksByPages = selectBooksByPages;
window.selectBooksByAuthor = selectBooksByAuthor;
window.onChange = onChange;
window.isValidFromToPages = isValidFromToPages;