import { MdOutlineMenu, MdOutlineNotifications, MdOutlineAccountCircle, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // État pour stocker la valeur de la barre de recherche
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
      setShowProfileMenu(false);
      setShowNotificationMenu(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotificationMenu(false);
  };

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
    setShowProfileMenu(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // Mettre à jour la valeur de la barre de recherche
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">dashboared</h2>
      </div>
      
      <div className="area-top-r">
        <div>
        <div className="icons-container">
          <div className="icon-wrapper" onClick={toggleProfileMenu}>
            <MdOutlineAccountCircle size={24} />
            {showProfileMenu && (
              <div className="profile-menu">
                <ul>
                  <li>Profil</li>
                  <li>Paramètres</li>
                  <li>Déconnexion</li>
                </ul>
              </div>
            )}
          </div>
          <div className="icon-wrapper" onClick={toggleNotificationMenu}>
            <MdOutlineNotifications size={24} />
            {showNotificationMenu && (
              <div className="notification-menu">
                <ul>
                  <li><Link to="/listRDV">RDV</Link></li> {/* Ajoutez un lien autour de l'élément "RDV" */}
                  <li>Contact</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
    
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${
            !showDatePicker ? "hide-date-range" : ""
          }`}
          onClick={handleInputClick}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div>
      </div>
      <style>{`
        .icons-container {
          display: flex;
          align-items: center;
        }

        .icon-wrapper {
          position: relative;
          margin-right: 10px;
        }

        .profile-menu,
        .notification-menu {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 5px 10px;
          border-radius: 5px;
          z-index: 1000;
          display: none;
        }

        .profile-menu ul,
        .notification-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .profile-menu li,
        .notification-menu li {
          cursor: pointer;
          padding: 5px 0;
        }

        .icon-wrapper:hover .profile-menu,
        .icon-wrapper:hover .notification-menu {
          display: block;
        }

        .search-container {
          display: flex;
          align-items: center;
          margin: 0 auto; /* Centrer horizontalement */
        }

        .search-input {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px; /* Ajustez selon vos besoins */
        }

       
      `}</style>
    </section>
  );
};

export default AreaTop;
