/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import SignUpService from './SignUpService';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { signInService } from './AuthSlice';

function SignInService(): JSX.Element {
  const [email, setEmail] = useState('');
  const [signService, setSignService] = useState(false);
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const service = useSelector((strore: RootState) => strore.auth);
  // const loading = useSelector((store: RootState) => store.auth.loading);
  // const error = useSelector((store: RootState) => store.auth.error);

  const dispatch = useAppDispatch();
  const onHandleServiceIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    void dispatch(
      signInService({
        password,
        email,
        id: 0,
        title: '',
        adress: '',
        phone: '',
        img: '',
        Sales: [],
        UslugaPrices: [],
        Comments: [],
        Rates: [],
        isChecked: false,
        tarif: '',
      }),
    );
  };

  return (
    <div className="signinservice">
      {signService === true ? (
        <SignUpService />
      ) : (
        <>
          <h1>Вход(servis) </h1>
          <div>
            {/* {loading && <img src={spinner} alt="preloader" />}
            {error && <h1 style={{ color: 'red' }}>{error}</h1>}
            {!loading && !error && ( */}
            <>
              <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => void onHandleServiceIn(e)}
              >
                <label className="itemrow" htmlFor="a">
                  <p className="itemName"> Email</p>
                  <p className="iteminfo">
                    <input
                      value={email}
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="text"
                      required
                    />
                  </p>
                </label>
                <label className="itemrow" htmlFor="d">
                  <p className="itemName"> Пароль</p>
                  <p className="iteminfo">
                    <input
                      value={password}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      required
                    />
                  </p>
                </label>
                <div className="btns"></div>
                <button className="btn" type="submit" onClick={() => setSubmitted(true)}>
                  Войти
                </button>
                <button className="btn" type="submit">
                  Забыли пароль?
                </button>
                {submitted === true && service.error && <h3>{service.error}</h3>}
              </form>

              <button className="btn" type="submit" onClick={() => setSignService(true)}>
                Зарегистрироваться
              </button>
              {/* {loading && <img src={spinner} alt="preloader" />}
              {error && <h1 style={{ color: 'red' }}>{error}</h1>} */}
            </>
            {/* )} */}
          </div>
        </>
      )}
    </div>
  );
  // console.log(loading);

  // return <>{loading ? spin : <div>{error ? checkError : content}</div>}</>;
}

export default SignInService;
