import { useEffect, useState } from "react";
import supabase from "../supabaseConfig";

const Dashboard = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        const { data, error } = await supabase
            .from('products')
            .select(
                `
                product_name,
                price
    `,
            )
        setData(data)

    }
   
    useEffect(() => {
        // getData()
        getSmoothies()
    }, [])
    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        This Quarter Sales
                    </h2>
                    <div>
                        {/* {data.map((product) => {
                            return (
                                <div className="flex justify-between">
                                    <h1>{product.product_name}</h1>
                                    <h1>{product.price}</h1>
                                </div>
                            )

                        })} */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;