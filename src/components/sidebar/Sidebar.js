import { ArrowBack, ArrowForward, ContactlessRounded, Dashboard, LocalPharmacy } from '@material-ui/icons';
import { useState } from 'react';
import { MdCopyright } from 'react-icons/md';

import { 
    ProSidebar, 
    Menu, 
    MenuItem, 
    SubMenu, 
    SidebarHeader, 
    SidebarFooter, 
    SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo_3.png';

const Sidebar = () =>{
const collapsed = useSelector( store => store.collapsed);

    return(
        
<ProSidebar style={{position:'absolute'}}
   collapsed = {collapsed}
   breakPoint = "md"
   style={{ position: 'fixed' }}

>
    
<SidebarHeader  >
    <div style={{height: 100}}>
  <img src={Logo} alt="" height='90px' style={{
      display:'inline-block',
      marginTop:'30px',
      marginBottom:'30px',
              height: '40px',
              width: '100%',
              objectFit: 'contain'
            }} /> 
            </div>
  </SidebarHeader>

  <SidebarContent>
  <Menu iconShape="circle">
    <MenuItem icon={<Dashboard />}>Dashboard</MenuItem>
    <MenuItem icon={<LocalPharmacy />}><NavLink to="/medicamentos"  activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}>Medicamentos</NavLink></MenuItem>

    <SubMenu title="Cofigurações" icon={<ContactlessRounded />}>
     
      <MenuItem><NavLink to="/"  activeStyle={{
              fontWeight: "bold",
              color: "white"
            }} >Empresa</NavLink></MenuItem>
    </SubMenu>
  </Menu>
  </SidebarContent>
  <SidebarFooter style={{ textAlign: 'center', background: '#222d32' }}>
  <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://www.winmed.com.br/"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <MdCopyright />
            <span> {'CopyRight winmed 2021'}</span>
          </a>
        </div>  
        </SidebarFooter>
</ProSidebar>


    );
};

export default Sidebar;
