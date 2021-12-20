import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Logo from '../images/logo_3.png';
import { URL } from '../variaveis';

const Login = () => {

    const [loading, setloading] = useState(false);
    const [msgErro, setmsgErro] = useState('');
    const [redirect, setredirect] = useState(false);
    const [path, setpath] = useState('');
    const [loading_save, setloading_save] = useState(false);
    const dispatch = useDispatch();

    const Login = (e) => {
        e.preventDefault();
        setloading_save(true);
        setmsgErro("")
        const { email, password } = e.target;

        fetch(`${URL}api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // 'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
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
                    setloading_save(false);
                    setmsgErro(erro);
                }
                else {
                    setloading_save(false);
                    // let permissoes = {};
                    // for(let i=0;i<resp.user.tipo_usuario.permissoes.length;i++){
                    //     permissoes[resp.user.tipo_usuario.permissoes[i].modulo] = resp.user.tipo_usuario.permissoes[i];
                    // }
                    // resp.user.tipo_usuario.permissoes = permissoes;
                    localStorage.setItem('token', resp.access_token);
                    localStorage.setItem('user', JSON.stringify(resp.user));
                    dispatch(
                        {
                            type: 'login',
                            payload:
                            {
                                token: resp.access_token,
                                user: resp.user
                            }
                        }
                    )
                }
            } catch (err) {
                console.log(err);
                setloading_save(false);
                setmsgErro('Erro ao pegar resposta do servidor')
            }

        })
            .catch((err) => {
                console.log(err);
                setloading_save(false);
                setmsgErro('Erro ao pegar resposta do servidor. Você está conectado a internet?')
            });
    }


    return (
        <div style={{ height: '100vh' }}>
            {redirect == true && <Redirect to={path} />}
            {loading && <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div className="spinner-border text-primary" role="status"  >
            </div></div>}
            {!loading && <div className="row" style={{ backgroundColor: 'white', margin: 0 }}>

                <div className="col-md-12 col-sm-12 col-12 col-lg-12 col-xl-12 d-block" style={{ overflow: 'hidden', backgroundSize: 'cover', padding: 0, margin: 0, height: '100vh' }}>
                    <div className="row" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                        <div className="col-md-6 col-12 col-sm-12 col-lg-4 col-xl-4" style={{ margin: 0, padding: 0 }}>
                            <div className="card" style={{ margin: 0, maxWidth: 400 }}>
                                <div className="card-body" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>

                                    <div className="text-center">
                                        <a className="logo"><img src={Logo}
                                            height="80" alt="logo" /></a>
                                    </div>

                                    <div style={{ padding: '1rem', paddingBottom: 0 }}>
                                        <h4 className="font-18 m-b-5 text-center header-title">Bem vindo !</h4>
                                        <p className="text-muted text-center" >Faça login para continuar.</p>

                                        <form className="form-horizontal m-t-30" onSubmit={Login}>
                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>E-mail <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="email" type="email" className="form-control  " name="email" required autoComplete="email" autoFocus />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Senha <b style={{ color: 'red' }}>*</b></label>
                                                <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="current-password" />
                                                </div>
                                            </div>
                                            <div className="form-group row ">
                                                <div className="col-sm-12" style={{ padding: 0 }}>
                                                    <span className="invalid-feedback" style={{ display: 'flex', justifyContent: 'center' }} role="alert">
                                                        <strong style={{ textAlign: 'center', fontSize: '0.8rem' }}>{msgErro}</strong>
                                                    </span>
                                                </div>

                                                {loading_save == false && <div className="col-sm-12 text-right" style={{ textAlign: 'right', padding: 0 }}>
                                                    <button className="btn btn-primary w-md waves-effect waves-light" style={{ width: '100%', marginTop: '15px', height: '3rem', }} type="submit">Entrar</button>
                                                    <Link to={'/registro'}><p style={{ color: 'blue', fontSize: '12px', textDecoration: 'underline', marginTop: '10px' }}>Registrar-se</p></Link>
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
                                        <p>© winmed 2021 </p>
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


export default Login;
