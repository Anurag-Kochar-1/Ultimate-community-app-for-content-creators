// import BiSearch from 'react-icons/bi'

const SearchBar = () => {
  return (
    <div className='hidden bg-purple-500 sm:inline-flex flex-1 h-[4vh]  justify-center items-center '>

        <input type="search" placeholder='Search Reddit'
          className='w-[80%] h-full bg-[#F5F6F8] px-4 mx-1 rounded-full border border-gray-400 outline-none'
        />
        {/* <BiSearch /> */}
    </div>
  )
}

export default SearchBar