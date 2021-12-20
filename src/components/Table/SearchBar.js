import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = (props) =>{
    return(
        <div className="col-12 col-md-6">
            <form className="app-search mt-1" style={{ width: '100%' }} >
                <div className="form-group mb-0" style={{ width: '100%', position: 'relative' }}>
                    <input value={props.val} name="search" placeholder="Pesquisar Nome ou Fabricante..." className="form-control" style={{ width: '100%', paddingRight: 40, borderRadius: 100 }} onChange={(e) => {
                        props.Onchange(e.target.value);
                    }} />
                    <div style={{ width: 40, position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                        <MdSearch />

                    </div>

                </div>
            </form>
        </div>

     
    )
}

export default SearchBar;