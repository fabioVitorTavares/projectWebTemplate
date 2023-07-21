import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { useEffect, useState } from "react";
import "./pdfStyles.css";
import imagem from "./img.png";
import { useParams } from "react-router-dom";
import { imgBase64 } from "../../utils/imgBase64Teste";
import { incrementLoad, decrementLoad } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
const data = {
  titulo: "Título do pdf",
  subTitulo: "Subtitulo do pdf This is a header, using header style",
  texto:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis  nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efciat  sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi  diogenem dixerit logikh levius probabo adipiscuntur afcitur, factis magistra inprobitatem aliquo  andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem  operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque  dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca  sedatio aliena video.",
};

const dadosTabela = [
  { index: 1, nome: "Série História" },
  { index: 2, nome: "Cartograma" },
  { index: 3, nome: "Tabela Sintese" },
];

export default function Pdf(route) {
  const dispatch = useDispatch();
  const load = useSelector((state) => state.persistedReducer.load);
  const [dataUrl, setDataUrl] = useState("");
  const [base64ImgLocal, setbase64ImgLocal] = useState("");
  const { id } = useParams();

  const dadoSelecionado = dadosTabela.find((o) => o.index == id);

  useEffect(() => {
    loadPdf();
  }, [base64ImgLocal]);

  async function getBase64(img) {
    const imgUrl = await fetch(img);
    const blobImg = await imgUrl.blob();
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blobImg);
    });
    setbase64ImgLocal(result);
  }

  //Definição do documento pdf
  const doc = {
    content: [
      {
        text: dadoSelecionado.nome,
        style: "header",
      },
      "\n", //Quebra de linha
      {
        text: data.subTitulo,
        style: "subheader",
      },
      "\n", //Quebra de linha
      data.texto,
      "\n", //Quebra de linha
      {
        stack: [
          "Titulo da lista",
          {
            ul: ["item 1", "item 2", "item 3"],
          },
        ],
      },
      {
        table: {
          body: [
            ["Lista dentro da tabela", "Tabela dentro da tabela"],
            [
              {
                stack: [
                  "Titulo da lista",
                  {
                    ul: ["item 1", "item 2", "item 3"],
                  },
                ],
              },
              {
                table: {
                  body: [
                    ["Col1", "Col2", "Col3"],
                    ["1", "2", "3"],
                    ["1", "2", "3"],
                  ],
                },
              },
            ],
          ],
        },
      },
      "\n",
      {
        table: {
          body: [["Tabela de apenas uma linha!"]],
        },
      },
      "\n",
      {
        table: {
          body: [
            ["Imagen base 64", "Imagen png no diretório"],
            [
              {
                image: imgBase64,
                width: 150,
              },
              base64ImgLocal
                ? {
                    image: base64ImgLocal,
                    width: 150,
                  }
                : "-",
            ],
          ],
        },
      },
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: "center",
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
    },
  };

  async function loadPdf() {
    try {
      dispatch(incrementLoad());
      await getBase64(imagem);
      const pdf = pdfMake.createPdf(doc).open();
      pdf.getDataUrl((url) => {
        setDataUrl(url);
      });

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1000);
      });
      dispatch(decrementLoad());
    } catch (e) {
      console.log("Erro ao carregar pdf: ", e);
      dispatch(decrementLoad());
    }
  }

  return (
    <div>
      <iframe className="iframePdf" src={dataUrl} />
    </div>
  );
}
