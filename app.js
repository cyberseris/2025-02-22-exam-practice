const {default:axios} = axios;
const { useState, useEffect } = React;

const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery"
];

function App() {
  const [products, setProducts] = useState([]);
  const [select,setSelect] = useState('All');
  const [filterProducts, setFilterProducts] = useState();
  const [search, setSearch] = useState('');
  const [likeProducts, setLikeProducts] = useState({})

  useEffect(()=>{
    productsList()
  },[]);

  const productsList = async() => {
    await axios.get('https://fakestoreapi.com/products')
    .then(res=>{
      setProducts(res.data)
      console.log(res.data)
    })
    .catch(err=>{
      console.log("Error: ", err)
    }) 
  };

  const handleCategory = (e) => {  
    if(e.target.value === 'All'){
      const tempProducts = search?products.filter((product)=>
        product.title.includes(search)
      ):products
      setFilterProducts(tempProducts);
    }else{
      const tempProducts = search?products.filter((product)=>
        product.title.includes(search) && product.category===e.target.value
      ):products.filter((product)=> product.category===e.target.value)
      setFilterProducts(tempProducts);
    }
    setSelect(e.target.value);
  }

/*   const handleSearch = (e) => {    
    if(select==='All'){
      const tempProducts = products.filter((product)=>
        product.title.includes(e.target.value));
      setFilterProducts(tempProducts);
    }else{
      const tempProducts = products.filter((product)=>
        product.title.includes(e.target.value) && product.category===select
      );
      setFilterProducts(tempProducts);
    }
    setSearch(e.target.value)
  } */

  const handleSearchChange = (e) => {
    if(select==='All'){
      const tempProducts = products.filter((product)=>
        product.title.includes(e.target.value));
      setFilterProducts(tempProducts);
    }else{
      const tempProducts = products.filter((product)=>
        product.title.includes(e.target.value) && product.category===select
      );
      setFilterProducts(tempProducts);
    }
    setSearch(e.target.value)
  }

  const handleColor = (id) => {
    setLikeProducts((prev)=>({...prev, [id]:prev[id]==="red"?"none":"red"}))
  }

   return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="搜尋產品..."
          className="p-2 border rounded-md flex-grow"
          onChange={handleSearchChange}
          /* onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }} */
          />
        <select
          className="p-2 border rounded-md"
          value={select}
          onChange={handleCategory}
          >
          {categories.map((category,i)=>{
            return (<option key={i} value={category}>{category}</option> 
            )}
          )}
        </select>
      </div>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!filterProducts?products.map((product)=>{
          return(
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={'圖片 title'}
                  className="w-full h-48 object-cover object-center hover:scale-110 transition duration-200"
                  />
                <button
                  onClick={()=>handleColor(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={likeProducts[product.id] || "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center ms-1 mb-4">
                  <span className="font-bold text-lg">$ {product.price}</span>
                </div>
              </div>
            </div>
          )
        }):filterProducts.map((product)=>{
          return(
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={'圖片 title'}
                  className="w-full h-48 object-cover object-center hover:scale-110 transition duration-200"
                  />
                <button
                  onClick={()=>handleColor(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={likeProducts[product.id] || "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center ms-1 mb-4">
                  <span className="font-bold text-lg">$ {product.price}</span>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
