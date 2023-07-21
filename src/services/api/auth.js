import axios from "axios";
import { BASE_URL } from "../common";
import { getData } from "../../storage/localStorage";
import { LensTwoTone } from "@material-ui/icons";

export const gateway = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 60000,
  headers: {
    "content-type": "application/json",
    "x-api-key": "97b69e09-02e0-4301-b9fb-54bd8829f550",
  },
});

export const logar = (dados) => {
  return gateway.post("/authenticate", dados);
};

export const account = (token) => {
  return gateway.get("/account", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const criarUsuario = async (body) => {
  const token = await getData("token");
  return gateway.post("/admin/users", body, {
    headers: {
      Authorization: "Bearer " + token.replaceAll(`"`, ""),
    },
  });
};

export const getTelasPermitidasByUserId = async (id, token) => {
  const { data } = await gateway.get(`/screen/getAllByUserId/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!data.length) throw new Error("Erro de acesso");
  return data;
};

export const editarUsuario = async (body) => {
  console.log("body", body);
  const token = await getData("token");
  const response = await gateway.post("/account/users-registered/edit", body, {
    headers: {
      Authorization: "Bearer " + token.replaceAll(`"`, ""),
    },
  });
  return response;
};

export const getProdutoresAtivos = async (filtro) => {
  try {
    const token = getData("token");
    const response = await gateway.post(
      "/account/users-registered/list",
      filtro,
      {
        headers: {
          Authorization: "Bearer " + token.replaceAll(`"`, ""),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Erro getProdutoresAtivos :", error);
    return { data: [] };
  }
};

export const postInativarProdutor = async (userId) => {
  try {
    const token = getData("token");
    const response = await gateway.post(
      "/account/users-registered/edit-active-status",
      { userId, status: false },
      {
        headers: {
          Authorization: "Bearer " + token.replaceAll(`"`, ""),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Erro inativarProdutor :", error);
  }
};
