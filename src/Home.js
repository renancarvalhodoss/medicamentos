import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrimarySearchAppBar from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CadastrarMedicamento from './pages/medicamentos/CardastrarMedicamento';
import EditarMedicamentos from './pages/medicamentos/EditarMedicamentos';
import Medicamentos from './pages/medicamentos/Medicamentos';

const Home = (props) =>{
const collapsed = useSelector(store => store.collapsed);
const marginleft = !collapsed ? 270 :80 ;
    return(
    <div className="app-toggled">
    <Sidebar
    collapsed = {false}
    toggled ={false}
    />
        <PrimarySearchAppBar />
        <div className="content-page" >
        <div className="content" style={{ marginLeft: marginleft, transition: 'all 0.3s ', paddingBottom: 100, paddingTop:100, background: '#f8f8fa' }}>
                    <div className="container-fluid">
  <Switch>
  <Route exact path={`${props.match.url}medicamentos`} render={(props2) => <Medicamentos {...props2} />} />
  <Route exact path={`${props.match.url}medicamentos/cadastrar`} render={(props2) => <CadastrarMedicamento {...props2} />} />
  <Route exact path={`${props.match.url}medicamentos/editar/:id`} render={(props2) => <EditarMedicamentos {...props2} />} />
 
  </Switch>
  </div>
    </div>
    </div>
    </div>
    );
}
export default Home;