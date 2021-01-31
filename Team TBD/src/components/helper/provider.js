import React, { useState } from 'react';                  
import PackageContext from './context';


const Provider= ({children})=> {
    const [amount, setamount] = useState({
        amt: 0,
        toadd:0
    })
  return (
    <div>
        <PackageContext.Provider
        value={{
            data: amount,
            Add: ()=>{
                setamount({
                    amt: amount.amt+amount.toadd,
                    toadd:0,
                })
            }
        }}
        >
            {children}
        </PackageContext.Provider>
    </div>
  );
}

export default Provider;