import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import SearchIcon from '@assets/icons/search.svg'

import KEY_CODES from '@constants/keyCodes'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [searchKey, setSearchKey] = useState(query)
  const navigate = useNavigate()

  return (
    <div className='search'>
      <input
        placeholder='Search'
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const { value } = e.currentTarget
          if (e.code === KEY_CODES.ENTER) {
            navigate(value ? `/movies?query=${value}` : '/movies', { replace: true })
          }
        }}
        value={searchKey}
      />
      <img src={SearchIcon} alt='search' />
    </div>
  )
}

export default Search
