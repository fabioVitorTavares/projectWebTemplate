import { Pagination, TableFooter, TableSortLabel, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ComboButtons from "../componentes/ComboButtons";
import Up from "@mui/icons-material/ArrowUpwardOutlined";
import Down from "@mui/icons-material/ArrowDownwardOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#024634",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TabelaPaginada = ({
  colunas = [],
  dados = [],
  showAcoes = true,
  acoes = [],
  showPaginacao = true,
  paginaAtual = 1,
  quantidadePaginas = 0,
  onChangePagina = () => {},
}) => {
  const [colunasInterno, setColunasInterno] = useState([]);
  useEffect(() => {
    setColunasInterno([...colunas]);
  }, []);
  const handleSort = (index) => {
    const colunasAux = colunasInterno;
    const novaOrdem = colunasAux[index].ordem === "ASC" ? "DESC" : "ASC";
    colunasAux[index].ordem = novaOrdem;
    setColunasInterno([...colunasAux]);
    colunas[index].handleSort(novaOrdem);
  };
  const CustomSortIcon = ({ direction }) => {
    return direction === "ASC" ? (
      <Down style={{ color: "white" }} />
    ) : (
      <Up style={{ color: "white" }} />
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {colunasInterno.map((coluna, index) => (
                <StyledTableCell key={index}>
                  {coluna.ativarOrdenacao ? (
                    <TableSortLabel
                      style={{ color: "#FFFFFF" }}
                      active={true}
                      IconComponent={() => (
                        <CustomSortIcon direction={coluna.ordem} />
                      )}
                      onClick={() => handleSort(index)}
                    >
                      {coluna.nome}
                    </TableSortLabel>
                  ) : (
                    <>{coluna.nome}</>
                  )}
                </StyledTableCell>
              ))}
              {showAcoes && (
                <StyledTableCell align="right">Ações</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          {!!dados.length && (
            <TableBody>
              {dados.map((row, index) => (
                <StyledTableRow key={index}>
                  {Object.keys(row).map((chave, key) => (
                    <StyledTableCell component="th" scope="row" key={key}>
                      {row[chave]}
                    </StyledTableCell>
                  ))}
                  {showAcoes && (
                    <StyledTableCell component="th" scope="row" align="right">
                      <ComboButtons options={acoes} row={row} />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!dados.length && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <span>Nenhum registro encontrado.</span>
        </div>
      )}
      {showPaginacao && !!dados.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            color="primary"
            count={quantidadePaginas}
            page={paginaAtual + 1}
            onChange={(event, value) => onChangePagina(value - 1)}
            style={{ marginTop: 10 }}
          />
        </div>
      )}
    </>
  );
};
