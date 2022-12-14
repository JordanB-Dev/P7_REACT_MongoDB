import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UidContext } from '../AppContext'
import Logout from '../Logout'

const Navbar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <header>
      <div className="banner-container">
        <div className="logo">
          <NavLink to="/">
            <img src="./img/logo/logo-white.svg" alt="Logo" />
          </NavLink>
        </div>
        {uid ? (
          <Fragment>
            {userData.isAccound === true || userData.isAdmin === true ? (
              <Fragment>
                <Logout />
                <div className="HomeContainer">
                  <div className="switch">
                    <NavLink to="/home">
                      <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                  </div>
                </div>
                <div className="ProfilContainer">
                  <div className="switch">
                    <NavLink to="/profil">
                      <img src="./img/icons/personal-data-39.svg" alt="home" />
                    </NavLink>
                  </div>
                </div>
              </Fragment>
            ) : (
              <></>
            )}
          </Fragment>
        ) : (
          <></>
        )}
      </div>
    </header>
  )
}

export default Navbar
