// components/SideMenu.js

import Link from 'next/link';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <h2>Menu</h2>
      <ul>
        <li><Link href="/">Login</Link></li>
        <li><Link href="/Profile">Profile</Link></li>
        <li><Link href="/Analytics">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;
