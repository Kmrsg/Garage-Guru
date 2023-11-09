import React, { useEffect, useState } from 'react';
import video from './style/vid_1.mp4';
import './style/main.css';
import SliderBlock from '../news/SliderBlock';

function MainPage(): JSX.Element {
  const [classStopScroll, setClassStopScrolling] = useState<'' | 'stop-scrolling'>(''); // Initial top position
  const stopPoint = 450;
  useEffect(() => {
    const handleScroll = (): void => {
      const { scrollY } = window;
      if (scrollY > stopPoint) {
        setClassStopScrolling('stop-scrolling');
      } else {
        setClassStopScrolling('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="wrapper">
      <div className="container">
        <div className="forname">
          <div className={`naming ${classStopScroll}`}>
            <h1 className="font-link" id="bigName">
              Garage Guru
            </h1>
          </div>
        </div>

        {/* <div className="preload" data-preaload>
                  <div className="circle"></div>
                  <p className="text">Garage Guru</p>
                </div> */}

        {/* <div className="links_container">
                                <button id="b1" type="button" className="btn btn-outline-light">
                                  <NavLink className="navlink" to="/services">
                                    Сервисы
                                  </NavLink>
                                </button>

                                <button id="b1" type="button" className="btn btn-outline-light">
                                  <NavLink className="navlink" to="/sales">
                                    Акции
                                  </NavLink>
                                </button>
                              </div> */}
        <div className="videocontainer">
          <video id="background-video" muted loop autoPlay>
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div className="sliderPart">
          <SliderBlock />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default MainPage;
