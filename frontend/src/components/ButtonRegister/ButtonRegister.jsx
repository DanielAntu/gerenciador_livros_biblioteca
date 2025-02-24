import React from "react";

const ButtonRegister = ({ loading = false, btnText }) => {
    return (
        <>
            {!loading && (
                <button type="submit" className="btn-register">
                    {btnText}
                </button>
            )}
            {loading && (
                <button type="submit" disabled className="btn-register">
                    Carregando...
                </button>
            )}
        </>
    );
};

export default ButtonRegister;
