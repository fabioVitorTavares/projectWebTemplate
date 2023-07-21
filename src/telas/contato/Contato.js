import React from "react";
import { DivGeral, SpanTitulo } from "./contato-estilo";

const Contato = () => {
  return (
    <div className="background-degrade-fundo">
      <DivGeral>
        <SpanTitulo>
          Sistema de Apoio a Caracterização de Imóveis Rurais
        </SpanTitulo>
        <span style={{marginTop: 20}}>Texto contato aqui</span>
      </DivGeral>
    </div>
  );
};

export default Contato;
