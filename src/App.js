import { useState, useEffect } from "react";

const App = () => {
  const [cityName, setCityName] = useState("Hanoi")
  const [inputText, setInputText] = useState("")
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=189271b827844bff7388350c44848615&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false)
          return res.json()
        }
        else {
          throw new Error("Something went wrong")
        }
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [cityName, error])

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value)
      setInputText("")
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center bg-bgmain bg-cover bg-no-repeat bg-center">
      {
        !loading ? (
          <>
            <input
              type="search"
              id="default-search"
              variant="filled"
              value={inputText}
              error={error}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleSearch}
              className="block w-full md:w-[400px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search City..."
            />

            <h1 className="city text-5xl font-extrabold text-white">
              {data.name}
            </h1>

            <div className="group">
              <figure className="max-w-lg">
                <img
                  className="h-auto max-w-[400px] rounded-lg"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="image description"
                />
              </figure>

              <h1 className="text-5xl font-extrabold text-white">
                {data.weather[0].main}
              </h1>
            </div>

            <h1 className="temp text-5xl font-extrabold text-white">
              {data.main.temp.toFixed()} C
            </h1>

            <div className="box-container mt-8 flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="box p-4 border bg-[#222222] rounded-xl opacity-50 w-[200px] text-center flex flex-col gap-2 hover:scale-110">
                <p className="mb-3 text-white">
                  Humidity
                </p>
                
                <h1 className="temp text-5xl font-extrabold text-white">
                  {data.main.humidity.toFixed()}
                </h1>
              </div>

              <div className="box p-4 border bg-[#222222] rounded-xl opacity-50 w-[200px] text-center flex flex-col gap-2 hover:scale-110">
                <p className="mb-3 text-white">
                  Wind
                </p>

                <h1 className="temp text-5xl font-extrabold text-white">
                  {data.wind.speed.toFixed()} Kmh
                </h1>
              </div>

              <div className="box p-4 border bg-[#222222] rounded-xl opacity-50 w-[200px] text-center flex flex-col gap-2 hover:scale-110">
                <p className="mb-3 text-white">
                  Feel likes
                </p>

                <h1 className="temp text-5xl font-extrabold text-white">
                  {data.main.feels_like.toFixed()} C
                </h1>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-56 h-56 rounded-lg bg-transparent">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
              loading...
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App;
