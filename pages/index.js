import axios from 'axios';

import { useContext } from 'react'
import Layout from '../components/Layout';
import Product from '../modals/product';
import { AppWrapper } from '../utils/context';
import { toast } from 'react-toastify'
import db from '../utils/db';
import ProductItem from '../components/ProductItem';
export default function Home({ products }) {

  
  const { state, dispatch } = useContext(AppWrapper)
  const { cart } = state;
  const addtocartHandler = async (item) => {

    const existItem = cart.cartItem.find((x) => x._id === item._id)

    const quantity = existItem ? existItem.quantity + 1 : 1;
    
      
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })

  }
  return (
    <Layout title={"home page"} >
      <div className='flex flex-wrap   mt-16  items-center justify-center rounded-xl px-4'>
        {/* {console.log(data)} */}
        {products.map((item) => (
          <ProductItem  key={item._id}
            addtocartHandler={addtocartHandler}
            product={item}
          >
          </ProductItem>
        ))}
      </div>
    </Layout>
  )
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      // products: products.map(db.convertDocToObj)
      products: products ? JSON.parse(JSON.stringify(products)) : null 

    }
  }

}