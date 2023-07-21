import { Button, Icon } from "@mui/material";
import L, { CRS } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapIcon from "@mui/icons-material/Map";
import CityIcon from "@mui/icons-material/LocationCity";

export const MapaLeaflet = () => {
  const [map, setMap] = useState(null);
  const [layerUf, setLayerUf] = useState(null);
  const [layerCity, setLayerCity] = useState(null);
  const [showLayerUf, setShowLayerUf] = useState(true);
  const [showLayerCity, setShowLayerCity] = useState(true);

  useEffect(() => {
    setLayerUf(buildBaseLayer("terroir:uf"));
    // setLayerSigef(buildBaseLayer("terroir:sigef"));
    setLayerCity(buildBaseLayer("terroir:municipio"));
    // setLayerBiomas(buildBaseLayer("terroir:mapbiomas_2021", "terroir/wms")); // Map biomas reclama se ligar o cache
    // setLayerCar(buildBaseLayer("terroir:limite_car"));
  }, []);

  useEffect(() => {
    if (showLayerCity) {
      layerCity?.addTo(map);
    } else {
      map?.removeLayer(layerCity);
    }
    if (showLayerUf) {
      layerUf?.addTo(map);
    } else {
      map?.removeLayer(layerUf);
    }
  }, [layerCity, layerUf, showLayerCity, showLayerUf]);

  //   useEffect(() => {
  //     if (!map || !imovelLayer) return;
  //     imovelLayer.addTo(map);
  //     map.fitBounds(imovelLayer.getBounds());
  //   }, [map, imovelLayer]);

  const buildBaseLayer = (layer, service = "gwc/service/wms") => {
    return L.tileLayer.wms(
      "https://api.youxgroup.com.br/geoserver/" + service,
      {
        layers: layer,
        format: "image/png",
        transparent: true,
        version: "1.1.0",
        crs: CRS.EPSG900913,
      }
    );
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MapContainer
        zoomControl={false}
        ref={setMap}
        center={[-15.793889, -53.882778]}
        zoom={4}
        minZoom={4}
        maxZoom={17}
        style={{ height: "300px", width: "auto" }}
        id="map"
      >
        {true ? (
          <div>
            <Button
              style={{ backgroundColor: "white", marginTop: 5, marginLeft: 5 }}
              className="leaflet-control toggle-add-layers"
              onClick={() => setShowLayerUf((prev) => !prev)}
              title="Adicionar camadas de estados"
            >
              <MapIcon color="white" />
            </Button>
            <Button
              style={{ backgroundColor: "white", marginTop: 5, marginLeft: 5 }}
              className="leaflet-control toggle-add-layers"
              onClick={() => setShowLayerCity((prev) => !prev)}
              title="Adicionar camadas de cidades"
            >
              <CityIcon color="white" />
            </Button>
          </div>
        ) : null}
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </MapContainer>
    </div>
  );
};
