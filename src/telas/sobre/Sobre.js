import React from "react";
import { CardConteudoSobre, DivGeral, SpanTexto, SpanTitulo, SpanTextoNegrito } from "./sobre-estilo";
import { useNavigate } from "react-router-dom";

const Sobre = () => {
  const navigate = useNavigate();
  return (
    <div className="background-degrade-fundo">
      <DivGeral>
        <SpanTitulo>
          Sistema de Apoio a Caracterização de Imóveis Rurais
        </SpanTitulo>
        <CardConteudoSobre>
          <SpanTexto>
             O <strong>"Sistema de Apoio a Caracterização de Imóveis Rurais”</strong> foi desenvolvido por meio
            de trabalhos da Plataforma ABC visando estabelecer um Sistema de Monitoramento, Relato
            e Verificação da adoção de tecnologias de baixa emissão de carbono dentro do desafio de
            aumentar a produtividade agrícola e atender às demandas regulatórias de enfrentamento da
            crise climática global.
          </SpanTexto>
          <SpanTexto>
             A aplicação destina-se a apresentar um panorama das características ambientais de
            imóveis rurais cadastrados no CAR. Esta avaliação permite verificar, em grande escala, as
            características de aptidão agrícola do imóvel rural, confrontos com unidades de conservação
            e terras indígenas, quantidade de vegetação natural do imóvel, além de apresentar históricos
            de uso da terra e da qualidade das pastagens desde 2008.
          </SpanTexto>
          <SpanTexto>
            Para a utilização do serviço o usuário deve informar o número da matrícula do imóvel
            no Cadastro Ambiental Rural - CAR e também existe a opção de fornecer o nome da
            propriedade a qual é utilizada exclusivamente nos mapas e documentos entregues ao
            usuário, sem qualquer registro nas bases de dados da Embrapa.
          </SpanTexto>
          <SpanTexto>
             O serviço disponibiliza os mapas de uso atual do imóvel rural, aptidão agrícola,
            declividade, histórico de uso, histórico das pastagens, e tabelas que apresentam as
            características ambientais do imóvel rural e os históricos de uso e cobertura do imóvel e da
            qualidade das pastagens desde 2008. Esses resultados permitem identificar se o imóvel
            atende aos requisitos iniciais para uma produção agropecuária sustentável. Com isso, é
            fornecido um mapeamento das variáveis ambientais dentro do imóvel rural e relatórios com
            a tabulação dessas áreas. Informações de emissões de carbono devido à gestão do imóvel
            poderão ser obtidas no serviço GHG Protocolo [Inserir URL do Serviço: será encaminhado à
            empresa].
          </SpanTexto>
          <SpanTexto>
            Foram utilizados os dados espaciais (mapas) de Aptidão agrícola das terras, Unidades
            de conservação, Terras indígenas, limites políticos, limites das propriedades com acesso
            público (CAR), declividade, de uso da terra e de qualidades das pastagens para entregar esse
            produto ao produtor rural. Todos os dados utilizados são de livre acesso e foram obtidos com
            as instituições responsáveis pela disponibilização de cada informação.
          </SpanTexto>
          <SpanTexto>
            O serviço sobrepõe todos esses mapas com os limites do imóvel rural. Para isso, são
            utilizadas ferramentas computacionais de processamento da informação espacial com
            métodos que garantem a confiabilidade da informação gerada, considerando-se as questões
            de escala e os dados de origem.
          </SpanTexto>
          <SpanTextoNegrito>
            Parcerias
          </SpanTextoNegrito>
          <SpanTexto>
            O desenvolvimento dessa aplicação foi realizado com o apoio da <a href="https://www.embrapa.br/solos" target="_blank">Embrapa Solos</a>,
            <a href="https://www.embrapa.br/agricultura-digital" target="_blank">Embrapa Informática Digital</a>, <a href="https://www.embrapa.br/meio-ambiente" target="_blank">Embrapa Meio Ambiente</a> e <a href="https://portal.ufrrj.br/" target="_blank">Universidade Federal Rural do Rio de
            Janeiro - UFRRJ.</a> Os resultados do modelo de integração foram validados em projetos junto à
            cadeia produtiva. Os recursos financeiros para a disponibilização do <strong>"Sistema de Apoio a
            Caracterização de Imóveis Rurais”</strong> na Web foram oriundos do <a href="https://www.ruralsustentavel.org/" target="_blank">Projeto PRS Cerrados.</a>
          </SpanTexto>
          <SpanTexto>
            Os autores estendem sinceros agradecimentos ao <a href="https://mapbiomas.org/" target="_blank">Projeto Mapbiomas</a>, ao <a href="https://lapig.iesa.ufg.br/" target="_blank">LAPIG/UFG</a>
            e ao <a href="https://www.gov.br/inpe/pt-br" target="_blank">INPE</a> pela disponibilização de dados essenciais à qualidade da caracterização dos imóveis
            rurais.
          </SpanTexto>
          <a href="" onClick={() => navigate('/referencias')}>
            Referências
          </a>
        </CardConteudoSobre>
      </DivGeral>
    </div>
  );
};

export default Sobre;
