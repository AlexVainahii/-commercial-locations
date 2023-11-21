import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/Filter/filterSlice';
import { selectMapType } from 'redux/selectors';
import styled, { keyframes } from 'styled-components';
import { FaFilter, FaTimes, FaCheck, FaEraser } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  top: ${({ isvisible, active }) =>
    isvisible === 'true'
      ? '0'
      : '-100%'}; /* Початкова позиція за межами видимості */
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Напівпрозорий білий фон */
  padding: 10px;
  box-sizing: border-box;
  z-index: 5000;
  display: flex;
  flex-wrap: nowrap; /* Забороняє перенесення на новий рядок */
  overflow-x: auto; /* Дозволяє прокручувати горизонтально, якщо елементи не вміщуються */
  gap: 10px;
  animation: ${({ isvisible }) => (isvisible === 'true' ? slideIn : slideOut)}
    0.5s ease;
  transition: top 0.5s ease; /* Додайте перехід для плавності зміни позиції */
`;

const FilterItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  justify-content: flex-end;
`;

const FilterLabel = styled.label`
  margin-bottom: 3px;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 12px; /* Змінено розмір шрифту */
  margin-top: 5px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2e3a59;
  }
`;

const FilterButton = styled.button`
  opacity: ${props => (props.isvisible === 'false' ? 1 : 0)};
  transition: opacity 0.5s ease;
  position: absolute;
  margin-top: 10px;
  font-size: 14px;
  padding-top: 8px;
  background-color: ${props =>
    props.mapType === 'standard' ? 'none' : '#2e3a59'};
  background: ${props => (props.maptype === 'standard' ? 'none' : '#2e3a59')};
  box-shadow: ${props =>
    props.maptype === 'standard' ? 'none' : '0px 0px 10px 0px #fff'};
  color: ${props => (props.maptype === 'standard' ? '#2e3a59' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 5000;
  right: 20px;
`;

const FilterIcon = styled.div`
  font-size: 30px;
`;

const ApplyFiltersButton = styled(FilterButton)`
  display: flex;
  align-items: center;
  position: static;
`;

const ClearFiltersButton = styled(FilterButton)`
  background-color: #dc3545;
  margin-right: 10px;
  position: static;
`;

const FilterComponent = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState('false');
  const [active, setActive] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    active: false,
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    radius: 0,
    address: '',
    name: '',
  });
  const mapType = useSelector(selectMapType);
  const handleFilterChange = (filterName, value) => {
    setLocalFilters(prev => {
      return { ...prev, [filterName]: value };
    });
  };

  const handleApplyFilters = () => {
    setActive(true);
    dispatch(changeFilter({ ...localFilters, active: true }));
  };

  const handleClearFilters = () => {
    setActive(false);
    dispatch(
      changeFilter({
        active: false,
        minPrice: 0,
        maxPrice: 0,
        minArea: 0,
        maxArea: 0,
        radius: 0,
        address: '',
        name: '',
      })
    );
  };

  const handleToggleFilterVisibility = () => {
    if (active) {
      alert('Скиньте фільтри');
      return;
    }
    setIsVisible(prev => (prev === 'true' ? 'false' : 'true'));
  };

  return (
    <>
      <FilterButton
        onClick={handleToggleFilterVisibility}
        isvisible={isVisible}
        maptype={mapType}
      >
        <FilterIcon>{<FaFilter />}</FilterIcon>
      </FilterButton>

      <FilterContainer
        isvisible={isVisible}
        active={localFilters.active.toString()}
      >
        {/* Кнопка для приховування панелі */}

        <FilterItem>
          <FilterLabel>Мінімальна ціна:</FilterLabel>

          <FilterInput
            type="number"
            value={localFilters?.minPrice || ''}
            min={0}
            step={10}
            onChange={e => handleFilterChange('minPrice', e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <FilterLabel>Максимальна ціна:</FilterLabel>
          <FilterInput
            type="number"
            value={localFilters?.maxPrice || ''}
            min={0}
            step={10}
            onChange={e => handleFilterChange('maxPrice', e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <FilterLabel>Мінімальна площа:</FilterLabel>
          <FilterInput
            type="number"
            min={0}
            step={5}
            value={localFilters?.minArea || ''}
            onChange={e => handleFilterChange('minArea', e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <FilterLabel>Максимальна площа:</FilterLabel>
          <FilterInput
            min={0}
            step={5}
            type="number"
            value={localFilters?.maxArea || ''}
            onChange={e => handleFilterChange('maxArea', e.target.value)}
          />
        </FilterItem>

        <FilterItem>
          <FilterLabel>Назва:</FilterLabel>
          <FilterInput
            type="text"
            value={localFilters?.name || ''}
            onChange={e => handleFilterChange('name', e.target.value)}
          />
        </FilterItem>
        <FilterItem>
          <FilterLabel>Адреса:</FilterLabel>
          <FilterInput
            type="text"
            value={localFilters?.address || ''}
            onChange={e => handleFilterChange('address', e.target.value)}
          />
        </FilterItem>
        <FilterItem>
          <FilterLabel>Радіус (км):</FilterLabel>
          <FilterInput
            type="number"
            min={0}
            step={5}
            value={localFilters?.radius || ''}
            onChange={e => handleFilterChange('radius', e.target.value)}
          />
        </FilterItem>

        <ApplyFiltersButton onClick={handleApplyFilters} isvisible={'false'}>
          <FilterIcon>
            <FaCheck />
          </FilterIcon>
        </ApplyFiltersButton>

        <ClearFiltersButton onClick={handleClearFilters} isvisible={'false'}>
          <FilterIcon>
            <FaEraser />
          </FilterIcon>
        </ClearFiltersButton>
        <FilterButton
          onClick={handleToggleFilterVisibility}
          isvisible={isVisible === 'true' ? 'false' : 'true'}
          style={{
            position: 'static',
            background: 'none',
            boxShadow: 'none',
            color: '#2e3a59',
          }}
        >
          <FilterIcon>
            <FaTimes />
          </FilterIcon>
        </FilterButton>
      </FilterContainer>
    </>
  );
};

export default FilterComponent;
