import React, { useState } from "react";
import {
  DivGeral,
  SpanTitulo,
  DivContainer,
  Texto,
  TextoReferencias,
} from "./referencias-estilo";

const Referencias = () => {
  return (
    <div className="background-degrade-fundo">
      <DivGeral>
        <SpanTitulo>
          Sistema de Apoio a Caracterização de Imóveis Rurais
        </SpanTitulo>
        <DivContainer>
          <TextoReferencias>Referências</TextoReferencias>

          <Texto>
            EMBRAPA. <strong>GeoInfo:</strong> infraestrutura de dados espaciais
            da Embrapa.Disponível em: https://geoinfo.cnps.embrapa.br/. Acesso
            em: 17 jul. 2023."
          </Texto>

          <Texto>
            EMBRAPA SOLOS.{" "}
            <strong>
              Aptidão edáfica para culturas exigentes em terras altas.
            </strong>{" "}
            2009. Disponível em: http://geo.cnpma.embrapa.br. Acesso em: 8 mar.
            2018.
          </Texto>

          <Texto>
            BRASIL. Ministério do Meio Ambiente e Mudança do Clima.{" "}
            <strong>Cadastro Ambiental Rural - CAR: </strong> serviço florestal
            brasileiro.Disponível em: https://www.car.gov.br/#/. Acesso em: 17
            jul. 2023.
          </Texto>

          <Texto>
            BRASIL. Ministério do Meio Ambiente e Mudança do Clima.
            <strong>Unidades de conservação ambiental.</strong> 2023. Download
            de dados geográficos. Disponível em:
            http://mapas.mma.gov.br/i3geo/datadownload.htm. Acesso em: 17 jul.
            2023.
          </Texto>

          <Texto>
            BRASIL. Ministério dos Povos Indígenas. Fundação Nacional dos Povos
            Indígenas.
            <strong>Geoprocessamento e mapas.</strong> Disponível em:
            https://www.gov.br/funai/pt-br/atuacao/terras-indigenas/geoprocessamento-e-mapas/.
            Acesso em: 17 jul. 2023.
          </Texto>

          <Texto>
            IBGE. <strong>Amazônia Legal.</strong> Disponível em
            https://www.ibge.gov.br/geociencias/cartas-e-mapas/mapas-regionais/15819-amazonia-legal.html.
            Acesso em 17 jul. 2023.
          </Texto>

          <Texto>
            IBGE. <strong>Biomas.</strong> Disponível em:
            https://www.ibge.gov.br/geociencias/cartas-e-mapas/informacoes-ambientais/15842-biomas.html?t=acesso-ao
            produto. Acesso em: 17 jul. 2023.
          </Texto>

          <Texto>
            IBGE. <strong>Malha Municipal Brasileira.</strong> Disponível em:
            https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/15774-
            malhas.html. Acesso em: 17 jul. 2023. INSTITUTO NACIONAL DE
            PESQUISAS ESPACIAIS. <strong>TOPODATA:</strong> banco de dados
            geomorfométricos do Brasil. 2011. Disponível em:
            http://www.dsr.inpe.br/topodata/index.php. Acesso em: 15 jan. 2016.
          </Texto>

          <Texto>
            MAPBIOMAS. <strong>Projeto MapBiomas:</strong> qualidade das
            pastagens. V.7.1. Disponível em: https://mapbiomas.org/download/.
            Acesso em: 17 jul. 2023.
          </Texto>

          <Texto>
            {" "}
            MAPBIOMAS. <strong>Projeto MapBiomas:</strong> uso e cobertura das
            terras. V.7.1. Disponível em: https://mapbiomas.org/download. Acesso
            em: 17 jul. 2023.
          </Texto>

          <Texto>
            UNIVERSIDADE FEDERAL DE GOIÁS. Laboratório de Processamento de
            Imagens e Geoprocessamento. <strong>Atlas das pastagens.</strong>{" "}
            Disponível em:
            https://lapig.iesa.ufg.br/p/38972-atlas-das-pastagens. Acesso em: 17
            jul. 2023.
          </Texto>
        </DivContainer>
      </DivGeral>
    </div>
  );
};

export default Referencias;
