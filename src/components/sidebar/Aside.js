import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import {  FaChartLine,} from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';
import {  NavLink } from 'react-router-dom';
import { MdCopyright } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import './styles/App.scss'
import {  ChevronRightOutlined, ManageAccounts, Person, Settings, VpnLockSharp } from '@mui/icons-material';

const Aside = ({ image, collapsed, toggled, handleToggleSidebar,handleCollapsedChange }) => {
  // #084808
  
  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      style={{ position: 'fixed' }}
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader style={{ background: '#222d32', height: 70 }}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          {/* {collapsed === true && <span >
            <h2 style={{color:'white', fontFamily: '  Arial ',fontStyle:'normal', fontWeight: 700, fontSize:8}}>ENTERSCIENCE</h2>
          
          </span>} */}
          {collapsed === false && <i >
            <h2 style={{color:'white', fontFamily: '  Arial ',fontStyle:'normal', fontWeight: 700,fontSize:24}}>ENTERSCIENCE</h2>

          </i>}
          <IconButton
                         color="inherit"
                         aria-label="open drawer"
                         edge="start"
                         onClick={() => {
                          if (window.innerWidth <= 768) {
                              handleToggleSidebar(!toggled)
                          }
                          else {
                              handleCollapsedChange(!collapsed)
                          }
                      }}
                         sx={{ ml: 0.5, ...(!collapsed && { display: 'none' }) }}
                         >
                        <ChevronRightOutlined/>
                    </IconButton>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ background: '#222d32' }}>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaChartLine />}
          >
            <NavLink exact to="/" activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}>{'Dashboard'}</NavLink>
          </MenuItem>

          <SubMenu title="Gestão de Acesso" icon={<ManageAccounts />}>

            <MenuItem icon={<Person/>} ><NavLink  to="/painel/usuarios" activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}>Usuarios</NavLink></MenuItem>
            <MenuItem icon={<VpnLockSharp/>} ><NavLink  to="/painel/acessos" activeStyle={{
              fontWeight: "bold",
              color: "white"
            }}>Acessos</NavLink></MenuItem>
            
          </SubMenu>

          <SubMenu title="Configurações" icon={<Settings />}>

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
            href="http://www.enterscience.com.br"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
            style={{alignItems:'center'}}
          >
            {!collapsed  &&<>
            <MdCopyright />
            <span> {'CopyRight EnterScience 2021'}</span>
            </>}
            {collapsed &&<>
            <span style={{margin:'auto'}}>{'ES'}</span>
            </>}
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
