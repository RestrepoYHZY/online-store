import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../actions/products.action";
import { getProviders } from "../actions/providers.action";
import { getCustomer } from "../actions/customer.action";
import { getInvoices } from "../actions/invoice.action";


const EntitiesContext = createContext();

const useEntities = () => {


  const context = useContext(EntitiesContext);
  if (context) return context;
};
const EntitiesProvider = ({ children }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading]= useState(false);
  
  // PROVIDERS
  const [providers, setProviders] = useState([]);

  const getProvidersData = async () => {
    try {
      const { data } = await getProviders();
      setProviders(data);
    } catch (error) {
      console.log(error);
    }
  };

 

 //Products

 const [products, setProducts]= useState ([]);

 const getProductsData = async()=>{
   try{
     const {data}= await getProducts();
     setProducts(data);
     console.log(data)
   }catch (error) {
     console.log(error);
   }
 };

  
  //Customer
  const [customers, setCustomer]= useState ([]);

 const getCustomerData = async()=>{
   try{
     const {data}= await getCustomer();
     setCustomer(data);
     console.log(data)
   }catch (error) {
     console.log(error);
   }
 };

// list invoice
const [listInvoices, setListInvoice] =useState([])

const getListInvoicesData = async () =>{
  try{
    const { data } = await getInvoices();
    setListInvoice(data);
  }catch(error){
    console.log(error)
  };
};


  useEffect(() => {
    getProvidersData();
    getProductsData();
    getCustomerData();
    getListInvoicesData();
  }, []);


  return (
    <>
      <EntitiesContext.Provider
        value={{
          providers,
          getProvidersData,
          products,
          getProductsData,
          customers,
          getCustomerData,
          listInvoices,
          getListInvoicesData,
          success, setSuccess,
          error, setError,
          loading, setLoading

        }}
      >
        {children}
      </EntitiesContext.Provider>
    </>
  );





};

export { EntitiesProvider, useEntities };
