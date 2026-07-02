import React, { useEffect, useState } from 'react'

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState([])
    const [error, setError] = useState("")

    const apiUrl = `https://wttr.in/${city}?format=j1`
    const weatherApi = async () => {
        try {
            const data = await fetch(apiUrl);
            const res = await data.json();
            const weatherData = res.current_condition[0]
            setWeather(weatherData);
            setError("");
        } catch (error) {
            console.log(error)
            setError(`No city found`)
        }
    }

    return (
        <>
            <div>
                <div className="min-h-screen bg-blue-100 flex items-center justify-center">
                    <div className="w-96 bg-white rounded-xl shadow-lg p-8">
                        {/* Search Bar */}
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={weatherApi}
                            >
                                Search
                            </button>
                        </div>

                        {/* Weather Info */}
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {weather && (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">
                                    {console.log(`city : `, city)}
                                    {city}
                                </h2>

                                <div className="text-4xl font-bold mb-2">
                                    {weather.temp_C}°C
                                </div>

                                <div className="text-gray-600 capitalize mb-4">
                                    {weather.weatherDesc?.[0]?.desc}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p>Feels Like</p>
                                        <p className="font-bold">{weather?.FeelsLikeC}°C</p>
                                    </div>
                                    <div>
                                        <p>Humidity</p>
                                        <p className="font-bold">{weather?.humidity}%</p>
                                    </div>
                                    <div>
                                        <p>Temp in °C </p>
                                        <p className="font-bold">{weather?.temp_C}°C</p>
                                    </div>
                                    <div>
                                        <p>Temp in °F</p>
                                        <p className="font-bold">{weather?.temp_F}°F</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather