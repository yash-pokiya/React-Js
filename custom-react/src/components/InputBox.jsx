import React from 'react'

const inputBox = ({label , amount , onAmountChange , onCurrencyChange , isDisable  , codes}) => {
    return (
        <div className="w-full border rounded-lg p-4">
            <p className="mb-3 text-lg">{label}</p>

            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="number"
                    onChange={(e) => onAmountChange(e.target.value)}
                    value={amount}
                    disabled={isDisable}
                    placeholder="Enter amount"
                    className="flex-1 h-11 border rounded-lg bg-transparent px-4 outline-none"
                />

                <select className="flex-1 h-11 border rounded-lg bg-slate-800 px-4  outline-none" onChange={(e) => onCurrencyChange(e.target.value)}>
                    <option value="">Select Currency</option>
                    {codes.map((a) => {
                        return <option key={a} value={a}>{a}</option>
                    })}
                </select>
            </div>
        </div>

    )
}

export default inputBox