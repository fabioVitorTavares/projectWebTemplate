import styled from "styled-components";

export const DialogContainer = styled.div`
  width: 500px;
  height: 80vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ecf0f6;
  padding: 0 20px 0 20px;
`;

export const TituloContainer = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  align-items: end;
  padding: 0 10px 10px 10px;
  justify-content: space-between;
`;

export const DivConteudoAlinhadoAEsquerda = styled.div`
  width: 50%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  overflow: hidden;
`;

export const DivTituloTextoAEsquerda = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export const DivConteudoAlinhadoADireita = styled.div`
  width: 50%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  padding: 0 10px 0 10px;
`;

export const TextoStrong = styled.p`
  font-size: 16px;
  font-weight: bold;
  height: min-content;
  margin: 0;
`;

export const Texto = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const ResumoContainer = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: auto;
  border: 0.1px solid #acc6ec;
  background-color: #fff;
  border-radius: 10px;
  padding: 0px 10px 10px 10px;
`;

export const DivDataCriado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const DivTituloPatrocinador = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const DivConteudoAlinhadoEmLinha = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: start;
  gap: 10px;
`;
export const DivTelas = styled.div`
  margin-top: 20px;
  overflow: hidden;
`;
export const DivRedirecionamento = styled.div``;
export const DivDatas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
export const DivImagem = styled.div`
  margin-top: 20px;
`;

export const ContainerImagem = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
