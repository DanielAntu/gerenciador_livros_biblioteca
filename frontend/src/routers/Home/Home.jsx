import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import BookArea from "../../components/BookArea/BookArea";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

import "./Home.css";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    const getBooks = async () => {
        setLoading(true);
        try {
            const res = await bookFetch.get("book", {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setBooks(res.data);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const searchBook = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await bookFetch.get(`book/search?title=${search}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setBooks(res.data);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await bookFetch.delete(`book/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setBooks((books) => books.filter((book) => book.id !== id));
            useToast(res.data.msg);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    useEffect(() => {
        getBooks();
    }, [search]);

    return (
        <div className="home">
            <div className="search-container">
                <form onSubmit={searchBook}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Digite o nome do livro para procurar"
                        value={search || ""}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ButtonRegister loading={loading} btnText={"Pesquisar"} />
                </form>
            </div>
            <div className="home-container">
                {books.length === 0 && <p>Não há livro na biblioteca</p>}
                {books.length > 0 &&
                    books.map((book) => (
                        <BookArea
                            key={book.id}
                            book={book}
                            handleDelete={handleDelete}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Home;
