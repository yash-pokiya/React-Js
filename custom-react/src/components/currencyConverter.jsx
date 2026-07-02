import React, { useEffect, useState } from 'react'
import { ArrowUpDown } from "lucide-react";
import InputBox from './inputBox';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        const fetchPrice = async () => {
            if (from === null || to === null) return;
            const url = `https://open.er-api.com/v6/latest/${from}`
            try {
                const data = await fetch(url);
                const response = await data.json();
                setConvertedAmount(Math.round((response.rates[to] * amount) * 100) / 100)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPrice();
    }, [amount, from, to])

    useEffect(() => {
        const fetchCode = async () => {
            const url = `https://open.er-api.com/v6/latest/USD`
            try {
                const data = await fetch(url);
                const response = await data.json();
                setCodes(Object.keys(response?.rates))
            } catch (error) {
                console.log(error)
            }
        }
        fetchCode();
    }, [])

    return (

        <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl shadow-xl shadow-amber-500/25 rounded-xl p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
                    Currency Converter
                </h1>

                {/* From */}
               <InputBox label="From" amount={amount} onAmountChange={setAmount} isDisable={false} onCurrencyChange={setFrom} currency={from} codes={codes}/>

                {/* Swap Button */}
                <div className="flex justify-center my-3">
                    <button className="bg-slate-700 hover:bg-slate-600 text-lg justify-center items-center flex gap-1 transition px-4 py-2 rounded-lg font-semibold">
                        <ArrowUpDown />
                    </button>
                </div>

                {/* To */}
               <InputBox label="To" amount={convertedAmount} isDisable={true} onAmountChange={(e) => setConvertedAmount(e)} onCurrencyChange={setTo} currency={to} codes={codes} />

                {/* Convert Button */}
                <button className="w-full mt-6 bg-slate-700 hover:bg-slate-600 transition py-3 rounded-lg font-semibold" >
                    Convert USD to INR
                </button>
            </div>
        </div>
    )
}

export default CurrencyConverter