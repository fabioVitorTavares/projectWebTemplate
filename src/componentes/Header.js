import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icone from "./Icone";
import { clearReducer } from "../redux/reducer";
import { TituloHeader } from "./components-stilo";
import { useLocation } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.persistedReducer.user);
  const [rotaAtual, setRotaAtual] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setRotaAtual(location.pathname);
  }, [location]);

  useEffect(() => {
    console.log("rotaAtual :>> ", rotaAtual);
  }, [rotaAtual]);

  const home = () => {
    navigate("/inicio");
  };

  const sair = () => {
    dispatch(clearReducer());
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "white",
        width: "100vw",
        height: "8vh",
        minWidth: 500,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginLeft: 50 }}>
          <TituloHeader
            onClick={() => navigate("/inicio")}
            temBorder={rotaAtual === "/inicio"}
          >
            Início
          </TituloHeader>
          <TituloHeader
            onClick={() => navigate("/sobre")}
            temBorder={rotaAtual === "/sobre"}
          >
            {" "}
            Sobre
          </TituloHeader>
          <TituloHeader
            onClick={() => navigate("/contato")}
            temBorder={rotaAtual === "/contato"}
          >
            Contato
          </TituloHeader>
          <TituloHeader>Aviso de Privacidade</TituloHeader>
          <TituloHeader>Termo de Uso</TituloHeader>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 100,
          }}
        >
          <div style={{ marginRight: 15 }}>
            <span
              style={{ color: "#024634", fontSize: 28, fontWeight: "bold" }}
            >
              {user.nome}
            </span>
          </div>
          <div onClick={sair} style={{ cursor: "pointer" }}>
            <Icone nome={"sair"} size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
