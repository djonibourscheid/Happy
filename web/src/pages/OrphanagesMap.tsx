import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanages-map.css';

import mapMakerImg from '../images/map-marker.svg';


const mapIcon = Leaflet.icon({
  iconUrl: mapMakerImg,
  iconSize: [58, 68],
  iconAnchor: [24, 68],
  popupAnchor: [170, 2],
})

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMakerImg} alt="Happy"/>
        
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Teutônia</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      {/* Mapa */}
      <Map
        center={[-29.467313,-51.820583]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
      >
        {/* estilo do mapa */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {/* marcações de orfanatos */}
        <Marker
          icon={mapIcon}
          position={[-29.467313,-51.820583]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Lar das meninas
            <Link to="/orfanatos/1">
              <FiArrowRight size={20} color="#fff"/>
            </Link>
          </Popup>
        </Marker>
      </Map>

      {/* Botão azul/criar novo orfanato */}
      <Link to="/orfanatos/criar" className="create-orphanage">
        <FiPlus size={32} color='#fff'/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;