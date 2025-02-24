import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";
import useToast from "../../hooks/useToast";
import bookFetch from "../../axios/config";
import { useUserContext } from "../../hooks/useUserContext";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const obj = {
                identity,
                password,
            };

            const res = await bookFetch.post("user/login", obj);
            useToast(res.data.msg);
            localStorage.setItem("user", res.data.token);
            setUser(res.data.token);
            navigate("/");
        } catch (error) {
            useToast(error.response.data.msg, "error");
        }
        setLoading(false);
    };

    return (
        <div className="login form-container">
            <form onSubmit={handleSubmit}>
                <Input
                    name={"identity"}
                    label={"CPF ou E-mail"}
                    placeholder="Digite seu CPF ou E-mail"
                    value={identity}
                    setValue={setIdentity}
                />

                <Input
                    type="password"
                    name={"password"}
                    placeholder="Digite sua senha"
                    label={"Senha"}
                    value={password}
                    setValue={setPassword}
                />
                <ButtonRegister loading={loading} btnText={"Entrar"} />
            </form>
        </div>
    );
};

export default Login;
