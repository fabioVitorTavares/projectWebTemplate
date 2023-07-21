import { styled, css } from "styled-components";

export const TituloHeader = styled.span`
    color: #024634;
    margin-right: 40px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s ease;

    ${props =>
    props.temBorder &&
    css`
      border-bottom: 2px solid #696969;
      color: #696969;
    `}
`;
