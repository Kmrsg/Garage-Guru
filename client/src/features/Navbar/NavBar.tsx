/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const onHandleLogout = async (): Promise<void> => {
    dispatch(logOut()).catch(console.log);
    navigate('/');
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
              <option className="gold" value="Новосибирск">
                Новосибирск
              </option>
              <option className="gold" value="Екатеринбург">
                Екатеринбург
              </option>
            </select>
          </label>
        </div>
        <li className="nav-item">
          <NavLink className="navlink" to="/">
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
            <NavLink className="nav-item" onClick={onHandleLogout} to="/">
              Выйти
            </NavLink>
            {user && <div className="nav-hello">{user.name}</div>}
            {service && <div className="nav-hello"> {service.title}</div>}
          </>
        ) : (
          <li className="nav-item">
            <NavLink className="navlink" to="reg">
              Вход
            </NavLink>
          </li>
        )}
        {service && (
          <NavLink className="nav-item" to="/personalArea">
            Личный кабинет
            <img
              style={{ backgroundColor: 'white', width: '30px' }}
              src="https://cdn.icon-icons.com/icons2/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png"
              alt="p"
            />
          </NavLink>
        )}
        {user?.isAdmin && (
          <NavLink className="nav-item" to="/personalArea/admin">
            Личный кабинет
            <img
              style={{ backgroundColor: 'white', width: '20px' }}
              src="https://cdn.icon-icons.com/icons2/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png"
              alt="p"
            />
          </NavLink>
        )}{' '}
        {user?.isAdmin === false && (
          <NavLink className="nav-item" to="/personalArea/person">
            Личный кабинет
            <img
              style={{
                backgroundColor: 'white',
                width: '30px',
              }}
              src="https://cdn.icon-icons.com/icons2/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png"
              alt="p"
            />
          </NavLink>
        )}{' '}
      </div>
      {service?.isChecked === false && (
        <span
          className="centered-text"
          style={{ textAlign: 'center', fontSize: '15px', color: 'white' }}
        >
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
