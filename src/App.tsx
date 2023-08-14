import './App.css';
import Book from './components/Book';
import BookList from './components/BookList';
import data from './data.json';

const bookIndexStart = 10;
const bookIndexEnd = 15;
const placeHolderList = data.slice(bookIndexStart, bookIndexEnd); // esse código deverá ser excluído após a implementação do requisito 2

function App() {
  return (
    <div className="app">
      <div className="book-selector">
        <Book bookInfo={ data[0] } showDetails />
        <div className="selector-buttons">
          <button>Adicionar à lista de desejos</button>
          <button>Adicionar à lista de leitura</button>
          <button>Adicionar à lista de lidos</button>
          <button>Próximo livro</button>
        </div>
      </div>

      <div className="list-buttons">
        <button>Exibir lista de desejos</button>
        <button>Exibir lista de leitura</button>
        <button>Exibir lista de lidos</button>
      </div>
      <h1>Lista de ...</h1>
      <BookList books={ placeHolderList } />
    </div>
  );
}

export default App;
