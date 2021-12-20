import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdSearch, MdVisibility } from "react-icons/md";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { URL } from "../../variaveis";


const TableList = (props) => {
    useEffect(() => { console.log(props.body) }, [])
    const [show_warning, setShow_warning] = useState(false);
    const [medicamento_to_delete, setMedicamento_to_delete] = useState('');
    const [selecionados, setSelecionados] = useState([]);



    return (
        <div className="row">
            <div className="row mb-2">

                <div className="table-rep-plugin">
                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                        <table id="tech-companies-1" className="table table-striped table-hover" style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>Selecione</th>
                                    {props.header.map((label, index) => (<th key={index}>{label}</th>))}
                                    <th data-priority="3">

                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.body).map((item, index) => (

                                    <tr key={index}>
<td> <input className="me-1 mb-1" type={'checkbox'}
                                                onChange={(e) => {
                                                    let selecionado = [...selecionados];
                                                    if (e.target.checked == true) {
                                                        selecionado.push(item);
                                                        setSelecionados(selecionado);
                                                    }
                                                    else {
                                                        selecionado = selecionados.filter((item2) => item2 != item);
                                                        setSelecionados(selecionado);
                                                    }
                                                    console.log(selecionado)
                                                }} /></td>
                                        {Object.values(props.body[item]).map((item2, index2) => (<td key={index2}>{item2}</td>))}
                                        <td>
                                           

                                            <Link to={'/medicamentos/editar/' + item} >
                                                <Tooltip title="editar">
                                                    <span className="btn btn-info btn-outline btn-circle me-1 mb-1" >
                                                        <MdEdit />
                                                    </span>
                                                </Tooltip>
                                            </Link>
                                            <Tooltip title="excluir">
                                                <button className="destroy_it btn btn-danger btn-outline btn-circle me-1 mb-1"
                                                    onClick={() => {
                                                        setShow_warning(true);
                                                        setMedicamento_to_delete(item)
                                                        console.log(item)
                                                    }}>

                                                    <MdDelete />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                                {selecionados.length > 0 && <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><button className="destroy_it btn btn-danger btn-outline btn-circle me-1 mb-1" target="_blank" 
                                    onClick={() => {
                                                        setShow_warning(true);
                                                        setMedicamento_to_delete(selecionados)
                                                    }}>Excluir selecionados</button></td>
                                </tr>}
                            </tbody>
                        </table>
                        {Object.keys(props.body).length == 0 &&<div className="row w-100">
                                    <div className="col-12">
                                        <p style={{ textAlign: 'center' }}>Nenhum medicamento cadastrado</p>

                                    </div>
                                </div>}
                    </div>
                </div>
                <SweetAlert
                    warning
                    title={"Atenção"}
                    onConfirm={() => { props.delete(medicamento_to_delete); }}
                    onCancel={() => { setShow_warning(false) }}
                    show={show_warning}
                    confirmBtnText='Sim, desejo apagar'
                    cancelBtnText='Cancelar'
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    showCancel={true}
                >
                   { selecionados.length > 0?'Ao deletar estes medicamentos eles não estarão mais disponíveis no sistema':'Ao deletar este medicamento ele não estará mais disponível no sistema'}

                </SweetAlert>
            </div>
        </div>
    )
}

export default TableList;