import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-arrowheads';
import 'leaflet-osm';
import 'leaflet/dist/leaflet.css';

import myLocationIcon from '../images/myLocation.png';
import { FaCrosshairs, FaMap } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { changeMapType } from 'redux/MapType/mapSlice';
import { addCommerce } from 'redux/Comercial/operationsCommercial';
import { selectMapType } from 'redux/selectors';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  height: 100%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;
const InputLabel = styled.label`
  margin-bottom: 10px;
  width: 80%;
`;

const Input = styled.input`
  padding: 6px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 4px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #2e3a59;
  color: #fff;
  border: none;
  margin: 0 auto;
  border-radius: 5px;
  cursor: pointer;
  width: 60%;
`;

const MapContainer = styled.div`
  height: 700px;
  width: 100%;
`;

const ControlButtons = styled.div`
  z-index: 1000;
  bottom: 25px;
  right: 10px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const ControlButton = styled.button`
  background: ${({ active }) => (active === 'true' ? 'none' : '#2e3a59')};
  padding: 5px;
  box-shadow: ${({ active }) =>
    active === 'true' ? 'none' : '0px 0px 10px 0px #fff'};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const AddForm = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState(null);
  const [newCommerce, setNewCommerce] = useState({
    name: '',
    address: '',
    area: '',
    price: '',
    location: null,
  });

  const mapType = useSelector(selectMapType);

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setNewCommerce(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        error => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  const handleMapClick = event => {
    const clickedCoordinates = event.latlng;
    setUserLocation({
      lat: clickedCoordinates.lat,
      lng: clickedCoordinates.lng,
    });
    setNewCommerce(prevCommerce => ({
      ...prevCommerce,
      location: {
        lat: clickedCoordinates.lat,
        lng: clickedCoordinates.lng,
      },
    }));
  };

  const toggleMapType = () => {
    const newMapType = mapType === 'standard' ? 'hybrid' : 'standard';
    dispatch(changeMapType(newMapType));

    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl(
          `https://{s}.google.com/vt/lyrs=${newMapType}&x={x}&y={y}&z={z}`
        );
      }
    });
  };

  useEffect(() => {
    if (userLocation) {
      const mapCenter = userLocation;
      const zoom = 11;
      mapRef.current = L.map(mapContainerRef.current).setView(mapCenter, zoom);
      const MyLocationIcon = L.icon({
        iconUrl: myLocationIcon,
        iconSize: [80, 91],
        iconAnchor: [35, 74],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        title: 'Маркер',
        alt: 'Маркер',
      });
      const initialMapType = mapType === 'standard' ? 'm' : 'y';
      L.tileLayer(
        `https://{s}.google.com/vt/lyrs=${initialMapType}&x={x}&y={y}&z={z}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.google.com/">Google</a>',
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          maxZoom: 20,
        }
      ).addTo(mapRef.current);

      mapRef.current.on('click', handleMapClick);
      if (userLocation) {
        const userMarker = L.marker(userLocation, {
          icon: MyLocationIcon,
        }).addTo(mapRef.current);

        userMarker.on('mouseover', () => {
          userMarker.setIcon(
            L.icon({
              ...MyLocationIcon.options,
            })
          );

          userMarker.bindPopup('Ваше місце розташування').openPopup();
        });
      }

      return () => {
        mapRef.current.off('click', handleMapClick);
        mapRef.current.remove();
      };
    }
  }, [userLocation, mapType]);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(addCommerce(newCommerce));

    setNewCommerce({
      name: '',
      address: '',
      area: '',
      price: '',
      location: userLocation,
    });
  };

  return (
    <Container>
      <FormHeader>Додати комерційний об'єкт</FormHeader>
      <Form onSubmit={handleSubmit}>
        <InputLabel>
          Назва:
          <Input
            type="text"
            value={newCommerce.name}
            onChange={e =>
              setNewCommerce(prevCommerce => ({
                ...prevCommerce,
                name: e.target.value,
              }))
            }
          />
        </InputLabel>
        <InputLabel>
          Адреса:
          <Input
            type="text"
            value={newCommerce.address}
            onChange={e =>
              setNewCommerce(prevCommerce => ({
                ...prevCommerce,
                address: e.target.value,
              }))
            }
          />
        </InputLabel>
        <InputLabel>
          Площа:
          <Input
            type="number"
            value={newCommerce.area}
            onChange={e =>
              setNewCommerce(prevCommerce => ({
                ...prevCommerce,
                area: e.target.value,
              }))
            }
          />
        </InputLabel>
        <InputLabel>
          Ціна:
          <Input
            type="number"
            value={newCommerce.price}
            onChange={e =>
              setNewCommerce(prevCommerce => ({
                ...prevCommerce,
                price: e.target.value,
              }))
            }
          />
        </InputLabel>
        <InputLabel>
          Координати:
          <Input
            type="text"
            value={`[${newCommerce.location?.lat}, ${newCommerce.location?.lng}]`}
            disabled
          />
        </InputLabel>

        <SubmitButton type="submit">Додати комерційний об'єкт</SubmitButton>
      </Form>

      <MapContainer style={{ height: '490px' }} ref={mapContainerRef} />

      <ControlButtons>
        <ControlButton
          active={(mapType === 'standard').toString()}
          onClick={() => handleUserLocation()}
        >
          <FaCrosshairs
            size={40}
            color={mapType === 'standard' ? '#2e3a59' : '#fff'}
          />
        </ControlButton>
        <ControlButton
          active={(mapType === 'standard').toString()}
          onClick={toggleMapType}
        >
          <FaMap
            size={40}
            color={mapType === 'standard' ? '#2e3a59' : '#fff'}
          />
        </ControlButton>
      </ControlButtons>
    </Container>
  );
};

export default AddForm;
