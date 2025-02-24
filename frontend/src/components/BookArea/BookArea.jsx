import React from "react";
import { Link } from "react-router-dom";

const BookArea = ({ book, handleDelete }) => {
    return (
        <div className="book-area">
            <p title={book.title}>
                Titulo do livro:{" "}
                {book.title.length > 20
                    ? book.title.substring(0, 20) + "..."
                    : book.title}
            </p>
            <p>Quantidade: {book.quant}</p>
            <div className="btns-action">
                <Link className="btn-action" to={`/register_loan/${book.id}`}>
                    Emprestar
                </Link>
                <Link className="btn-action" to={`/edit_book/${book.id}`}>
                    Editar
                </Link>
                <button
                    className="btn-action"
                    onClick={() => handleDelete(book.id)}>
                    Deletar
                </button>
            </div>
        </div>
    );
};

export default BookArea;
