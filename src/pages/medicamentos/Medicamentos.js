import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/Table/SearchBar';
import {ButtonLink} from '../../components/Buttons/Buttons';
import TableList from '../../components/Table/TableList';
import { URL } from "../../variaveis";
import {logout} from '../../Actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { LoadSave } from '../../components/Form/Loads';


const Medicamentos = () => {


const[header, setHeader]=useState(['Nome', 'Fabricanate', 'Data' ]);
const [page, setPage] = useState(1);
const [total_pages, setTotal_pages] = useState(1);
const[loading_search, setLoading_search]=useState(false);
const[loading_screen, setLoading_screen]=useState(false);
const[medicamentos, setMedicamentos]=useState([]);
const dispatch = useDispatch();
const [redirect, setRedirect] = useState(false);
const token = useSelector(state => state.token);
const [search, setSearch]=useState('');
const timeoutRef = useRef(null)



const SearchVal = (value) => {
   setSearch(value);
};

useEffect(() => {
    if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        index_medicamentos(1, search, true)
    }, 500);
}, [search]);


const index_medicamentos = (page, search = '', busca =false )=> {
    if (busca == true) {
        if (loading_search == false) {
            setLoading_screen(true);
        }
    }
    else if (loading_screen === false) {
        setLoading_screen(true);
    }
    fetch(`${URL}api/index_medicamentos?page=${page}&search=${search}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        }
    }).then(async (responseLog) => {
        try {
            let resp = await responseLog.json();
            console.log(resp);
            if (resp.message == "Unauthenticated.") {
                localStorage.removeItem('token');
                 localStorage.removeItem('user');
                dispatch(logout());
                return;
            }
            if (resp.errors != null || resp.error != null) {
                let errors = Object.values(resp.errors);
                let erro = '';
                for (let i = 0; i < errors.length; i++) {
                    if (i != errors.length - 1)
                        erro += errors[i] + '\n';
                    else
                        erro += errors[i];
                }
                console.log(erro);
                setRedirect(true);
            }
            else {
                console.log('oi')
                let medicamentos =[];
                resp.medicamentos.map((item)=>{
                    let date =new Date(item.created_at)
                    medicamentos[item.id]={nome:item.nome, fabricante:item.fabricante, data:date.toLocaleDateString("pt-BR")}
                })
                setMedicamentos(medicamentos);
                setLoading_search(false);
                setLoading_screen(false);
                setPage(resp.pagination.current_page);
                setTotal_pages(resp.pagination.last_page);
            }
        } catch (err) {
            setRedirect(true);
            console.log(err);
        }

    })
        .catch((err) => {
            setRedirect(true);

            console.log(err);
            // this.props.mudarLoadingHome(false);
        });
}



const delete_Medicamento = (id) => {

    fetch(`${URL}api/delete_medicamento/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        }
    }).then(async (responseLog) => {
        try {
            let resp = await responseLog.json();
            if (resp.message == "Unauthenticated.") {
                localStorage.removeItem('token'); localStorage.removeItem('user');
                dispatch(logout());
                return;
            }
            if (resp.errors != null || resp.error != null) {
                let errors = Object.values(resp.errors);
                let erro = '';
                for (let i = 0; i < errors.length; i++) {
                    if (i != errors.length - 1)
                        erro += errors[i] + '\n';
                    else
                        erro += errors[i];
                }
                console.log(erro);
               
            }
            else {
                index_medicamentos(page);
            }
        } catch (err) {
            setRedirect(true);
            console.log(err);
        }
    })
        .catch((err) => {
            setRedirect(true);
            console.log(err);
        });

}

useEffect(() => {
    index_medicamentos(page);
}, [])

    return (
        <div className="row">

            <div className="col-12">
                <div className="card">
                    <div className="card-body" id="card">
                        <h4 className="mt-0 header-title" style={{ fontSize: '1.5rem', color: 'black' }}>Lista de medicamentos</h4>
                        <p style={{ fontSize: '1rem', color: 'black' }}>Aqui são listados todos os medicamentos do seu sistema</p>
                        <br />
                        <br />

                        <div className="row mb-2">
                            <SearchBar Onchange={SearchVal}  val={search} />
                            <ButtonLink url={'/medicamentos/cadastrar'} name={'Cadastrar medicamento'} />
                        </div>
                       
                        {loading_screen == false && <TableList  body={medicamentos} header={header} delete={delete_Medicamento} />}
                        {loading_screen ==true && <LoadSave/>}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Medicamentos;





