import React, { useEffect, useState } from "react";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import EditIcon from "@mui/icons-material/Edit";
import ForwardIcon from "@mui/icons-material/Forward";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { ChevronLeft } from "@material-ui/icons";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabelaPaginada } from "../../componentes/TabelaPaginada";
import {
  alterarStatusNotificacao,
  findNotification,
  findNotificationById,
  saveNotificacao,
} from "../../services/api/fms";
import { useDispatch } from "react-redux";
import {
  decrementLoad,
  incrementLoad,
  setPaginaAtual,
  setToastMessage,
  setToastType,
} from "../../redux/reducer";
import {
  DivLimpa,
  DivPesquisarENovaNotificacao,
  DivSubTituloPagina,
  DivTabelaPaginada,
  DivTitulo,
  SpanSubTitulPagina,
  SpanTitulo,
} from "./enviar-notificacoes-estilo";
import moment from "moment";
import ModalConfirmação from "../../componentes/ModalConfirmacao";
import { stringParaData } from "../gerirBanners/GerirBanners";

const EnviarNotificacoes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(0);
  const [idSelecionado, setIdSelecionado] = useState();
  const [totalPages, settotalPages] = useState(0);
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtroAlterado, setFiltroAlterado] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [textoModal, setTextoModal] = useState("");
  const [tipoAcao, setTipoAcao] = useState("");
  const [filtro, setFiltro] = useState({
    dataCriacaoFim: null,
    dataCriacaoInicio: null,
    dataDisparoFim: null,
    dataDisparoInicio: null,
    dataAgendamento: null,
    dataCriacao: null,
    autorId: null,
    titulo: null,
    publico: null,
    ordemDirecao: null,
    ordem: null,
    pagina: pagina,
  });

  const colunasTabela = [
    {
      nome: "ID",
      ativarOrdenacao: false,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem da data de criação:>> ", value);
      },
    },
    {
      nome: "Data de criação",
      ativarOrdenacao: true,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem da data de criação:>> ", value);
        setFiltro({
          ...filtro,
          ordem: "dataCriacao",
          ordemDirecao: value,
        });
      },
    },
    {
      nome: "Título da notificação",
      ativarOrdenacao: true,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem da notificação:>> ", value);
        setFiltro({
          ...filtro,
          ordem: "titulo",
          ordemDirecao: value,
        });
      },
    },
    {
      nome: "Data do disparo",
      ativarOrdenacao: true,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem data do disparo:>> ", value);
        setFiltro({
          ...filtro,
          ordem: "dataAgendamento",
          ordemDirecao: value,
        });
      },
    },
    {
      nome: "Publicado por",
      ativarOrdenacao: true,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem do responsavel:>> ", value);
        setFiltro({
          ...filtro,
          ordem: "autor",
          ordemDirecao: value,
        });
      },
    },
    {
      nome: "Público",
      ativarOrdenacao: false,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem do publico:>> ", value);
      },
    },
    {
      nome: "Status",
      ativarOrdenacao: false,
      ordem: "asc",
      handleSort: (value) => {
        console.log("trocou ordem do status:>> ", value);
      },
    },
  ];

  const optionsCombo = [
    {
      nome: (row) => "Reenviar",
      icon: () => <ForwardIcon />,
      desabilitarOpcao: (row) => (row.status === "ATIVO" ? false : true),
      onClick: (user) => {
        setIdSelecionado(user.id);
        setTipoAcao("REENVIAR");
        setTextoModal("Deseja reenviar a notificação?");
        setModalConfirmacao(true);
      },
    },
    {
      nome: (row) => "Editar",
      icon: () => <EditIcon fontSize="5" />,
      desabilitarOpcao: (row) => row.status !== "PROGRAMADO",
      onClick: (user) => {
        navigate(`/prenotificacao/${user.id}`, {
          state: {
            idNotificacao: user.id,
          },
        });
      },
    },
    {
      nome: (row) => "Desativar",
      icon: () => <SpeakerNotesOffIcon fontSize="5" />,
      desabilitarOpcao: (row) => (row.status === "INATIVO" ? true : false),
      onClick: (user) => {
        setIdSelecionado(user.id);
        setTipoAcao("DESATIVAR");
        setTextoModal(`Desativar notificação: ${user.titulo}`);
        setModalConfirmacao(true);
      },
    },
  ];

  useEffect(() => {
    dispatch(setPaginaAtual("Enviar Notificações"));
  }, []);

  const publicoNotificacao = (notificacao) => {
    if (notificacao?.publicoCtv && notificacao?.publicoCliente) {
      return "CTV / Clientes";
    } else if (!notificacao?.publicoCtv && notificacao?.publicoCliente) {
      return "Clientes";
    } else if (notificacao?.publicoCtv && !notificacao?.publicoCliente) {
      return "CTV";
    }
    return "-";
  };

  const pesquisar = async () => {
    dispatch(incrementLoad());
    const {
      data: { content, totalPages },
    } = await findNotification(filtro);

    setNotificacoes(
      content.map((notificacao) => {
        return {
          id: notificacao?.id,
          dataCriacao: notificacao?.dataCriacaoFormatada,
          titulo: notificacao?.titulo,
          dataDisparo: notificacao?.dataAgendamentoFormatada,
          responsavel: notificacao?.autorNome,
          publico: publicoNotificacao(notificacao),
          status: notificacao?.status || "-",
        };
      })
    );
    settotalPages(totalPages);
    if (filtroAlterado) {
      setPagina(0);
    }
    setFiltroAlterado(false);
    dispatch(decrementLoad());
  };

  useEffect(() => {
    setFiltroAlterado(true);
    pesquisar();
  }, [filtro]);

  useEffect(() => {
    setFiltro({
      ...filtro,
      pagina: pagina,
    });
  }, [pagina]);

  const reenviar = async () => {
    setModalConfirmacao(false);
    try {
      const notificacaoReenviar = await findNotificationById(idSelecionado);
      const notificacao = {
        textoInformativoNotificacao:
          notificacaoReenviar?.textoInformativo || null,
        segmentoAgricultura: notificacaoReenviar?.segmentoAgricultura,
        periodoNotificacao: notificacaoReenviar?.periodoDiaNotificacao || null,
        segmentoPecuaria: notificacaoReenviar?.segmentoPecuaria,
        publicoCliente: notificacaoReenviar?.publicoCliente,
        publicadaAto: true,
        dataAgendamento:
          stringParaData(notificacaoReenviar?.dataAgendamentoFormatada) || null,
        dataExclusao:
          stringParaData(notificacaoReenviar?.dataExclusaoFormatada) || null,
        publicoCtv: notificacaoReenviar?.publicoCtv,
        filiais: notificacaoReenviar?.filiais,
        conteudo: notificacaoReenviar?.conteudo,
        titulo: notificacaoReenviar?.titulo,
        image: notificacaoReenviar?.imagemPublicacao || null,
        autorId: notificacaoReenviar?.autorId,
        autorNome: notificacaoReenviar?.autorNome,
        redirecionamento: notificacaoReenviar?.redirecionamento,
        linkRedirecionamento: notificacaoReenviar?.linkRedirecionamento || null,
        buttonName: notificacaoReenviar?.buttonNome || null,
        produtoId: notificacaoReenviar?.produto?.idProduto || null,
        servicoId: notificacaoReenviar?.servico?.idServico || null,
      };

      dispatch(incrementLoad());
      const responseSave = await saveNotificacao(notificacao);
      dispatch(decrementLoad());
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Notificação reenviada com sucesso!"));
      pesquisar();
    } catch (erro) {
      console.log("ERRO :>> ", erro);
      dispatch(decrementLoad());
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Ocorreu um erro ao reenviar a notificação."));
    }
  };

  const desativar = async () => {
    setModalConfirmacao(false);
    try {
      const objeto = {
        id: idSelecionado,
        status: "INATIVO",
      };

      dispatch(incrementLoad());
      const resultStatus = await alterarStatusNotificacao(objeto);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Notificação desativada com sucesso!"));
      pesquisar();
      dispatch(decrementLoad());
    } catch (erro) {
      console.log("ERRO :>> ", erro);
      dispatch(decrementLoad());
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Ocorreu um erro ao desativar a notificação."));
    }
  };

  return (
    <div className="container-pagina">
      <ModalConfirmação
        open={modalConfirmacao}
        texto={textoModal}
        botao1="Cancelar"
        botao2="Confirmar"
        onClick1={() => {
          setIdSelecionado("");
          setModalConfirmacao(false);
        }}
        onClick2={() => (tipoAcao === "REENVIAR" ? reenviar() : desativar())}
      />
      <DivTitulo>
        <Button
          variant="contained"
          onClick={() => navigate("/configurador/inicio")}
        >
          <ChevronLeft style={{ color: "white", fontSize: 30 }} />
        </Button>
        <SpanTitulo>Envio de Notificações</SpanTitulo>
      </DivTitulo>
      <DivPesquisarENovaNotificacao>
        <DivLimpa>
          <TextField
            label="Título"
            variant="outlined"
            placeholder="Pesquise pelo título da notificação"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: 10, width: "40vw" }}
            onChange={(event) => {
              setPagina(0);
              setFiltro({ ...filtro, titulo: event?.target?.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                pesquisar();
              }
            }}
          />
          <Button
            style={{
              height: "100%",
              fontSize: "large",
            }}
            variant="contained"
            color="primary"
            onClick={() => pesquisar()}
          >
            Pesquisar
          </Button>
        </DivLimpa>
        <DivLimpa>
          <Button
            style={{
              height: "100%",
              fontSize: "large",
            }}
            variant="contained"
            onClick={() => navigate("/prenotificacao")}
          >
            <MarkUnreadChatAltIcon
              style={{ color: "white", marginRight: 10 }}
            />
            Nova Notificação
          </Button>
        </DivLimpa>
      </DivPesquisarENovaNotificacao>
      <DivSubTituloPagina>
        <SpanSubTitulPagina>
          <span>Histórico de Notificações</span>
        </SpanSubTitulPagina>
      </DivSubTituloPagina>
      <DivTabelaPaginada>
        <TabelaPaginada
          colunas={colunasTabela}
          dados={notificacoes}
          showAcoes={true}
          acoes={optionsCombo}
          showPaginacao={true}
          paginaAtual={pagina}
          quantidadePaginas={totalPages}
          onChangePagina={setPagina}
        />
      </DivTabelaPaginada>
    </div>
  );
};

export default EnviarNotificacoes;
