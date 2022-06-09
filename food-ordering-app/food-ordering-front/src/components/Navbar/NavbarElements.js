import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
    background: #ff3838;
    height: 80px;
    display: flex;
    /*justify-content: space-between; */
    padding: 0.5rem calc((100vm - 1000px) / 2);
    z-index: 10;
    /* da krene od loga */
    justify-content: flex-start;

`;

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active{
        color: #ffffff;
    }
    /*
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
      }
      */
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    /*margin-right: -24px; */
    width: 100vm;
    white-space: nowrap;

`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  justify-content: flex-end;
  width: 100vw; 
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  /*background: #256ce1; */
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;


