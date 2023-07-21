import { Button, Modal } from "@mui/material";

import {
  DialogContainer,
  TituloContainer,
  ResumoContainer,
  ButtonsContainer,
  TextoStrong,
  DivConteudoAlinhadoAEsquerda,
  DivConteudoAlinhadoADireita,
  DivDataCriado,
  DivTituloPatrocinador,
  DivTelas,
  DivRedirecionamento,
  DivDatas,
  DivImagem,
  DivTituloTextoAEsquerda,
  DivConteudoAlinhadoEmLinha,
  Texto,
  ContainerImagem,
} from "./ModalDetalhesBanner-estilo";
import { findBannerById } from "../../services/api/fms";
import { useEffect, useState } from "react";
import { stringParaData } from "../../telas/gerirBanners/GerirBanners";
import { nomeCaptalizeFirstLetter } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  incrementLoad,
  decrementLoad,
  setToastType,
  setToastMessage,
} from "../../redux/reducer";

const telas = [
  { nome: "INICIO_PRODUTOR", id: 7, label: "TELA INICIAL PRODUTOR" },
  { nome: "INICIO_CTV", id: 5, label: "TELA INICIAL CTV" },
  { nome: "SEGMENTOS", id: 1, label: "CATÁLOGO DE PRODUTOS" },
  { nome: "PRODUTOS", id: 4, label: "CATEGORIA DE PRODUTOS" },
  { nome: "SERVICOS", id: 2, label: "CATÁLOGO DE SERVIÇOS" },
  { nome: "PRODUTO", id: 3, label: "PRODUTOS" },
  { nome: "MERCADO", id: 8, label: "MERCADO" },
  { nome: "CONTATO", id: 6, label: "CONTATO" },
];

const listaDirecionamento = [
  { nome: "Tela inicial", id: "INICIO" },
  { nome: "Tela de mercado", id: "MERCADO" },
  { nome: "Tela de catálogo - tela geral", id: "CATALOGO" },
  { nome: "Tela de Catálogo - produto específico", id: "PRODUTO" },
  { nome: "Tela de Serviços- serviço específico", id: "SERVICO" },
  { nome: "Link Externo", id: "EXTERNO" },
];

const getCorPorStatus = (status) => {
  return status === "Ativo"
    ? "#33B14F"
    : status === "Expirado"
    ? "#FF8A00"
    : "#040404";
};

const getStatusBanner = (data, ativo) => {
  return new Date() > stringParaData(data)
    ? "Expirado"
    : ativo
    ? "Ativo"
    : "Inativo";
};

const getSegmentoBanner = (agricultura, pecuaria) => {
  return agricultura && pecuaria
    ? "Agricultura, Pecuária"
    : agricultura
    ? "Agricultura"
    : pecuaria
    ? "Pecuária"
    : "-";
};

