import React from 'react';
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import SearchInput from "./SearchInput";

function SearchForm({setSearch, search}) {
    return (
        <div className="form-outline">
            <SearchInput
                type="search"
                id="form1"
                className="form-control"
                setSearch={setSearch}
                search={search}
                placeholder="Rechercher produit..."
            />
        </div>
    );
}

export default SearchForm;