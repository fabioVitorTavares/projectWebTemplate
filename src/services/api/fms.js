import axios from "axios";
import { BASE_URL } from "../common";
import { getData, setData } from "../../storage/localStorage";

export const fms = axios.create({
  baseURL: `${BASE_URL}/services/fms/api`,
  timeout: 60000,
  headers: {
    "content-type": "application/json",
    "x-api-key": "97b69e09-02e0-4301-b9fb-54bd8829f550",
  },
});

const redirecionaLogin = () => {
  window.location.href = "/configurador/login";
};

// Toda rota privada deve chamar essa função para verificar o Token
const get = async (url) => {
  try {
    const token = await getData("token");
    if (!token) {
      redirecionaLogin();
    }
    fms.defaults.headers.Authorization = `Bearer ${token.replaceAll(`"`, "")}`;
    return await fms.get(url);
  } catch (e) {
    if (e.response.status === 401) {
      redirecionaLogin();
    }
    throw new Error(e);
  }
};

const post = async (url, dado) => {
  try {
    const token = await getData("token");
    if (!token) {
      redirecionaLogin();
    }
    fms.defaults.headers.Authorization = `Bearer ${token.replaceAll(`"`, "")}`;
    return await fms.post(url, dado);
  } catch (e) {
    if (e.response.status === 401) {
      redirecionaLogin();
    }
    throw new Error(e);
  }
};

export const getProdutores = async (idCtv) => {
  try {
    return await fms.get(`/fms/proprietario/getAllCliente/ctv/${idCtv}`);
  } catch (e) {
    if (e.response.status === 401) {
      // window.location.href = "/login";
    }
  }
};

export const getCTVs = async () => {
  try {
    const response = await get(`/fms/ctv/findAll`);
    return response;
  } catch (error) {
    console.log("Erro getCTVs :", error);
  }
};

export const getFazenda = async () => {
  try {
    const response = get("/fms/fazenda/findAll/proprietario/004517");
    return response;
  } catch (error) {
    console.log("Erro getFazenda :", error);
  }
};

export const findSolicitacoes = async (filtro) => {
  try {
    const response = await post("/solicitacoesCadastros/findByFilter", filtro);
    return response;
  } catch (error) {
    console.log("Erro findSolicitacoes", error);
  }
};

export const createSolicitacao = async (novaSolicitacao) => {
  try {
    const response = await post(
      "/solicitacoesCadastros/create",
      novaSolicitacao
    );
    return response;
  } catch (error) {
    console.log("Erro createSolicitacao");
  }
};

export const getListaFiliais = async () => {
  try {
    const response = await get("/fms/filial/findAll");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar filiais :>> ", JSON.stringify(error));
  }
};

export const getListaRegionais = async () => {
  try {
    const response = await get("/fms/regional/findAll");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar regionais :>> ", JSON.stringify(error));
  }
};

export const getAllProdutos = async () => {
  try {
    const response = await get("fms/produto/findAll");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar produtos :>> ", JSON.stringify(error));
  }
};

export const getAllServicos = async () => {
  try {
    const response = await get("fms/servico/findAll");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar serviços :>> ", JSON.stringify(error));
  }
};

export const saveNotificacao = async (objeto) => {
  await post("fms/preNotificacao/create", objeto);
};

export const alterarStatusNotificacao = async (objeto) => {
  await post("fms/preNotificacao/setStatus", objeto);
};

export const saveBanner = async (banner) => {
  const url = banner.id ? "fms/banner/edit" : "fms/banner/save";
  const response = await post(url, banner);
  return response;
};

export const findNotification = async (filtro) => {
  const response = await post("fms/preNotificacao/findAllByFilter", filtro);
  return response;
};

export const findNotificationById = async (id) => {
  try {
    const { data } = await get(`fms/preNotificacao/findById/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar notificacao id: ${id}. ${error}`);
  }
};

export const editNotificacao = async (edit) => {
  await post("fms/preNotificacao/edit", edit);
};

export const findBanners = async (filtro) => {
  try {
    const { data } = await post("fms/banner/findByFilter", filtro);
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar banners. ${error}`);
  }
};

export const findBannerById = async (id) => {
  try {
    const { data } = await get(`fms/banner/find/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar banner id: ${id}. ${error}`);
  }
};

export const alterarStatusBanner = async (idBanner, status) => {
  try {
    const data = await get(`/fms/banner/alterarStatus/${idBanner}/${status}`);
    return data;
  } catch (error) {
    throw new Error(
      `Erro ao alterar status do banner id: ${idBanner}. ${error}`
    );
  }
};
