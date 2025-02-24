import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookFetch from "../../axios/config";
import useToast from "../../hooks/useToast";
import { useUserContext } from "../../hooks/useUserContext";
import { authUtils } from "../../utils/authUtils";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";

const RegisterUser = () => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const habdleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            firstName,
            lastName,
            cpf,
            password1,
            password2,
            email,
        };

        setLoading(true);
        try {
            const res = await bookFetch.post("user/register", obj, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            useToast(res.data.msg);
            navigate("/");
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    return (
        <div className="register form-container">
            <form className="form-wraper" onSubmit={habdleSubmit}>
                <Input
                    name={"firstName"}
                    placeholder="Digite seu nome"
                    label={"Nome"}
                    value={firstName}
                    setValue={setFirstName}
                />
                <Input
                    name={"lastName"}
                    placeholder="Digite seu sobrenome"
                    label={"Sobrenome"}
                    value={lastName}
                    setValue={setLastName}
                />
                <Input
                    name={"cpf"}
                    placeholder="ex: 11111111111"
                    label={"CPF"}
                    value={cpf}
                    setValue={setCpf}
                />
                <Input
                    type="email"
                    name={"email"}
                    placeholder="Digite seu E-mail"
                    label={"E-mail"}
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    type="password"
                    name={"password1"}
                    placeholder="Digite sua senha"
                    label={"Senha"}
                    value={password1}
                    setValue={setPassword1}
                />
                <Input
                    type="password"
                    name={"password2"}
                    placeholder="Digite sua confirmação de senha"
                    label={"Confirmação de senha"}
                    value={password2}
                    setValue={setPassword2}
                />
                <ButtonRegister loading={loading} btnText={"Enviar"} />
            </form>
        </div>
    );
};

export default RegisterUser;
