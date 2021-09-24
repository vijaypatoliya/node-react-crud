import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  EuiIcon,
} from "@elastic/eui";
 

const routes = [
  { label: "Dashboard", routerLink: "/dashboard" , icon:'grid' },
  { label: "Home", routerLink: "/dashboard" , icon:'grid' },
  { label: "Profile", routerLink: "/user-profile" , icon:'grid' },
   
];
const Sidebar = () => {
 
  return (
    <Fragment>
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
         
          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {routes.map(({ label, routerLink, icon }, index) => {                  
                  return  <li className="nav-item" key={index}>
                    <Link to={routerLink} className="nav-link">
                    <EuiIcon  type={icon} />
                      <p className="ml-2">{label}</p>
                    </Link>
                  </li>
                }
                )}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </Fragment>
  );
};

export default React.memo(Sidebar);
