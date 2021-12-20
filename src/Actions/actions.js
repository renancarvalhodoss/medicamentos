export const login = (data) => (
    {
        type: 'login',
        payload: data
    }
);

export const logout = () => (
    {
        type: 'logout',
        payload: ''
    }
);


export const mudarDados = (data) =>(
    {
        type:'dados',
        payload:data
    }
);

export const menuCollapsed = (data) =>(
    {
        type:'menuCollapsed',
        payload: data
    }
);