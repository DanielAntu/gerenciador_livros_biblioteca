import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useUserContext } from "../../hooks/useUserContext";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const SearchCpf = () => {
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = { cpf };

        setLoading(true);
        try {
            const res = await bookFetch.post("client", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            navigate(`/client/${res.data.id}`);
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
                    name={"cpf"}
                    label={"CPF"}
                    placeholder="Digite o CPF do cliente"
                    value={cpf}
                    setValue={setCpf}
                />
                <ButtonRegister loading={loading} btnText={"Procurar"} />
            </form>
        </div>
    );
};

export default SearchCpf;