const ModalDetalhesBanner = ({ bannerId, open, onClose, onClick }) => {
  const [dadosBanner, setDadosBanner] = useState({});
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buscarDadosBanner = async () => {
    try {
      dispatch(incrementLoad());
      const dados = await findBannerById(bannerId);
      setDadosBanner({
        id: dados.id || "-",
        status:
          getStatusBanner(dados.dataExclusaoFormatada, dados.ativo) || "-",
        criacao: dados.dataCriacaoFormatada || "-",
        autor: nomeCaptalizeFirstLetter(dados.nomeAutor) || "-",
        titulo: dados.titulo || "-",
        segmento: getSegmentoBanner(dados.agricultura, dados.pecuaria) || "-",
        regional:
          dados.regionais
            .map((regional) => regional.nome)
            .toString()
            .replace(/\,/g, ", ") || "-",
        filial:
          dados.filiais
            .map((filial) => filial.nome)
            .toString()
            .replace(/\,/g, ", ") || "-",
        patrocinador: dados.patrocinador || "-",
        telas: dados.telas || [],
        redirecionamento: dados.redirecionamento || "-",
        linkRedirecionamento: dados.linkRedirecionamento || "-",
        produto: dados.produto?.descricao || "-",
        servico: dados.servico?.descricao || "-",
        publicacao: dados.dataPublicacaoFormatada || "-",
        exclusao: dados.dataExclusaoFormatada || "-",
        imagem: dados.imagem || "-",
      });
      setDadosCarregados(true);
    } catch (error) {
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Erro interno!"));
      fecharModal();
    } finally {
      dispatch(decrementLoad());
    }
  };

  useEffect(() => {
    if (open) buscarDadosBanner();
  }, [open]);

  const fecharModal = () => {
    setDadosCarregados(false);
    setDadosBanner({});
    onClose();
  };
  return (
    <Modal
      open={open && dadosCarregados}
      onClose={() => fecharModal()}
      style={{
        zIndex: 999999999,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogContainer>
        <TituloContainer>
          <DivConteudoAlinhadoAEsquerda>
            <TextoStrong>Resumo:</TextoStrong>
            <Texto>{`Id ${dadosBanner.id || ""}`}</Texto>
          </DivConteudoAlinhadoAEsquerda>
          <DivConteudoAlinhadoADireita>
            <TextoStrong>Status: </TextoStrong>
            <Texto style={{ color: getCorPorStatus(dadosBanner.status) }}>
              {dadosBanner.status}
            </Texto>
          </DivConteudoAlinhadoADireita>
        </TituloContainer>
        <ResumoContainer>
          <DivDataCriado>
            <DivTituloTextoAEsquerda>
              <TextoStrong>Data de criação:</TextoStrong>
              <Texto>{dadosBanner.criacao}</Texto>
            </DivTituloTextoAEsquerda>
            <DivTituloTextoAEsquerda>
              <TextoStrong>Criado por:</TextoStrong>
              <Texto>{dadosBanner.autor}</Texto>
            </DivTituloTextoAEsquerda>
          </DivDataCriado>
          <DivTituloPatrocinador>
            <DivConteudoAlinhadoEmLinha>
              <TextoStrong>Título do Banner:</TextoStrong>
              <Texto>{dadosBanner.titulo}</Texto>
            </DivConteudoAlinhadoEmLinha>
            <DivConteudoAlinhadoEmLinha>
              <TextoStrong>Segmentos:</TextoStrong>
              <Texto>{dadosBanner.segmento}</Texto>
            </DivConteudoAlinhadoEmLinha>
            <DivConteudoAlinhadoEmLinha>
              <TextoStrong>Regionais:</TextoStrong>
              <Texto>{dadosBanner.regional}</Texto>
            </DivConteudoAlinhadoEmLinha>
            <DivConteudoAlinhadoEmLinha>
              <TextoStrong>Filiais:</TextoStrong>
              <Texto>{dadosBanner.filial}</Texto>
            </DivConteudoAlinhadoEmLinha>
            <DivConteudoAlinhadoEmLinha>
              <TextoStrong>Patrocinador:</TextoStrong>
              <Texto>{dadosBanner.patrocinador}</Texto>
            </DivConteudoAlinhadoEmLinha>
          </DivTituloPatrocinador>
          <DivTelas>
            <TextoStrong>Telas de exibição:</TextoStrong>
            {dadosBanner?.telas?.map((tela, index) => (
              <Texto key={index}>
                {telas.find((item) => item.id === tela.id).label}
              </Texto>
            ))}
          </DivTelas>
          <DivRedirecionamento>
            <DivTituloTextoAEsquerda>
              <TextoStrong>
                Para onde esse banner redireciona o usuário:
              </TextoStrong>
              <Texto>
                {
                  listaDirecionamento.find(
                    (item) => item.id === dadosBanner.redirecionamento
                  )?.nome
                }
              </Texto>
            </DivTituloTextoAEsquerda>
            {dadosBanner.redirecionamento === "PRODUTO" && (
              <DivTituloTextoAEsquerda>
                <TextoStrong>Produto:</TextoStrong>
                <Texto>{dadosBanner.produto}</Texto>
              </DivTituloTextoAEsquerda>
            )}
            {dadosBanner.redirecionamento === "SERVICO" && (
              <DivTituloTextoAEsquerda>
                <TextoStrong>Serviço:</TextoStrong>
                <Texto>{dadosBanner.servico}</Texto>
              </DivTituloTextoAEsquerda>
            )}
            {dadosBanner.redirecionamento === "EXTERNO" && (
              <DivTituloTextoAEsquerda>
                <TextoStrong>Link:</TextoStrong>
                <Texto>{dadosBanner.linkRedirecionamento}</Texto>
              </DivTituloTextoAEsquerda>
            )}
          </DivRedirecionamento>
          <DivDatas>
            <DivTituloTextoAEsquerda>
              <TextoStrong>Data de publicação:</TextoStrong>
              <Texto>{dadosBanner.publicacao}</Texto>
            </DivTituloTextoAEsquerda>
            <DivTituloTextoAEsquerda>
              <TextoStrong>Data de exclusão:</TextoStrong>
              <Texto>{dadosBanner.exclusao}</Texto>
            </DivTituloTextoAEsquerda>
          </DivDatas>
          <DivImagem>
            <ContainerImagem>
              <TextoStrong>Preview do banner:</TextoStrong>
              <img
                src={dadosBanner.imagem}
                alt="Imagem banner"
                width="100%"
                style={{ marginTop: 10 }}
              ></img>
            </ContainerImagem>
          </DivImagem>
        </ResumoContainer>
        <ButtonsContainer>
          <Button
            variant="outlined"
            disabled={dadosBanner.status === "Expirado"}
            style={{ width: "40%", height: 50 }}
            onClick={() => {
              navigate(`/configurador/banner/${dadosBanner.id}`);
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{ width: "40%", height: 50 }}
            onClick={() => fecharModal()}
          >
            Fechar
          </Button>
        </ButtonsContainer>
      </DialogContainer>
    </Modal>
  );
};

export default ModalDetalhesBanner;
