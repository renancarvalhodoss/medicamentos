import { useState } from "react";
import {InputTextArea, InputText,InputPdf} from '../../components/Form/Inpunts';
import { ButtonLink } from "../../components/Buttons/Buttons";
import HeaderForm from "../../components/Form/HeaderForm";
import AlertError from "../../components/Form/AlertError";
import { MdReply } from "react-icons/md";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { URL } from "../../variaveis";
import { LoadSave } from "../../components/Form/Loads";

const CadastrarMedicamento = (props) => {
    const token = useSelector(store => store.token)
    const [redirect, setRedirect] = useState(false);
    const [path_pdf, setPath_pdf] = useState('');
    const [nomepdf, setNomepdf] = useState('');
    const [load_save, setLoad_save] = useState(false);
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
        fetch(`${URL}api/store_medicamentos`, {
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

    return (
        <div className="row">
            {redirect == true && <Redirect to={path} />}
            <div className="col-12">
                <div className="card">
                    <div className="card-body" id="card">
                        <HeaderForm Title="Cadastrar medicamento" subTitle="Cadastre os medicamentos do seu sistema" />
                        <div>
                            {msgErro != '' && <AlertError msgErro={msgErro} ClickClose={CloseAlert} />}
                            <div className="row">
                                <div className="col-12">
                                <InputText label="Codigo" type="text" required={true} Onchange={Inputval} val={dados.codigo} placeholder="Código do medicamento" />
                                    <InputText label="Nome" type="text" required={true} Onchange={Inputval} val={dados.nome} placeholder="Nome do medicamento" />
                                    <InputText label="Quantidade" type="text" required={true} Onchange={Inputval} val={dados.quantidade} placeholder="Quantidade do medicamento" />
                                    <InputPdf Onchange={Inputpdf} required={true} />
                                    <InputText label="Dosagem" type="text" required={true} Onchange={Inputval} val={dados.dosagem} placeholder="Dosagem do medcamento" />
                                    <InputText label="Marca" type="text" required={true} Onchange={Inputval} val={dados.marca} placeholder="Marca do medicamento" />
                                    <InputText label="Fabricante" type="text" required={true} Onchange={Inputval} val={dados.fabricante} placeholder="Fabricante do medicamento" />
                                    <InputText label="Principio" type="text" required={true} Onchange={Inputval} val={dados.principio} placeholder="Principio ativo do medicamento" />
                                    <InputTextArea label="Observacoes" type="text" required={false} Onchange={Inputval} val={dados.observacoes} placeholder="Observações..." />
                                    {load_save ==false && <div className="row mt-3">
                                        <ButtonLink url="/medicamentos" color="secondary" name="Voltar" icon={<MdReply />} ></ButtonLink>
                                        <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end"
                                            style={{ marginBottom: '0.5rem' }}>
                                            <button type="button" onClick={Salvar} className="btn btn-success btn-lg waves-effect waves-light"
                                                style={{ backgorundColor: '#f2f2f2' }}>Cadastrar medicamento</button>
                                        </div>
                                    </div>}
                                    {load_save == true && <LoadSave/>}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarMedicamento;