// pages/layout.js

import SideMenu from '../pages/SideMenu';

/**
 * The Layout component is the parent component of all other pages.
 * It renders a side menu and a main content area.
 */
const Layout = ({ children }) => { 
  // The children prop is the component that is being rendered inside
  // the layout, passed down from the page component.

  return (
    <div className="container">  
      {/* The side menu */}
      <SideMenu />
      <div className="content"> 
        {/* The main content area */}
        {children}
      </div>
    </div>
  );
};


export default Layout;
