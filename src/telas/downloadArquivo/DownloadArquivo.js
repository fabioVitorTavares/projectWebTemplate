import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../services/common";
import { useParams } from "react-router-dom";
import LogoIbi from "../../assets/icone-ibi.png";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { TextoPagina } from "./downloadArquivo-estilo";

const DownloadArquivo = () => {
  const { id, tipo } = useParams();
  const [urlDownload] = useState(
    `${BASE_URL}/services/fms/api/fms/pedido/${
      tipo === "nf" ? "downloadNfe" : "downloadBoleto"
    }/${id}${tipo === "nf" ? "/0" : ""}`
  );
  const [loading, setLoading] = useState(false);
  const [baixar, setBaixar] = useState(false);
  const [boleto, setBoleto] = useState(null);
  const [erroDownload, setErroDownload] = useState(true);

  useEffect(() => {
    setBaixar(true);
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  useEffect(() => {
    if (baixar) {
      download();
    }
  }, [baixar]);

  const download = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlDownload);
      const blob = await response.blob();
      if (blob.type.includes("problem")) {
        setLoading(false);
        return;
      }
      const downloadUrl = URL.createObjectURL(blob);
      setBoleto(downloadUrl);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${tipo}-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      setErroDownload(false);
      console.log(
        `https://docs.google.com/viewer?url=${encodeURIComponent(
          urlDownload
        )}&embedded=true`
      );
    } catch (e) {
      setLoading(false);
      setErroDownload(true);
    }
  };

  const TelaCarregamento = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        gap: 40,
      }}
    >
      <img
        src={LogoIbi}
        alt="Minha Imagem"
        style={{
          width: 100,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextoPagina>Seu documento está sendo</TextoPagina>
        <TextoPagina>processado e aparecerá para você</TextoPagina>
        <TextoPagina>em alguns segundos.</TextoPagina>
      </div>
      <TextoPagina>Por favor não feche essa janela.</TextoPagina>
    </div>
  );

  const TelaErroDownload = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <img
        src={LogoIbi}
        alt="Minha Imagem"
        style={{
          width: 100,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextoPagina>O documento solicitado não foi</TextoPagina>
        <TextoPagina>encontrado ou está indisponível.</TextoPagina>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextoPagina>Para mais informações entre em contato</TextoPagina>
        <TextoPagina>com seu CTV ou com o atendimento da</TextoPagina>
        <TextoPagina
          style={{ color: "#00EBB3", fontSize: 18, fontWeight: "bold" }}
        >
          Agro Amazônia.
        </TextoPagina>
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#024634",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
            gap: "20px",
          }}
        >
          {loading ? (
            <TelaCarregamento />
          ) : (
            <div>
              {erroDownload ? (
                <TelaErroDownload />
              ) : (
                <div
                  style={{
                    height: "100vh",
                    width: "95vw",
                    overflow: "auto",
                    marginTop: 20,
                  }}
                >
                  <Document
                    file={boleto}
                    onLoadSuccess={(e) => {
                      setTimeout(() => {
                        const element = document.querySelector(
                          ".react-pdf__Page__textContent"
                        );
                        if (element) {
                          element.remove("react-pdf__Page__textContent");
                        }
                      }, 200);
                    }}
                    onError={() => setErroDownload(true)}
                    renderMode="canvas"
                    options={{
                      cMapUrl: "cmaps/",
                      cMapPacked: true,
                    }}
                  >
                    <Page pageNumber={1} scale={0.7} />
                  </Document>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadArquivo;
