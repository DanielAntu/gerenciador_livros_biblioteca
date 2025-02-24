import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";
import bookFetch from "../../axios/config";
import { useUserContext } from "../../hooks/useUserContext";
import useToast from "../../hooks/useToast";
import { authUtils } from "../../utils/authUtils";

const UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    const profile = async () => {
        setLoading(true);
        try {
            const res = await bookFetch.get("user/profile", {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setCpf(res.data.cpf);
            setEmail(res.data.email);
        } catch (error) {
            useToast(error.response.data.msg, "error");
            authUtils(error, setUser, navigate);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            firstName,
            lastName,
            cpf,
            email,
            password1,
            password2,
        };

        setLoading(true);
        try {
            const res = await bookFetch.put("user/edit", obj, {
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
        profile();
    }, []);

    return (
        <div className="profile form-container">
            <form className="form-wraper" onSubmit={handleSubmit}>
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
                <ButtonRegister loading={loading} btnText={"Editar"} />
            </form>
        </div>
    );
};

export default UserProfile;
