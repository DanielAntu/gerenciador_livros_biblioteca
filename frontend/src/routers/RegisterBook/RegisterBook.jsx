import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import bookFetch from "../../axios/config";
import { authUtils } from "../../utils/authUtils";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const RegisterBook = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [quant, setQuant] = useState("");

    const navigate = useNavigate();

    const { user, setUser } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            title,
            quant,
        };

        setLoading(true);
        try {
            const res = await bookFetch.post("book/register", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.msg);
            setTitle("");
            setQuant("");
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

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
                <ButtonRegister loading={loading} btnText={"Enviar"} />
            </form>
        </div>
    );
};

export default RegisterBook;
