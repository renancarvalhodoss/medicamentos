import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const InputText = (props) => {


    return (
        <div className="form-group row">
            <label className="col-sm-12 col-form-label">{props.label=='Principio'?'Principio ativo':props.label=='Codigo'?'Código do Produto':props.label}{props.required && <b style={{ color: 'red' }}>*</b>}</label>
            <div className="col-sm-12">
                <input className="form-control" placeholder={props.placeholder} type={props.type} onChange={(e) => {
                    let name =  props.label.toLowerCase();
                    props.Onchange(e.target.value, name);
                }} value={props.val} />

            </div>
        </div>
    )
};

export const InputTextArea = (props) => {


    return (
        <div className="form-group row">
            <label className="col-sm-12 col-form-label">Observações{props.required && <b style={{ color: 'red' }}>*</b>}</label>
            <div className="col-sm-12">
                <textarea className="form-control" placeholder={props.placeholder} type={props.type} onChange={(e) => {
                    let name = props.label.toLowerCase();
                    props.Onchange(e.target.value, name);
                }} value={props.val} />

            </div>
        </div>
    )
};

export const InputPdf = (props) => {
    const [title, setTitle]= useState('');
    const [doc, setDoc]= useState();
    const [docpath, setDocpath]= useState('nenhuma imagem');

    useEffect(() => {
        console.log(props.title)
        setTitle(props.title)
    }, [])
    return (
        <div className="form-group row">
            <label className="col-sm-12 col-form-label" style={{ color: 'black' }}>Bula{props.required && <b style={{ color: 'red' }}>*</b>}</label>
            <div className="col-sm-12">
            <input className="form-control"   type="file" accept=".pdf" onChange={(e) => {
                                                               setTitle(e.target.value)
                                                                let doclicenca = e.target.files[0];
                                                                setDoc( doclicenca );
                                                                let docpath = '';
                                                                let reader = new FileReader()
                                                                reader.readAsDataURL(e.target.files[0])

                                                                reader.onload = () => {
                                                                    docpath = reader.result;
                                                                    setDocpath( docpath );
                                                                    props.Onchange(docpath, doclicenca);

                                                                };
                                                                reader.onerror = function (error) {
                                                                    console.log('Error: ', error);
                                                                }
                                                            }} />
            </div>
        </div>
    )
};

export const PrevPdf = (props) => {

    return (
        <div className="row">
           
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} className="col-12 col-md-12 mt-3">
                    <div>
                        <img src={props.pdf_path} style={{ height: 100, width: 100, objectFit: "contain", border: '1px solid lightgrey' }} />
                        <p><a onClick={() => {
                            props.Inputpdf('')
                            // this.setState({ imagem: '', imagem_path: '' });
                        }} className="btn btn-link btn-link-dark" style={{ color: 'indianred', cursor: 'pointer' }}><span style={{ marginRight: 5 }}>Remover</span><i className="fas fa-times"></i></a></p>
                    </div>
                </div>

            
        </div>
    )
};


export const InputCheck = (props) => {

    return (
        <div className="form-group row">
            <label className="col-12 col-form-label" >{props.label} {props.required && <b style={{ color: 'red' }}></b>}</label>

            <div className="col-sm-12 d-flex align-items-center">
                <label className="form-check-label" htmlFor="acesso" style={{ marginRight: 10 }}>Não</label>

                <div className="form-check form-switch col-12 col-md-4 col-lg-4">

                    <input className="form-check-input" type="checkbox" id="acesso" checked={props.val} onChange={(e) => {
                        props.Inputcheck(e.target.checked);
                    }} />
                    <label className="form-check-label" htmlFor="acesso">Sim</label>
                </div>
            </div>
        </div>
    )
};

