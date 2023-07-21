import { useLocation } from "react-router-dom";
import Header from "./Header";
import MenuLateral from "./MenuLateral";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage, setToastType } from "../redux/reducer";
import { Alert, Snackbar } from "@mui/material";

export const Sidebar = () => {
  const location = useLocation();
  const [esconderMenu, setEsconderMenu] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const toastMessage = useSelector(
    (state) => state.persistedReducer.toastMessage
  );
  const toastType = useSelector((state) => state.persistedReducer.toastType);

  // TODAS AS ROTAS PRIVADAS DEVEM ESTAR NESSE ARRAY PARA O MENU APARECER
  const rotasPrivadas = [
    "/inicio",
    "/referencias",
    "/gerir-usuario",
    "/adicionar-usuario",
    "/form-adicionar-usuario",
    "/form-editar-usuario",
    "/prenotificacao",
    "/notificacoes",
    "/publicacao-banner",
    "/banner",
    "/enviar-notificacoes",
    "/gerir-banners",
    "/sobre",
    "/contato",
  ];
  useEffect(() => {
    if (rotasPrivadas.some((rota) => location.pathname.includes(rota))) {
      setEsconderMenu(false);
    } else {
      setEsconderMenu(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (toastMessage) {
      setOpenAlert(true);
    }
  }, [toastMessage]);

  return (
    <>
      {!esconderMenu && (
        <div style={{ position: "absolute", zIndex: 9999 }}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openAlert}
            autoHideDuration={5000}
            onClose={() => {
              setOpenAlert(false);
              dispatch(setToastMessage(""));
              dispatch(setToastType(""));
            }}
          >
            <Alert
              onClose={() => {
                setOpenAlert(false);
                dispatch(setToastMessage(""));
              }}
              severity={toastType || "success"}
              sx={{ width: "100%" }}
            >
              {toastMessage}
            </Alert>
          </Snackbar>
          <Header />
          {/* <MenuLateral /> */}
        </div>
      )}
    </>
  );
};
