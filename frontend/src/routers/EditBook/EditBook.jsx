import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useUserContext } from "../../hooks/useUserContext";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const EditBook = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [quant, setQuant] = useState("");

    const { user, setUser } = useUserContext();
    const { id } = useParams();

    const navigate = useNavigate();

    const getBooks = async () => {
        setLoading(true);
        try {
            const res = await bookFetch.get(`book/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setTitle(res.data.title);
            setQuant(res.data.quant);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            title,
            quant,
        };

        setLoading(true);
        try {
            const res = await bookFetch.put(`book/${id}`, obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.msg);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Nome do livro"}
                    name={"book"}
                    placeholder="Digite o nome do livro"
                    value={title}
                    setValue={setTitle}
                />
                <Input
                    type="number"
                    label={"Quantidade de livro"}
                    name={"quant"}
                    placeholder="Digite a quantidade de livro"
                    value={quant}
                    setValue={setQuant}
                />
                <ButtonRegister loading={loading} btnText={"Editar"} />
            </form>
        </div>
    );
};

export default EditBook;
