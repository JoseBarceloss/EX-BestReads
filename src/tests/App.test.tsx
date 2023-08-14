import '@testing-library/jest-dom';
import {
  render,
  screen,
  within
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import booksList from '../data.json';

const setup = () => render(<App />);

describe('1 - Faça com que o próximo livro da lista seja exibido ao clicar no botão `Próximo livro`', () => {
  beforeEach(setup);

  it('Ao clicar no botão `Próximo livro`, as informações dos próximos livros da lista estão sendo exibidas', async () => {
    const firstBook = booksList[0];
    const bookTitle = screen.getByRole('heading', { name: firstBook.title });
    const bookImg = screen.getByAltText(firstBook.title);
    const bookAuthor = screen.getByRole('heading', { name: new RegExp(firstBook.author) });
    expect(bookTitle).toBeInTheDocument();
    expect(bookImg).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Próximo livro' });
    await userEvent.click(nextButton);

    const secondBook = booksList[1];
    const secondBookTitle = screen.getByRole('heading', { name: secondBook.title });
    const secondBookImg = screen.getByAltText(secondBook.title);
    const secondBookAuthor = screen.getByRole('heading', { name: new RegExp(secondBook.author) });
    expect(secondBookTitle).toBeInTheDocument();
    expect(secondBookImg).toBeInTheDocument();
    expect(secondBookAuthor).toBeInTheDocument();
  });

  it('Ao chegar no último livro da lista, ao clicar no botão `Próximo livro`, as informações do primeiro livro da lista estão sendo exibidas', async () => {
    const lastBook = booksList[booksList.length - 1];

    const nextButton = screen.getByRole('button', { name: 'Próximo livro' });
    for (let i = 1; i < booksList.length; i += 1) {
      await userEvent.click(nextButton);
    }

    const bookTitle = screen.getByRole('heading', { name: lastBook.title });
    const bookImg = screen.getByAltText(lastBook.title);
    const bookAuthor = screen.getByRole('heading', { name: lastBook.author });
    expect(bookTitle).toBeInTheDocument();
    expect(bookImg).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();

    await userEvent.click(nextButton);

    const firstBook = booksList[0];
    const firstBookTitle = screen.getByRole('heading', { name: firstBook.title });
    const firstBookImg = screen.getByAltText(firstBook.title);
    const firstBookAuthor = screen.getByRole('heading', { name: firstBook.author });
    expect(firstBookTitle).toBeInTheDocument();
    expect(firstBookImg).toBeInTheDocument();
    expect(firstBookAuthor).toBeInTheDocument();
  });
});

describe('2 - Gerencie o estado para cada uma das listas e exiba por padrão a lista de desejos', () => {
  beforeEach(setup);

  it('Ao clicar no botão `Adicionar à lista de desejos`, o livro é adicionado à lista de desejos e as informações do livro são exibidas na tela', async () => {
    const firstBook = booksList[0];

    const wishListButton = screen.getByRole('button', { name: 'Adicionar à lista de desejos' });
    await userEvent.click(wishListButton);

    const wishList = screen.getByRole('list');

    const wishListBookTitle = within(wishList).getByRole('heading', { name: firstBook.title });
    const wishListBookImg = within(wishList).getByAltText(firstBook.title);
    const wishListBookAuthor = within(wishList).getByRole('heading', { name: firstBook.author });
    expect(wishListBookTitle).toBeInTheDocument();
    expect(wishListBookImg).toBeInTheDocument();
    expect(wishListBookAuthor).toBeInTheDocument();
  });
});

describe('3 - Faça com que seja possível mudar a lista exibida ao clicar em um dos botões de exibição', () => {
  beforeEach(setup);

  it('Ao clicar no botão `Exibir lista de desejos`, a lista de desejos é exibida', async () => {
    const firstBook = booksList[0];

    const wishList = screen.getByRole('list');

    const bookTitle = within(wishList).queryByRole('heading', { name: firstBook.title });
    const bookImg = within(wishList).queryByAltText(firstBook.title);
    const bookAuthor = within(wishList).queryByRole('heading', { name: firstBook.author });
    expect(bookTitle).not.toBeInTheDocument();
    expect(bookImg).not.toBeInTheDocument();
    expect(bookAuthor).not.toBeInTheDocument();

    const wishListButton = screen.getByRole('button', { name: 'Adicionar à lista de desejos' });
    await userEvent.click(wishListButton);

    const wishListBookTitle = within(wishList).getByRole('heading', { name: firstBook.title });
    const wishListBookImg = within(wishList).getByAltText(firstBook.title);
    const wishListBookAuthor = within(wishList).getByRole('heading', { name: firstBook.author });
    expect(wishListBookTitle).toBeInTheDocument();
    expect(wishListBookImg).toBeInTheDocument();
    expect(wishListBookAuthor).toBeInTheDocument();
  });

  it('Ao clicar no botão `Exibir lista de leitura`, a lista de leitura é exibida', async () => {
    const secondBook = booksList[1];

    const nextButton = screen.getByRole('button', { name: 'Próximo livro' });
    await userEvent.click(nextButton);

    const wishList = screen.getByRole('list');

    const bookTitle = within(wishList).queryByRole('heading', { name: secondBook.title });
    const bookImg = within(wishList).queryByAltText(secondBook.title);
    const bookAuthor = within(wishList).queryByRole('heading', { name: secondBook.author });
    expect(bookTitle).not.toBeInTheDocument();
    expect(bookImg).not.toBeInTheDocument();
    expect(bookAuthor).not.toBeInTheDocument();

    const wishListButton = screen.getByRole('button', { name: 'Adicionar à lista de desejos' });
    await userEvent.click(wishListButton);

    const wishListBookTitle = within(wishList).getByRole('heading', { name: secondBook.title });
    const wishListBookImg = within(wishList).getByAltText(secondBook.title);
    const wishListBookAuthor = within(wishList).getByRole('heading', { name: secondBook.author });
    expect(wishListBookTitle).toBeInTheDocument();
    expect(wishListBookImg).toBeInTheDocument();
    expect(wishListBookAuthor).toBeInTheDocument();
  });

  it('Ao clicar no botão `Exibir lista de lidos`, a lista de lidos é exibida', async () => {
    const thirdBook = booksList[2];

    const nextButton = screen.getByRole('button', { name: 'Próximo livro' });
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);

    const wishList = screen.getByRole('list');

    const bookTitle = within(wishList).queryByRole('heading', { name: thirdBook.title });
    const bookImg = within(wishList).queryByAltText(thirdBook.title);
    const bookAuthor = within(wishList).queryByRole('heading', { name: thirdBook.author });
    expect(bookTitle).not.toBeInTheDocument();
    expect(bookImg).not.toBeInTheDocument();
    expect(bookAuthor).not.toBeInTheDocument();

    const wishListButton = screen.getByRole('button', { name: 'Adicionar à lista de desejos' });
    await userEvent.click(wishListButton);

    const wishListBookTitle = within(wishList).getByRole('heading', { name: thirdBook.title });
    const wishListBookImg = within(wishList).getByAltText(thirdBook.title);
    const wishListBookAuthor = within(wishList).getByRole('heading', { name: thirdBook.author });
    expect(wishListBookTitle).toBeInTheDocument();
    expect(wishListBookImg).toBeInTheDocument();
    expect(wishListBookAuthor).toBeInTheDocument();
  });
});
