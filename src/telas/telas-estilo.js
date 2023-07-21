import styled from "styled-components";

export const DivContainerTitulo = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: bottom;
`;

export const SpanTitulo = styled.span`
  margin-left: 30px;
  font-size: 36px;
  color: #024634;
`;

export const DivContainerPagina = styled.div`
  margin-inline: 5vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  background-color: #ecf0f6;
`;

export const DivContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DivDropZone = styled.div`
  border: 2px dashed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  cursor: pointer;
`;

export const Pnome = styled.p`
  color: gray;
  font-style: italic;
  display: flex;
  align-items: center;
`;

export const SelectStyle = styled.select`
  height: 60px;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  border-color: lightgray;
  padding: 5px;
`;
