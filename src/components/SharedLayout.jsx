import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import {
  Container,
  Header,
  Logo,
  Main,
  Footer,
  Nav,
  Content,
  NavItem,
  Contain,
  MenuButton,
  Img,
  MenuCloseButton,
} from './SharedLayout.styled';
import { HiMenu, HiX } from 'react-icons/hi';

import images from '../images/logo3.png';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';
import { selectMapType } from 'redux/selectors';

export const SharedLayout = () => {
  const [isHeaderVisible, setHeaderVisibility] = useState(false);
  const mapType = useSelector(selectMapType);

  const toggleMenu = () => {
    setHeaderVisibility(!isHeaderVisible);
  };

  return (
    <Content>
      <MenuButton onClick={toggleMenu} maptype={mapType}>
        <HiMenu size={mapType === 'standard' ? 40 : 30} />
      </MenuButton>
      <Header isheadervisible={isHeaderVisible.toString()}>
        <Container>
          <Logo to="/">
            <Img
              src={images}
              alt="logo"
              isheadervisible={isHeaderVisible.toString()}
            />
          </Logo>
          <Nav>
            <NavItem onClick={toggleMenu} to="/dashboard/">
              Мапа локацій
            </NavItem>
            <NavItem onClick={toggleMenu} to="/dashboard/add">
              Додати локацію
            </NavItem>
            <NavItem onClick={toggleMenu} to="/dashboard/about">
              Про нас
            </NavItem>
          </Nav>
          <MenuCloseButton onClick={toggleMenu} maptype={mapType}>
            <HiX size={30} />
          </MenuCloseButton>
        </Container>

        <ToastContainer />
      </Header>

      <Contain>
        <Main>
          <Container>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </Container>
        </Main>
        <Footer>
          <Container>
            <span>&copy; 2023 Інтелектуальна система "Комерційні локації"</span>

            <ul>
              <li>Наші контакти</li>
              <li>
                <a href="tel:+38000000000">+380000000000</a>
              </li>
              <li>
                <a href="email:info@comercial-location.com">
                  info@comercial-location.com
                </a>
              </li>
              <li>вул. Героїв УПА, 73, м. Львів, Україна</li>
            </ul>
          </Container>
        </Footer>
      </Contain>
    </Content>
  );
};

export default SharedLayout;
