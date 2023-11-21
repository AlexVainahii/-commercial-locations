import { Suspense } from 'react';
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
} from './SharedLayout.styled';

import images from '../images/logo3.png';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader';

export const SharedLayout = () => {
  return (
    <Content>
      <Header>
        <Container>
          <Logo to="/">
            <img src={images} alt="logo" width={500} />
          </Logo>
          <Nav>
            <NavItem to="/dashboard/">Мапа локацій</NavItem>
            <NavItem to="/dashboard/add">Додати локацію</NavItem>
            <NavItem to="/dashboard/about">Про нас</NavItem>
          </Nav>
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
