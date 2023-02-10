import React from 'react';

function SearchInput({type, id, className, setSearch, search, placeholder}) {
    return (
        <input
            type={type}
            id={id}
            className={className}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder={placeholder}
        />
    );
}

export default SearchInput;