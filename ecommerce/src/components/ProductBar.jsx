import React, { useEffect, useState } from 'react'
import ProductCard from './ui/ProductCard'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Key } from 'lucide-react'
const ProductBar = () => {
    const [Product, setProduct] = useState([])
    useEffect(() => {
        const fetchProducts = async() => {
            try {
                let response = await axios.get("https://dummyjson.com/products?limit=100");
                setProduct(response.data.products)
                console.log(response.data.products)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchProducts()
    },[])

  return (
        <>
        <section className='p-5 flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
                {Product.map((data) => {
                    console.log(data)
                    return(
                        <Link to={`/product/${data.id}`} key={data.id} >
                         <ProductCard   productData={data} />;
                        </Link>
                    )
                })}
            </div>
        </section>
    </> 
  )
}

export default ProductBar