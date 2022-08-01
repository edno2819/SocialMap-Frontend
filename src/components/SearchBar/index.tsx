import React from 'react'
import './index.css'

const SearchBar = ({placeholder, handleSearch}:{placeholder:string, handleSearch?:any}) => {

    //         setIsFetching(true)

    return (
        <div className='search'>
            <input
                type='search'
                placeholder="Pesquisar ..."
                disabled={false}
                onKeyUp={(e) => handleSearch(e)}
            />
        </div>

    )
}

export default SearchBar;