import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Logo from '../images/logo1.png';
import { URL } from '../variaveis';


const Registro = () => {

    const [loading, setloading] = useState(false);
    const [msgErro, setmsgErro] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const [path, setpath] = useState('/');
    const [loading_save, setloading_save] = useState(false);
    const [password_confirm, setpassword_confirm] = useState('');
    const [validation, setvalidation] = useState('');

    const Registrar = (e) => {
        e.preventDefault();
        const { nome, sobrenome, email, password, password_confirm } = e.target;
      
        setloading_save(true);
        setmsgErro('');
        fetch(`${URL}api/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // 'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nome.value,
                sobrenome: sobrenome.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirm.value
            })
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

                     setmsgErro( erro);
                    setloading_save(false);
                    setloading(false);
                }
                else {
                    setloading_save(false);
                    setpath('/login');
                    setredirect(true);
                }
            } catch (err) {
                console.log(err);
             setloading(false); setmsgErro('Erro ao pegar resposta do servidor');  loading_save(false) 
            }

        })
            .catch((err) => {
                console.log(err);
                setloading(false); setmsgErro('Erro ao pegar resposta do servidor. Você está conectado a internet?');  loading_save(false) 
            });
    }




    return (
        <div style={{ height: '100vh' }}>
            {redirect == true && <Redirect to={path} />}
            {loading && <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div className="spinner-border text-primary" role="status"  >
            </div></div>}
            {!loading && <div className="row" style={{ backgroundColor: 'white', margin: 0 }}>

                <div className="col-md-12 col-sm-12 col-12 col-lg-12 col-xl-12 d-block" style={{ overflow: 'hidden', backgroundSize: 'cover', padding: 0, margin: 0, height: '100vh' }}>
                    <div className="row" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="col-md-6 col-12 col-sm-12 col-lg-4 col-xl-4" style={{ margin: 0, padding: 0 }}>
                            <div className="card" style={{ margin: 0, maxWidth: 400 }}>
                                <div className="card-body" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>



                                    <div style={{ padding: '1rem', paddingBottom: 0 }}>
                                        <h4 className="font-18 m-b-5 text-center header-title">Cadastro</h4>
                                        <p className="text-muted text-center" >Faça seu cadastro para continuar.</p>

                                        <form className="form-horizontal m-t-30" onSubmit={Registrar}>
                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Nome<b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="nome" type="text"
                                                        className="form-control  " name="nome"
                                                        required autoComplete="nome" autoFocus />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Sobrenome <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="sobrenome" type="text"
                                                        className="form-control  " name="Sobrenome"
                                                        required autoComplete="Sobrenome"  />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>E-mail <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="email" type="email"
                                                        className="form-control  " name="email"
                                                        required autoComplete="email"  />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Senha <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="password" type="password"
                                                        value={password}
                                                        onChange={(e) => { setpassword(e.target.value) }}
                                                        className="form-control" name="password"
                                                        required autoComplete="current-password" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Confirmar senha <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="password_confirm" type="password"
                                                        value={password_confirm}
                                                        onChange={(e) => {
                                                            if (e.target.value != password) {
                                                                setvalidation('is-invalid')
                                                            } else if (e.target.value == null) {
                                                                setvalidation('');
                                                            }
                                                            else {
                                                                setvalidation('is-valid')
                                                            }
                                                            setpassword_confirm(e.target.value)
                                                        }}
                                                        className={'form-control ' + validation} name="password_confirm"
                                                        required autoComplete="current-password" />
                                                </div>
                                                { msgErro != '' && <div className="invalid-feedback">
                                                    {msgErro}
                                                </div>}
                                            </div>

                                            <div className="form-group row ">
                                                <div className="col-sm-12" style={{ padding: 0 }}>
                                                    <span className="invalid-feedback" style={{ display: 'flex', justifyContent: 'center' }} role="alert">
                                                        <strong style={{ textAlign: 'center', fontSize: '0.8rem' }}>{msgErro}</strong>
                                                    </span>
                                                </div>
                                                {loading_save == false && <div className="col-sm-12 text-right" style={{ textAlign: 'right', padding: 0 }}>
                                                    <button className="btn btn-success w-md waves-effect waves-light" style={{ width: '100%', marginTop: '15px', height: '3rem', }} type="submit">Registrar</button>
                                                </div>
                                                }

                                                {loading_save == true && <div className="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: '2rem' }}>
                                                    <div className="spinner-border text-primary" role="status"  >
                                                    </div>
                                                </div>}

                                            </div>


                                            <div className="form-group m-t-10 mb-0 row">
                                                <div className="col-12 m-t-20" style={{ textAlign: 'center' }}>

                                                    {/* <a href="{{ action('Auth\ForgotPasswordController@showLinkRequestForm',$faculdade->slug) }}">
                                            <i className="mdi mdi-lock"></i>{{ __('Esqueceu sua senha?') }}
                                        </a>  */}
                                                    {/* {faculdade == null && <a href="{{ action('Auth\ForgotPasswordController@showLinkRequestForm','admin') }}">
                                                    <i className="mdi mdi-lock"></i>Esqueceu sua senha?
                                        </a>} */}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="text-center mt-4">
                                        <p>© webchat 2021 </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>}
        </div>
    );
}


export default Registro;
