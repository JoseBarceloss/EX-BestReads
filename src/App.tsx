import { useState } from 'react';
import './App.css';
import Book from './components/Book';
import BookList from './components/BookList';
import data from './data.json';
import { BookListType } from './types';

type CurrentListType = 'favoritBook' | 'readingList' | 'listaLidos';

function App() {
  const [bookIndex, setBookIndex] = useState(0);
  const [favoritBook, SetFavoritBook] = useState<BookListType>([]);
  const [readingList, setReadingList] = useState<BookListType>([]);
  const [listaLidos, setListaLidos] = useState<BookListType>([]);
  const [list3, SetList3] = useState<CurrentListType>('favoritBook');

  const list = {
    favoritBook,
    readingList,
    listaLidos,
  };

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
            onClick={ () => setListaLidos([...listaLidos, data[bookIndex]]) }
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
        <button onClick={ () => SetList3('favoritBook') }>Exibir lista de desejos</button>
        <button onClick={ () => SetList3('readingList') }>Exibir lista de leitura</button>
        <button onClick={ () => SetList3('listaLidos') }>Exibir lista de lidos</button>
      </div>
      <h1>Lista de ...</h1>
      <BookList books={ list[list3] } />
    </div>
  );
}

export default App;
