import { BookInfoType } from '../types';

type BookProps = {
  bookInfo: BookInfoType;
  showDetails: boolean;
};

export default function Book(props: BookProps) {
  const {
    bookInfo: { title, image, author, description },
    showDetails,
  } = props;

  return (
    <div className="book">
      <img src={ image } alt={ title } />
      <h1>{ title }</h1>
      <h3>{ author }</h3>
      { showDetails && (
        <p>{ description }</p>
      ) }
    </div>
  );
}
