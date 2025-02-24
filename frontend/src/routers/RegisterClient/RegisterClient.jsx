import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useUserContext } from "../../hooks/useUserContext";
import { authUtils } from "../../utils/authUtils";
import bookFetch from "../../axios/config";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const RegisterClient = () => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            firstName,
            lastName,
            email,
            cpf,
            type,
        };

        setLoading(true);
        try {
            const res = await bookFetch.post("client/register", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            useToast(res.data.msg);
            setFirstName("");
            setLastName("");
            setEmail("");
            setCpf("");
            setType("");
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    return (
        <div className="register-client form-container">
            <form onSubmit={handleSubmit}>
                <Input
                    name={"firstName"}
                    label={"Nome"}
                    placeholder="Digite o nome do cliente"
                    value={firstName}
                    setValue={setFirstName}
                />
                <Input
                    name={"lastName"}
                    label={"Sobrenome"}
                    placeholder="Digite o sobrenome do cliente"
                    value={lastName}
                    setValue={setLastName}
                />
                <Input
                    type="email"
                    name={"email"}
                    label={"E-mail"}
                    placeholder="Digite o email do cliente"
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    name={"cpf"}
                    label={"CPF"}
                    placeholder="Digite o CPF do cliente"
                    value={cpf}
                    setValue={setCpf}
                />
                <label htmlFor="type" className="label-select">
                    Tipo
                </label>
                <select
                    name="type"
                    id="type"
                    value={type || ""}
                    onChange={(e) => setType(e.target.value)}>
                    <option value="">Selecione uma opção</option>
                    <option value="student">Estudante</option>
                    <option value="teacher">Professor</option>
                </select>
                <ButtonRegister loading={loading} btnText={"Enviar"} />
            </form>
        </div>
    );
};

export default RegisterClient;
