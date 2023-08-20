import { useState } from 'react';
import './App.css';
import Book from './components/Book';
import BookList from './components/BookList';
import data from './data.json';
import { BookListType } from './types';

const bookIndexStart = 10;
const bookIndexEnd = 15;
const placeHolderList = data.slice(bookIndexStart, bookIndexEnd); // esse código deverá ser excluído após a implementação do requisito 2

function App() {
  const [bookIndex, setBookIndex] = useState(0);
  const [favoritBook, SetFavoritBook] = useState<BookListType>([]);
  const [readingList, setReadingList] = useState<BookListType>([]);

  return (
    <div className="app">
      <div className="book-selector">
        <Book bookInfo={ data[bookIndex] } showDetails />
        <div className="selector-buttons">

          <button
            onClick={ () => SetFavoritBook([...favoritBook, data[bookIndex]]) }
          >
            Adicionar à lista de desejos
          </button>

          <button
            onClick={ () => setReadingList([...readingList, data[bookIndex]]) }
          >
            Adicionar à lista de leitura
          </button>

          <button
            onClick={ () => {} }
          >
            Adicionar à lista de lidos
          </button>

          <button
            onClick={ () => setBookIndex((bookIndex + 1) % data.length) }
          >
            Próximo livro
          </button>
        </div>
      </div>

      <div className="list-buttons">
        <button>Exibir lista de desejos</button>
        <button>Exibir lista de leitura</button>
        <button>Exibir lista de lidos</button>
      </div>
      <h1>Lista de ...</h1>
      <BookList books={ favoritBook } />
    </div>
  );
}

export default App;
