import React from "react";

export const Loading = () => {
    return (
            <div className="h-screen flex justify-content-center align-items-center align-content-center flex-wrap flex-column card-container yellow-container">
                <span className="loader"></span>
                <p className="font-bold w-10">Cargando </p>
            </div>
    )
}
