import { AiOutlineSearch,  }   from "react-icons/ai"
  
const SearchBar = () => {
  return (
    <div className='hidden md:inline-flex bg-midColor flex-1 h-[4vh] justify-center items-center rounded-full px-1'>

        <AiOutlineSearch className="w-5 h-5 text-darkColor" />
        <input type="search" placeholder='Search'
          className='w-[80%] h-full bg-transparent px-2 border-none outline-none placeholder:text-darkColor text-darkColor'
        />
    </div>
  )
}

export default SearchBar