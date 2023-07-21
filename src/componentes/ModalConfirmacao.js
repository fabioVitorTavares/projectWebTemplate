import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";

const ModalConfirmação = ({
  open,
  onClose,
  texto,
  botao1,
  botao2,
  onClick1,
  onClick2,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Slide}
      keepMounted
      aria-describedby="alert-confirm"
      style={{ zIndex: 999999999 }}
    >
      <DialogContent>
        <DialogContentText id="alert-confirm">{texto}</DialogContentText>
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button variant="outlined" onClick={() => onClick1()}>
          {botao1}
        </Button>
        <Button variant="contained" onClick={() => onClick2()}>
          {botao2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmação;
