// Getting DOM Elements
const btn = document.querySelector("#submit"),
  bookTitle = document.querySelector("#bookTitle"),
  author = document.querySelector("#author"),
  isbn = document.querySelector("#isbn"),
  bookList = document.querySelector(".book-list");

// Book Object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//creatAlert() function

function createAlert(message, alertType) {
  const alertBox = document.createElement("div");
  alertBox.className = alertType;
  alertBox.classList.add("messageBox");
  alertBox.innerText = message;

  const form = document.querySelector(".content");

  const main = document.querySelector(".main");

  if (main.querySelector(alertType) === null) {
    main.insertBefore(alertBox, form);

    setTimeout(() => {
      document.querySelector(".messageBox").remove();
    }, 5000);
  }
}

//Function to delete Book
function removeBook(rBook) {
  if (rBook.className === "fas fa-trash") {
    // remove grandParent of the node
    rBook.parentElement.parentElement.remove();

    let name =
      rBook.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;

    let author =
      rBook.parentElement.previousElementSibling.previousElementSibling
        .innerText;

    removeLocalStorage(name);

    createAlert(`${name} by ${author} deleted from library`, "warning");
  }
}

// Function to append Book details to DOM
function addBook(e) {
  if (bookTitle.value === "" || author.value === "" || isbn.value === "") {
    createAlert("Please fill in all fields", "error");
  } else {
    let newBook = new Book(bookTitle.value, author.value, isbn.value);

    const list = document.createElement("tr");

    let listContent = `<td>${newBook.title}</td>
        <td>${newBook.author}</td>
        <td>${newBook.isbn}</td>
        <td><i class="fas fa-trash"></i></td>`;

    list.innerHTML = listContent;

    bookList.appendChild(list);

    setLocalStorage(newBook);

    createAlert("Book added successfully", "success");

    bookTitle.value = "";
    author.value = "";
    isbn.value = "";
  }

  e.preventDefault();
}

function getLocalStorage() {
  let books = [];
  if (localStorage.getItem("books") !== null) {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
}

function setLocalStorage(newBook) {
  let books = getLocalStorage();
  books.push(newBook);

  books = JSON.stringify(books);

  localStorage.setItem("books", books);
}

function removeLocalStorage(name) {
  let books = getLocalStorage();

  books.forEach(function (book, index) {
    if (book.title === name) {
      books.splice(index, 1);
    }
  });

  books = JSON.stringify(books);
  localStorage.setItem("books", books);
}

function appendLocalStorage() {
  let books = getLocalStorage();
  console.log(books);

  if (books !== null) {
    let listContent = "";

    books.forEach(function (book) {
      const list = document.createElement("tr");

      listContent = `<td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><i class="fas fa-trash"></i></td>`;

      list.innerHTML = listContent;
      bookList.appendChild(list);
    });
  }
}

// window.

// Event listener to trigger addBook() method
btn.addEventListener("click", addBook);

bookList.addEventListener("click", e => {
  removeBook(e.target);
});

window.addEventListener("load", appendLocalStorage);
