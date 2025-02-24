import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const RegisterLoan = () => {
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [title, setTitle] = useState("");

    const { user, setUser } = useUserContext();

    const { id } = useParams();

    const navigate = useNavigate();

    const getBook = async () => {
        setLoading(true);
        try {
            const res = await bookFetch.get(`book/${id}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setTitle(res.data.title);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = { cpf };

        setLoading(true);
        try {
            const res = await bookFetch.post(`loan/register/${id}`, obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.msg);
            navigate(`/loan/${res.data.loan.id}`);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <Input
                    name={"cpf"}
                    label={"CPF"}
                    placeholder="ex: 11111111111"
                    value={cpf}
                    setValue={setCpf}
                />
                <p>Titulo do livro: {title}</p>
                <ButtonRegister loading={loading} btnText={"Enviar"} />
            </form>
        </div>
    );
};

export default RegisterLoan;
