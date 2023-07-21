import ExitIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import AddUserIcon from "@mui/icons-material/PersonAddAltSharp";
import EditUserIcon from "@mui/icons-material/ManageAccounts";
import NotiticationIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import ImageIcon from "@mui/icons-material/InsertPhotoOutlined";

const Icone = ({ nome, size }) => {
  const fontSize = {
    width: size ?? 40,
    fontSize: size ?? 40,
    color: "#024634",
  };

  const icones = {
    inicio: <HomeIcon style={fontSize} />,
    adicionarUsuario: <AddUserIcon style={fontSize} />,
    gerirUsuario: <EditUserIcon style={fontSize} />,
    enviarNotificacoes: <NotiticationIcon style={fontSize} />,
    gerirBanners: <ImageIcon style={fontSize} />,
    sair: <ExitIcon style={{ ...fontSize }} />,
    default: <></>,
  };

  return icones[nome] ?? icones["default"];
};

export default Icone;
