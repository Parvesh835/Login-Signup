import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './Utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])


  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logedout')
    setTimeout(() => {
      navigate('/login') 
    },1000)
  }

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchProducts();
  },[])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <ul>
        {
          products.map((items, index) => (
            <li key={index}>
              <span>{items.name}: {items.price}</span>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

export default Home
