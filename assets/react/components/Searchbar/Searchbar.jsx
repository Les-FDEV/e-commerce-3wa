import React, {useEffect} from 'react';

function Searchbar({data}) {

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <div></div>
    );
}

export default Searchbar;