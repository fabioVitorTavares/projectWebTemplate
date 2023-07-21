import React from "react";
import preview_celular from "../assets/preview_celular.webp";
import preview_pagina from "../assets/preview_pagina.webp";
import logoPequeno from "../assets/logo-pequeno.png";
import { Button } from "@mui/material";

const PreviewNotificacao = ({
  titulo,
  conteudo,
  imagem,
  textoInformativo,
  textoBotao,
  linkRedirecionamento,
  direcionarNotificacao,
}) => {
  return (
    <div
      style={{
        width: 930,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent:
            direcionarNotificacao === "PERSONALIZADA"
              ? "space-between"
              : "center",
          paddingRight: 20,
        }}
      >
        {/* Preview Celular */}
        <div
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src={preview_celular}
            width={385}
            height={750}
            style={{ padding: 10 }}
          />
          {/* Notificação Push */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: 315,
              padding: 10,
              position: "absolute",
              top: 200,
              left: 35,
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <img
              src={logoPequeno}
              height={60}
              style={{ borderRadius: 10, marginRight: 5 }}
            />
            <div
              style={{
                color: "white",
                marginRight: 10,
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "white",
                }}
              >
                {titulo}
              </p>
              <p
                style={{
                  fontSize: 11,
                  maxWidth: 300,
                  color: "white",
                }}
              >
                {conteudo}
              </p>
            </div>
          </div>
        </div>

        {/* Preview Página */}
        {direcionarNotificacao === "PERSONALIZADA" && (
          <div
            style={{
              height: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={preview_pagina} width={375} height={770} />
            <div
              style={{
                position: "absolute",
                top: 150,
                width: "95%",
                borderRadius: 7,
                backgroundColor: "#F8F8F8",
                padding: 10,
                marginTop: !imagem ? 50 : null,
              }}
            >
              {/* Imagem */}
              {imagem && (
                <div>
                  <img
                    src={imagem}
                    width="100%"
                    style={{
                      borderRadius: 5,
                      maxHeight: 260,
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              {/* Texto Informativo */}
              {textoInformativo && (
                <div style={{ overflow: "hidden" }}>
                  <p>{textoInformativo}</p>
                </div>
              )}

              {/* Botão - Link */}
              {textoBotao && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 15,
                  }}
                >
                  <Button
                    onClick={() => {
                      linkRedirecionamento
                        ? window.open(linkRedirecionamento)
                        : null;
                    }}
                    style={{
                      backgroundColor: "#024634",
                      color: "white",
                      margin: 15,
                    }}
                  >
                    {textoBotao.slice(0, 40)}
                  </Button>
                </div>
              )}

              {/* <div
                style={{
                  position: "absolute",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <p>Voltar</p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewNotificacao;
