/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../LogReg/AuthSlice';
import './style/style.css';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { chooseCity } from '../sales/salesSlice';
import Footer from '../footer/Footer';
import picnav from '../../images/16.png';

function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const service = useSelector((store: RootState) => store.auth.service);

  const onHandleLogout = async (): Promise<void> => {
    dispatch(logOut()).catch(console.log);
  };

  return (
    <>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <img className="picnav" src={picnav} alt="pic" />
        <div className="nav-item">
          <label className="form-label">
            Выберите город
            <select
              onChange={(e) => dispatch(chooseCity(e.target.value))}
              id="group"
              name="groupGold"
              defaultValue="Санкт-Петербург"
            >
              <option className="gold" value="Санкт-Петербург">
                Санкт-Петербург
              </option>
              <option className="gold" value="Москва">
                Москва
              </option>
              <option className="gold" value="Казань">
                Казань
              </option>
              <option className="gold" value="Екатеринбург">
                Екатеринбург
              </option>
            </select>
          </label>
        </div>
        <li className="nav-item">
          <NavLink className="navlink" to="/main">
            На главную
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/services">
            Сервисы
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/news">
            Статьи
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/sales">
            Акции
          </NavLink>
        </li>
        {service || user ? (
          <>
            <NavLink
              className="navlink"
              style={{ color: 'orange' }}
              onClick={onHandleLogout}
              to="/"
            >
              logout
            </NavLink>
            {user && <div>Hello, {user.name}</div>}
            {service && <div>{service.title}</div>}
          </>
        ) : (
          <li className="nav-item">
            <NavLink className="navlink" to="reg">
              Вход
            </NavLink>
          </li>
        )}
        {service && (
          <NavLink className="navlink" style={{ color: 'orange' }} to="/personalArea">
            Личный кабинет
          </NavLink>
        )}
        {user?.isAdmin && (
          <NavLink className="navlink" style={{ color: 'orange' }} to="/personalArea/admin">
            Личный кабинет
          </NavLink>
        )}{' '}
        {user?.isAdmin === false && (
          <NavLink style={{ color: 'orange' }} to="/personalArea/person">
            Личный кабинет
          </NavLink>
        )}{' '}
      </div>
      {service?.isChecked === false && (
        <span className="centered-text" style={{ textAlign: 'center', fontSize: '15px' }}>
          Ваш аккаунт находится на проверке, после успешной аутентификации ваш профиль станет
          активным и пользователи смогут записаться или связаться с вами.
        </span>
      )}

      <Outlet />

      <Footer />
    </>
  );
}
export default NavBar;
