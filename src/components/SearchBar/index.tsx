import React from 'react'
import './index.css'

const SearchBar = ({placeholder, handleSearch}:{placeholder:string, handleSearch:any}) => {
    // const [repos, setRepos] = useState('')
    // const [isFetching, setIsFetching]= useState<boolean>(false)

    // function handleSearch(e: React.KeyboardEvent<HTMLDivElement>) {
    //     const value = e.target.value
    //     const keyCode = e.which || e.keyCode
    //     const ENTER = 13

    //     if (keyCode === ENTER) {
    //         setIsFetching(true)
    //         setIsFetching(false)
    //     }
    // }

    return (
        <div className='search'>
            <input
                type='search'
                placeholder="Pesquisar ..."
                disabled={false}
                onKeyUp={handleSearch}
            />
        </div>

    )
}

export default SearchBar;