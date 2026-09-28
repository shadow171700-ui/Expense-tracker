import React, { useEffect, useState } from 'react'

function useLocalStorage(key , initialExpense ) {
  const [value, setValue] = useState(()=>{
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialExpense;
  });
  
  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(value))
  },[key,value])
  

  return[value,setValue]
}

export default useLocalStorage