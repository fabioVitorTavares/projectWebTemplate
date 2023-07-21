import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearReducer } from "../redux/reducer";
import Icone from "./Icone";

const MenuLateral = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const telasPermitidas = useSelector(
    (state) => state.persistedReducer.telasPermitidas
  );
  const paginaAtual = useSelector(
    (state) => state.persistedReducer.paginaAtual
  );

  const sair = () => {
    dispatch(clearReducer());
    navigate("/login");
  };

  const ComponenteBorderRadius = () => {
    return (
      <div
        style={{
          backgroundColor: "#024634",
          width: 15,
          height: 15,
          position: "absolute",
          left: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ecf0f6",
            borderTopLeftRadius: 15,
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="menu-lateral">
      <ComponenteBorderRadius />
      <div className="menu-container">
        {telasPermitidas.map(
          (menu, index) =>
            menu.visible && (
              <div
                key={index}
                className="menu-item"
                onClick={() => navigate(menu.route)}
                style={{ opacity: menu.text == paginaAtual ? 1 : 0.5 }}
              >
                <div className="icone-container">
                  <Icone nome={menu.icon} size={40} />
                </div>
                <div className="texto-item-menu-container">
                  <span
                    className="texto-item-menu"
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {menu.text}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
      <div className="menu-item menu-item-sair" onClick={sair}>
        <div className="icone-container">
          <Icone nome={"sair"} size={40} />
        </div>
        <div className="texto-item-menu-container">
          <span
            className="texto-item-menu"
            style={{
              color: "#fff",
              fontSize: 22,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {"Sair"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuLateral;
