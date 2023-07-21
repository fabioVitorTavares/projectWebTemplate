import { createSlice } from "@reduxjs/toolkit";

const cleanBanner = {
  titulo: "",
  imagemSelecionada: "",
  pecuaria: false,
  agricultura: false,
  patrocinador: "",
  direcionarBanner: "",
  linkRedirecionamento: "",
  dataPublicacao: null,
  publicarAgora: false,
  dataExclusao: null,
  filiaisSelecionadas: [],
  regionaisSelecionadas: [],
  produtoSelecionado: null,
  servicoSelecionado: null,
};

export const reducer = createSlice({
  name: "reducer",
  initialState: {
    load: 0,
    user: {},
    token: "",
    paginaAtual: "",
    paginaAnterior: "",
    paginasSelecionadasBanner: [],
    telasPermitidas: [],
    banner: cleanBanner,
    toastMessage: "",
    toastType: "",
  },
  reducers: {
    setUser: (state, newUser) => {
      state.user = newUser.payload;
    },
    incrementLoad: (state) => {
      state.load++;
    },
    decrementLoad: (state) => {
      state.load--;
    },
    setToken: (state, newToken) => {
      state.token = newToken.payload;
    },
    setPaginaAtual: (state, newPaginaAtual) => {
      state.paginaAnterior = state.paginaAtual;
      state.paginaAtual = newPaginaAtual.payload;
    },
    setPaginasSelecionadasBanner: (state, newPaginasSelecionadas) => {
      state.paginasSelecionadasBanner = newPaginasSelecionadas.payload;
    },
    setTelasPermitidas: (state, newTelasPermitidas) => {
      state.telasPermitidas = newTelasPermitidas.payload;
    },
    setBanner: (state, newBanner) => {
      state.banner = newBanner.payload;
    },
    clearBanner: (state) => {
      state.banner = cleanBanner;
    },
    clearReducer: (state) => {
      state.load = 0;
      state.user = {};
      state.token = "";
      state.paginaAtual = "";
      state.paginaAnterior = "";
      state.paginasSelecionadasBanner = [];
      state.telasPermitidas = [];
      state.banner = cleanBanner;
    },
    setToastMessage: (state, newToastMessage) => {
      state.toastMessage = newToastMessage.payload;
    },
    setToastType: (state, newToastType) => {
      state.toastType = newToastType.payload;
    },
  },
});

export const {
  setUser,
  incrementLoad,
  decrementLoad,
  setToken,
  clearReducer,
  setPaginaAtual,
  setPaginasSelecionadasBanner,
  setTelasPermitidas,
  toastMessage,
  setToastMessage,
  toastType,
  setToastType,
  setBanner,
  clearBanner,
} = reducer.actions;

export default reducer.reducer;
