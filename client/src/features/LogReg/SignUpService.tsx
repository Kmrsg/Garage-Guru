import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import SignInService from './SignInService';
import { registrService } from './AuthSlice';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';

function SignUpService(): JSX.Element {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [adress, setAdress] = useState('');
  const [signService, setSignService] = useState(true);
  const [tarif, setTearif] = useState('');
  const [erorka, setErorka] = useState('');
  const [teleponik, setTeleponik] = useState('');
  const service = useSelector((store: RootState) => store.auth.service);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (service) {
      navigate('/');
    }
  }, [tarif, service]);
  // console.log(tarif);

  const onHandleServiceAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    void dispatch(registrService({ title, email, password, adress, phone, tarif }));
  };
  // console.log( tarif);
  console.log(erorka);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {signService === false ? (
        <SignInService />
      ) : (
        <div className="regcont">
          <h1>Регистрация Сервиса</h1>
          <form
            onSubmit={(e) => {
              if (tarif === '') {
                setErorka('Пожалуйста, выберите тариф.');
                // alert('Пожалуйста, выберите тариф.');
                e.preventDefault();
              } else if (phone.length < 12) {
                setTeleponik("Пожалуйста, заполните поле 'Телефон' полностью.");
                e.preventDefault();
              } else {
                onHandleServiceAdd(e);
              }
              // void onHandleServiceAdd(e);
            }}
          >
            {/* form-label */}
            <label className="itemrow" htmlFor="a">
              <p className="itemName"> Название сервиса</p>
              <p className="iteminfo">
                {' '}
                <input
                  placeholder="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </p>
            </label>
            <label className="itemrow" htmlFor="a">
              <p className="itemName"> Email</p>
              <p className="iteminfo">
                {' '}
                <input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </p>
            </label>
            <label className="itemrow" htmlFor="a">
              <p className="itemName"> Пароль</p>
              <p className="iteminfo">
                {' '}
                <input
                  placeholder="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </p>
            </label>
            <label className="itemrow" htmlFor="a">
              <p className="itemName"> Адрес сервиса</p>
              <p className="iteminfo">
                {' '}
                <input
                  placeholder="adress"
                  type="text"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  required
                />
              </p>
            </label>
            <label className="itemrow" htmlFor="a">
              <p className="itemName">Телефон +7</p>
              <p className="iteminfo">
                <input
                  placeholder="phone"
                  type="tel"
                  name="tel"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (input.length >= 0 && input.length <= 12) {
                      // Валидный ввод, обновляем значение состояния
                      const phoneWithoutDashes = input.replace(/-/g, '');
                      const phoneWithDashes = phoneWithoutDashes.replace(
                        /(\d{3})(\d{3})(\d{2})(\d{2})/g,
                        '$1-$2-$3-$4',
                      );
                      setPhone(phoneWithDashes);
                    }
                  }}
                  required
                />
                <div style={{ color: 'white', position: 'absolute' }}>{teleponik}</div>
              </p>
            </label>
            <label className="itemrow" htmlFor="a">
              <p className="itemName">Тариф</p>
              <p className="iteminfo">
                <select style={{ width: '300px' }} onChange={(e) => setTearif(e.target.value)}>
                  <option value="Service" disabled selected>
                    Выберите тариф
                  </option>
                  <option value="5000$">На месяц 5000$</option>
                  <option value="10000$">На год 10000$</option>
                </select>
                <div style={{ color: 'white' }}>{erorka}</div>
              </p>
            </label>
            <div className="btns">
              <button className="btn" type="submit">
                Зарегистрироваться
              </button>
              <button className="btn" type="submit">
                Забыли пароль?
              </button>
            </div>
          </form>
          <button className="btn" type="submit" onClick={() => setSignService(false)}>
            У меня уже есть аккаунт
          </button>
        </div>
      )}
    </>
  );
}

export default SignUpService;
