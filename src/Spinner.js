import React from 'react';
import loading from './loading.gif';
const Spinner = ()=> {
    return (
      <div className='text-center'>
        <img src={loading} width="80px"  alt="" />
      </div>
    )
}
export default Spinner