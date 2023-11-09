import React from 'react';
import './style/style.css';
import { NavLink, Outlet } from 'react-router-dom';
import { BiSolidToTop } from 'react-icons/bi';
import pic from '../../images/7.png';

function Footer(): JSX.Element {
  return (
    <div className="footer" id="footer">
      <div className="box-container">
        <div className="box">
        <h3>Навигация</h3>
          <li className="footeritem">
            <NavLink className="footerlink" to="/main">
              На главную
            </NavLink>
          </li>
          <li className="footeritem">
            <NavLink className="footerlink" to="/services">
              Сервисы
            </NavLink>
          </li>

          <li className="footeritem">
            <NavLink className="footerlink" to="/news">
              Статьи
            </NavLink>
          </li>

          <li className="footeritem">
            <NavLink className="footerlink" to="/sales">
              Акции
            </NavLink>
          </li>
        </div>
        <div className="box2">
          <h3>Контакты</h3>
          <a href="#">
            {' '}
            <i className="fas fa-phone" /> +7777777{' '}
          </a>
          <a href="#">
            {' '}
            <i className="fas fa-envelope" /> lapocki@gmail.com{' '}
          </a>
          <a href="https://elbrusboot.camp/">
            {' '}
            <i className="fas fa-map-marker-alt" /> ELBRUS{' '}
          </a>

          <a href="#">
            {' '}
            <i className="fab fa-facebook-f"/> GITHUB{' '}
          </a>
          <a href="#">
            {' '}
            <i className="fab fa-linkedin"/> linkedin{' '}
          </a>
        </div>

        <div className="credit shadow">
          {' '}
          created by LAPOCHKI
          <button className="totop" onClick={() => window.scrollTo({ top: 0, bahavior: 'smooth' })}>
            <BiSolidToTop />
          </button>
         
          <img className="carpic" src={pic} alt="pic" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
