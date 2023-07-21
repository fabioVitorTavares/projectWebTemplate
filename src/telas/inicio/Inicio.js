import React, { useState } from "react";
import {
  DivGeral,
  SpanTitulo,
  DivContainer,
  SpanSubtitulo,
  ContentSearch,
  ContentResultado,
  ContainerComBorda,
  ContainerMapa,
  ContainerInfoMapa,
  InfoMapa,
} from "./inicio-estilo";
import { Button, TextField } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import { TabelaPaginada } from "../../componentes/TabelaPaginada";
import { useNavigate } from "react-router-dom";
import { MapaLeaflet } from "../../componentes/mapa-leaflet/MapaLeaflet";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const Inicio = () => {
  const navigate = useNavigate();
  const [exibeResultado, setExibeResultado] = useState(true);

  const colunasTabela = [
    {
      nome: "Indice",
    },
    {
      nome: "Nome",
    },
  ];

  const dadosTabela = [
    { index: 1, nome: "Série História" },
    { index: 2, nome: "Cartograma" },
    { index: 3, nome: "Tabela Sintese" },
  ];

  const optionsCombo = [
    {
      nome: (row) => "Download",
      desabilitarOpcao: () => false,
      icon: () => <ForwardIcon />,
      onClick: (user) => {
        navigate(`/pdf/${user.index}`);
      },
    },
  ];

  const Resultado = () => (
    <ContentResultado>
      <ContainerComBorda style={{ marginBottom: 20 }}>
        <ContainerMapa>
          <div
            style={{
              width: "500px",
              height: "300px",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: "2%",
              backgroundColor: "green",
            }}
          >
            <MapaLeaflet />
          </div>
          <ContainerInfoMapa>
            <InfoMapa>Área total: 2500ha</InfoMapa>
            <InfoMapa>Área agrícola: 10ha</InfoMapa>
            <InfoMapa>Vegetação: 25ha</InfoMapa>
          </ContainerInfoMapa>
        </ContainerMapa>
      </ContainerComBorda>
      <TabelaPaginada
        colunas={colunasTabela}
        showAcoes={true}
        acoes={optionsCombo}
        dados={dadosTabela}
        showPaginacao={false}
      />
    </ContentResultado>
  );

  const pesquisar = () => {
    setExibeResultado(true);
  };
  return (
    <div className={exibeResultado ? "fundo" : "background-degrade-fundo"}>
      <DivGeral>
        <SpanTitulo>
          Sistema de Apoio a Caracterização de Imóveis Rurais
        </SpanTitulo>
        <DivContainer>
          <SpanSubtitulo>Obtenha Informações sobre o seu imóvel</SpanSubtitulo>
          <ContentSearch>
            <TextField style={{ width: "80%" }} />
            <Button
              variant="outlined"
              style={{ width: "8%", marginLeft: "2%" }}
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              style={{ width: "8%", marginLeft: "2%" }}
              onClick={pesquisar}
            >
              <SearchIcon />
            </Button>
          </ContentSearch>
          {exibeResultado && Resultado()}
        </DivContainer>
      </DivGeral>
    </div>
  );
};

export default Inicio;
