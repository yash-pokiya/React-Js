import React from 'react'

const Table = ({user}) => {

    return (
        <>
                <tr className='py-1' key={user.username}>
                    <td className='py-1 px-10'>  {user.username}</td>
                    <td className='py-1 px-10'>{user.age}</td>
                    <td className='py-1 px-10'>{user.gender}</td>
                    <td className='py-1 px-10'>{user.email}</td>
                    <td className='py-1 px-10'>{user.mobileNo}</td>
                </tr>



        </>
    )
}

export default Table