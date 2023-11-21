import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
export const Content = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;
export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
`;
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  @media (max-width: 465px) {
    display: none;
  }
`;
export const Header = styled.aside`
  box-sizing: border-box;
  background: linear-gradient(to right, #0001ff, #3333ff);
  padding: 8px 0;
  border-bottom: 1px solid black;
  width: 25vw;
  > ${Container} {
    display: flex;
    flex-direction: column;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    @media (max-width: 845px) {
      flex-direction: column;
      text-align: center;
    }
  }

  > ${Nav} {
    display: flex;
    flex-direction: column;
    @media (max-width: 845px) {
      justify-content: center;
      padding: 0;
    }
    @media (max-width: 465px) {
      display: none;
    }
  }
`;

export const Logo = styled(Link)`
  font-weight: 700;
  margin: 0;
  margin-top: 50px;
  text-decoration: none;
  color: black;
  @media (max-width: 845px) {
    margin-left: 0;
  }
`;
export const Links = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 8px 16px;
  margin: 15px 0;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 465px) {
    display: block;
  }
`;

export const NavMobile = styled.nav`
  display: none;

  @media (max-width: 465px) {
    background: linear-gradient(to bottom, #000000, #333333);
    padding: 16px;
    &.is-visible {
      display: block;
    }

    ${NavItem} {
      display: block;
      padding: 8px 0;
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      text-align: center;

      &.active {
        color: white;
        background-color: orangered;
      }
    }
  }
`;

export const Contain = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Main = styled.div`
  box-sizing: border-box;
  height: auto;
  flex: 1;
  margin: 0 auto;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const Footer = styled.footer`
  box-sizing: border-box;
  background: linear-gradient(to bottom, #0001ff, #3333ff);
  color: #fff;
  width: 100%;
  padding: 20px;

  > ${Container} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    div {
      display: block;
      align-items: center;
    }
  }

  div {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;

    @media (min-width: 768px) {
      flex: 0 0 50%;
      text-align: left;
    }

    @media (min-width: 1200px) {
      flex: 0 0 33.33%;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      margin: 0 10px;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;
