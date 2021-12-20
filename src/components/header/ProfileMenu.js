
import React, { Component, useCallback, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter,} from 'react-router-dom';
import { logout, mudarPage } from '../../actions/AppActions';
import {  useDispatch, useSelector } from 'react-redux';

// users
import { MdExitToApp } from 'react-icons/md';
import { AccountCircleOutlined } from '@mui/icons-material';

const ProfileMenu = (props) => {







    const dispatch = useDispatch();
    const [hover, sethover] = useState('#e5e6e79b')
    const [menu, setMenu] = useState(false);
    const toggle = useCallback(() => {
        console.log('toogle')
        setMenu(!menu)
    },[menu]);

    const user = useSelector(store=>store.AppReducer.user);
    const drop = props.drop;

    const logout_ = useCallback(() => {
        console.log('logout')

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        dispatch(logout());
    },[])

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block" >
                <DropdownToggle   className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                   <AccountCircleOutlined 
                   onMouseOver={()=> sethover('white')} 
                   onMouseOut={()=> !menu ?sethover('#e5e6e79b'):sethover('white')} 
                   sx={{ color: hover, fontSize:35 }} />
                    {/* <img className="rounded-circle header-profile-user" src={user.imagem==null? user3:URL+user.imagem} height="50" width={'50'} alt="Header Avatar" style={{objectFit:'cover', color:'red'}} /> */}
                </DropdownToggle>
                <DropdownMenu right>
             <DropdownItem tag="a" onClick={()=>{
                 if(drop =='home'){
                    dispatch(mudarPage({redirect_login:true}));
                }else if(drop =='painel') {
                   logout_();
                }   
             }} style={{cursor:'pointer',alignItems:'center',display:"flex"}}><MdExitToApp style={{marginRight:5}}/> {drop =='painel'?'Sair':'Entrar'}</DropdownItem>
                    
                    
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}


export default withRouter(ProfileMenu);


