import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-arrowheads';
import 'leaflet-osm';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../images/marker-icon.png';
import myLocationIcon from '../images/myLocation.png';
import pinMarkerIcon from '../images/pinMarker.png';
import FilterComponent from './FilterComponent';
import { selectFilter, selectMapType } from 'redux/selectors';
import Modal from 'react-modal';
import { genText, getDistance } from 'Api';
import { fetchCommerce } from 'redux/Comercial/operationsCommercial';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommerces } from 'redux/selectors';
import { FaWindowClose, FaStore, FaCrosshairs, FaMap } from 'react-icons/fa';
import { changeMapType } from 'redux/MapType/mapSlice';

const Maps = () => {
  const dispatch = useDispatch();
  const commerces = useSelector(selectCommerces);
  const {
    active,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    radius,
    address,
    name,
  } = useSelector(selectFilter);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(commerces);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [distance, setDistance] = useState(0);
  const [generatedText, setGeneratedText] = useState('');
  const mapType = useSelector(selectMapType);

  const setPziLocation = () => {
    handleUserLocation();
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

  const calculateModalPosition = pixelCoordinates => {
    const modalWidth = 300;
    const modalHeight = 350;

    let top = pixelCoordinates.y;
    let left = pixelCoordinates.x + 150;

    if (top < 0) {
      top = 0;
    }

    if (top + modalHeight > window.innerHeight) {
      top = window.innerHeight - modalHeight;
    }

    if (left < 0) {
      left = 0;
    }

    if (left + modalWidth > window.innerWidth) {
      left = window.innerWidth - modalWidth;
    }

    return { top, left };
  };

  const handleMapClick = event => {
    const clickedCoordinates = event.latlng;

    setUserLocation({
      lat: clickedCoordinates.lat,
      lng: clickedCoordinates.lng,
    });
  };

  const MarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [30, 40],
    iconAnchor: [18, 46],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    title: 'Маркер',
    alt: 'Маркер',
  });
  const MyLocationIcon = L.icon({
    iconUrl: myLocationIcon,
    iconSize: [80, 91],
    iconAnchor: [35, 74],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    title: 'Маркер',
    alt: 'Маркер',
  });
  const PinMarkerIcon = L.icon({
    iconUrl: pinMarkerIcon,
    iconSize: [30, 40],
    iconAnchor: [18, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    title: 'Маркер',
    alt: 'Маркер',
  });

  const fetchData = async name => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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',
          },
          body: JSON.stringify({
            prompt: `опиши рентабельність ${name}`,
            max_tokens: 10,
          }),
        }
      );

      const data = await response.json();
      setGeneratedText(data.choices[0]?.text);
    } catch (error) {
      setGeneratedText(name + genText);
      console.error('Error fetching data from OpenAI API:', error);
    }
  };

  useEffect(() => {
    if (active) {
      const filteredCoords = commerces.filter(coordinate => {
        const isValidFilter = value =>
          value !== null && value !== undefined && value !== 0 && value !== '';

        return (
          (isValidFilter(minPrice)
            ? coordinate.price >= Number(minPrice)
            : true) &&
          (isValidFilter(maxPrice)
            ? coordinate.price <= Number(maxPrice)
            : true) &&
          (isValidFilter(minArea)
            ? coordinate.area >= Number(minArea)
            : true) &&
          (isValidFilter(maxArea)
            ? coordinate.area <= Number(maxArea)
            : true) &&
          (isValidFilter(name)
            ? coordinate.name.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (isValidFilter(address)
            ? coordinate.address.toLowerCase().includes(address.toLowerCase())
            : true)
        );
      });
      setCoordinates(filteredCoords);
    } else {
      setCoordinates(commerces);
    }
  }, [commerces, active, minPrice, maxPrice, minArea, maxArea, name, address]);

  useEffect(() => {
    dispatch(fetchCommerce());
  }, [dispatch]);

  useEffect(() => {
    if (commerces.length !== 0) setCoordinates(commerces);
  }, [commerces]);

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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

  useEffect(() => {
    if (coordinates.length !== 0) {
      const originCoordinates = coordinates[0];
      const destinationCoordinates = coordinates[1];
      const centrMap = userLocation
        ? userLocation
        : [
            (originCoordinates.location.lat +
              destinationCoordinates.location.lat) /
              2,
            (originCoordinates.location.lng +
              destinationCoordinates.location.lng) /
              2,
          ];

      const zoom = 11;
      const mapOptions = {
        zoomControl: false, // Вимкнути стандартні кнопки зуму
      };
      mapRef.current = L.map(mapContainerRef.current, mapOptions).setView(
        centrMap,
        zoom
      );

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
      L.control.zoom({ position: 'bottomleft' }).addTo(mapRef.current);
      mapRef.current.on('click', handleMapClick);
      let line;
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
        if (Number(radius) > 0)
          L.circle(userLocation, {
            radius: Number(radius) * 1000,
            color: 'blue', // Колір круга
            fillColor: '#3388ff', // Колір заливки
            fillOpacity: 0.3, // Прозорість заливки
          }).addTo(mapRef.current);
        userMarker.on('mouseout', () => {
          userMarker.setIcon(MyLocationIcon);
          userMarker.closePopup();
        });

        coordinates.forEach(coordinate => {
          const dist = getDistance(userLocation, coordinate?.location);

          const marker = L.marker(coordinate?.location, {
            icon: dist <= Number(radius) ? PinMarkerIcon : MarkerIcon,
          });

          marker.addTo(mapRef.current);
          marker.on('click', () => {
            setDistance(dist);
            fetchData(coordinate.name);
            setSelectedCommerce(coordinate);
            const pixelCoordinates = mapRef.current.latLngToContainerPoint(
              coordinate.location
            );

            const correctedModalPosition =
              calculateModalPosition(pixelCoordinates);

            setModalPosition(correctedModalPosition);
          });

          marker.on('mouseover', () => {
            line = L.polyline([userLocation, coordinate.location], {
              color: 'blue', // Колір лінії
              weight: 3, // Товщина лінії
            }).addTo(mapRef.current);
            marker.setIcon(
              dist <= Number(radius)
                ? L.icon({
                    ...PinMarkerIcon.options,
                    iconSize: [30 * 1.2, 40 * 1.2],
                  })
                : L.icon({
                    ...MarkerIcon.options,
                    iconSize: [30 * 1.2, 40 * 1.2],
                  })
            );
            marker.bindPopup(`${coordinate.name} ${dist}км`).openPopup();
          });

          marker.on('mouseout', () => {
            if (line) {
              mapRef.current.removeLayer(line);
              line = null; // Очищаємо змінну лінії
            }
            marker.setIcon(dist <= Number(radius) ? PinMarkerIcon : MarkerIcon);
            marker.closePopup();
          });
        });
      }
      return () => {
        if (line) {
          mapRef.current.removeLayer(line);
        }
        mapRef.current.off('click', handleMapClick);
        mapRef.current.remove();
      };
    }
  }, [
    coordinates,
    userLocation,
    mapRef,
    mapType,
    radius,
    MarkerIcon,
    MyLocationIcon,
    PinMarkerIcon,
  ]);

  return (
    <>
      <FilterComponent />

      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
      <div
        style={{
          position: 'absolute',
          bottom: '25px',
          right: '10px',
          zIndex: '1000',
        }}
      >
        {/* Кнопка для встановлення місця по PZI */}
        <button
          style={{
            background: mapType === 'standard' ? 'none' : '#2E3A59',
            padding: '5px',
            boxShadow:
              mapType === 'standard' ? 'none' : '0px 0px 10px 0px #fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
          }}
          onClick={setPziLocation}
        >
          <FaCrosshairs
            size={40}
            color={mapType === 'standard' ? '#2E3A59' : '#fff'}
          />
        </button>

        {/* Кнопка для зміни виду карти */}
        <button
          style={{
            background: mapType === 'standard' ? 'none' : '#2E3A59',
            padding: '5px',
            boxShadow:
              mapType === 'standard' ? 'none' : '0px 0px 10px 0px #fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={toggleMapType}
        >
          <FaMap
            size={40}
            color={mapType === 'standard' ? '#2E3A59' : '#fff'}
          />
        </button>
      </div>
      <Modal
        isOpen={selectedCommerce !== null}
        onRequestClose={() => setSelectedCommerce(null)}
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 60000,
          },
          content: {
            width: '300px',
            height: '450px',
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            backgroundColor: '#fff',
          },
        }}
      >
        {selectedCommerce && (
          <div>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedCommerce(null)}
            >
              <FaWindowClose size={24} />
            </button>
            <h2 style={{ marginBottom: '20px' }}>{selectedCommerce.name}</h2>
            <p>Адреса: {selectedCommerce.address}</p>
            <p>Площа: {selectedCommerce.area} кв.м</p>
            <p>Ціна: {selectedCommerce.price} $</p>
            <p>Широта: {selectedCommerce.location.lat}</p>
            <p>Довгота: {selectedCommerce.location.lng}</p>
            <p>Відстань до об'єкта: {distance} км</p>
            <p> {generatedText} </p>
            <div style={{ marginTop: '20px' }}>
              <FaStore size={50} color="#2E3A59" />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Maps;
