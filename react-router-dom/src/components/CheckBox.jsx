import React, { useState } from 'react'
import Table from './Table';

const CheckBox = () => {
    const [gender, setGender] = useState('');
    const [city, setCity] = useState("");
    const handleCity = (e) => {
        setCity(e.target.value)
    }
    const users = [
        {
            username: "Yash",
            age: 22,
            gender: "Male",
            email: "yash.patel@example.com",
            mobileNo: "9876543210",
        },
        {
            username: "Priya",
            age: 24,
            gender: "Female",
            email: "priya.shah@example.com",
            mobileNo: "9876543211",
        },
        {
            username: "Rahul",
            age: 27,
            gender: "Male",
            email: "rahul.mehta@example.com",
            mobileNo: "9876543212",
        },
        {
            username: "Sneha",
            age: 21,
            gender: "Female",
            email: "sneha.patel@example.com",
            mobileNo: "9876543213",
        },
        {
            username: "Amit",
            age: 30,
            gender: "Male",
            email: "amit.verma@example.com",
            mobileNo: "9876543214",
        },
        {
            username: "Neha",
            age: 26,
            gender: "Female",
            email: "neha.gupta@example.com",
            mobileNo: "9876543215",
        },
        {
            username: "Karan",
            age: 23,
            gender: "Male",
            email: "karan.singh@example.com",
            mobileNo: "9876543216",
        },
        {
            username: "Anjali",
            age: 29,
            gender: "Female",
            email: "anjali.desai@example.com",
            mobileNo: "9876543217",
        },
        {
            username: "Rohit",
            age: 25,
            gender: "Male",
            email: "rohit.kumar@example.com",
            mobileNo: "9876543218",
        },
        {
            username: "Pooja",
            age: 28,
            gender: "Female",
            email: "pooja.joshi@example.com",
            mobileNo: "9876543219",
        },
    ];

    return (
        <>
<table border={1} cellPadding={10} cellSpacing={10} className='w-[50%] h-auto m-10 border-collapse'>
    <thead className='bg-emerald-100 shadow-2xl'>  
        <tr className='border border-black'>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user) => (
            <Table key={user.username} user={user} />
        ))}
    </tbody>
</table>
            <hr />
            <div className='bg-gray-300 flex flex-col justify-center items-center w-50 h-auto'>
                <h1 className="text-3xl font-medium">radio box</h1>
                <div className='flex gap-2'>
                    <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="Male" id="male" />
                    <label htmlFor="male">Male</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="Female" id="female" />
                    <label htmlFor="female">Female</label>
                </div>
                <h1>{gender}</h1>
            </div>

            <div>
                <select className='w-auto h-auto rounded-md outline-none shadow-2xl m-10 bg-emerald-100' onChange={handleCity} value={city} name="" id="">
                    <option value="">Select City</option>
                    <option onClick={handleCity} value="surat">Surat</option>
                    <option onClick={handleCity} value="rajkot">Rajkot</option>
                    <option onClick={handleCity} value="ahmedabad">Ahmedabad</option>
                </select>
                <h1>selected city : {city}</h1>
            </div>
        </>
    )
}

export default CheckBox