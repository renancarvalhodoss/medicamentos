import { useEffect, useState } from "react";
import {InputTextArea, InputText,InputPdf} from '../../components/Form/Inpunts';
import { ButtonLink } from "../../components/Buttons/Buttons";
import HeaderForm from "../../components/Form/HeaderForm";
import AlertError from "../../components/Form/AlertError";
import { MdReply } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { URL } from "../../variaveis";
import { LoadSave } from "../../components/Form/Loads";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../Actions/actions";

const EditarMedicamentos = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const token = useSelector(store => store.token)
    const [redirect, setRedirect] = useState(false);
    const [path_pdf, setPath_pdf] = useState('');
    const [nomepdf, setNomepdf] = useState('');
    const [load_save, setLoad_save] = useState(false);
    const [load_screen, setLoad_screen] = useState(false);
    const [path, setPath] = useState('/medicamentos');
    const [msgErro, setMsgErro] = useState('');
    const [dados, setDados] = useState({
        codigo:'',
        nome:'',
        quantidade:'',
        documento:'',
        doc_path:'',
        dosagem:'',
        marca:'',
        fabricante:'',
        principio:'',
        observacoes:''});


    const Inputval = (value, name) => {
        let new_dados = { ...dados };
        new_dados[name] = value;
        setDados(new_dados);
        console.log(dados)
    };

   
    const Inputpdf = (docpath, doc) => {
console.log(doc)
let new_dados = { ...dados };
new_dados['doc_path'] = docpath;
new_dados['documento'] = doc;
setDados(new_dados);


    }

    const CloseAlert = () => {
        setMsgErro('')
    }

    const Salvar = () => {
        let form = new FormData();
        form.append('codigo', dados.codigo);
        form.append('medicamento_id', id);
        form.append('nome', dados.nome);
        form.append('quantidade', dados.quantidade);
        form.append('doc_path', dados.documento);
        form.append('dosagem', dados.dosagem);
        form.append('marca', dados.marca);
        form.append('fabricante', dados.fabricante);
        form.append('principio', dados.principio);
        form.append('observacoes', dados.observacoes?dados.observacoes:'');
        

     

        console.log(Object.fromEntries(form));
        setLoad_save(true);
        
        setMsgErro(true);
        fetch(`${URL}api/update_medicamentos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: form
        }).then(async (responseLog) => {
            try {
                let resp = await responseLog.json();
                console.log(resp);
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
                    setLoad_save(false);
                    setMsgErro(erro);
                }
                else {
                    setLoad_save(false)
                    setRedirect(true)
                }
            } catch (err) {
                console.log(err);
                setLoad_save(false);
                setMsgErro('Erro ao pegar resposta do servidor');
            }

        })
            .catch((err) => {
                console.log(err);
                setLoad_save(false);
                setMsgErro('Erro ao pegar resposta do servidor. Você está conectado a internet?');
            });
    }

    const GetData = (id) => {
        setLoad_screen(true);
        fetch(`${URL}api/index_medicamento/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(async (responseLog) => {
            try {
                let resp = await responseLog.json();
                console.log(resp);
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
                    setRedirect(true);
                }
                else {
                    setLoad_screen(false);
                    let dados =resp.medicamento;
                    dados.link_doc = dados.doc_path 
                     setDados(dados);  

                     console.log(dados)
                    // setNome(resp.curso.nome);
                    // setCarga(resp.curso.carga_horaria);
                    // setModulos(resp.curso.modulos);
                    // setNivel(resp.curso.nivel);
                    // setModalidade(resp.curso.modalidade);      
                }
   
            } catch (err) {
                setRedirect(true);
                console.log(err);        
            }
        })
            .catch((err) => {
                console.log(err);
                setLoad_screen(false);
                setRedirect(true);
            });
    }


    useEffect(() => {
        GetData(id);
    }, [])
    return (
        <div className="row">
            {redirect == true && <Redirect to={path} />}
            <div className="col-12">
                <div className="card">
                    <div className="card-body" id="card">
                        <HeaderForm Title="Editar medicamento" subTitle="Edite o medicamento do seu sistema" />
                        <div>
                            {msgErro != '' && <AlertError msgErro={msgErro} ClickClose={CloseAlert} />}
                            {load_screen == true && <LoadSave/> }
                           {load_screen == false && <div className="row">
                                <div className="col-12">
                                <InputText label="Codigo" type="text" required={true} Onchange={Inputval} val={dados.codigo} placeholder="Código do medicamento" />

                                    <InputText label="Nome" type="text" required={true} Onchange={Inputval} val={dados.nome} placeholder="Nome do medicamento" />
                                    <InputText label="Quantidade" type="text" required={true} Onchange={Inputval} val={dados.quantidade} placeholder="Quantidade do medicamento" />
                                    <InputPdf Onchange={Inputpdf} required={true} title={dados.link_doc} />
                                    {dados.link_doc != null &&  <a href={URL + dados.doc_path} target="_blank" style={{
                                                       marginLeft:'5px',
                                                        fontWeight: 'bold'
                                                    }}>{dados.link_doc}</a>}
                                    <InputText label="Dosagem" type="text" required={true} Onchange={Inputval} val={dados.dosagem} placeholder="Dosagem do medcamento" />
                                    <InputText label="Marca" type="text" required={true} Onchange={Inputval} val={dados.marca} placeholder="Marca do medicamento" />
                                    <InputText label="Fabricante" type="text" required={true} Onchange={Inputval} val={dados.fabricante} placeholder="Fabricante do medicamento" />
                                    <InputText label="Principio" type="text" required={true} Onchange={Inputval} val={dados.principio} placeholder="Principio ativo do medicamento" />
                                    <InputTextArea label="Observacoes" type="text" required={false} Onchange={Inputval} val={dados.observacoes!=null?dados.observacoes:''} placeholder="Observações..." />
                                    {load_save ==false && <div className="row mt-3">
                                        <ButtonLink url="/medicamentos" color="secondary" name="Voltar" icon={<MdReply />} ></ButtonLink>
                                        <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end"
                                            style={{ marginBottom: '0.5rem' }}>
                                            <button type="button" onClick={Salvar} className="btn btn-success btn-lg waves-effect waves-light"
                                                style={{ backgorundColor: '#f2f2f2' }}>Salvar</button>
                                        </div>
                                    </div>}
                                    {load_save == true && <LoadSave/>}

                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarMedicamentos;