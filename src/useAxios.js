import React, { useEffect , useState } from "react";
import axios from "axios";


const instance= axios.create({
  baseURL: "https://react-mini-projects-api.classbon.com",
});

const useAxios=(axiosParmas) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  
  const fetchData = async () => {
    try {
    const result =  await instance.request(axiosParmas)
    setResponse(result.data )
    } catch(error) {
        setError(error)
    } finally {
        setLoading(false)
    }
  };
  useEffect(()=>{
    fetchData()
  },[axiosParmas.url])

  return [response, error, loading ] ;
}

export default useAxios;
