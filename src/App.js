import React from "react";
import MovieCard from './components/MovieCard'
import API_URL from './apikey'
import './App.css'
import SearchIcon from './search.svg'

function App() {
    const [movies, setMovies] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const searchMovies = async function(title) {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search);
    }

    React.useEffect(function () {
        searchMovies('Spiderman')
    }, [])

    return (
        <div className="app">
            <h1>MoviLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => { searchMovies(searchTerm) }}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((movie) => (
                                    <MovieCard key={movie.imdbID} movie={movie} />
                                ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    )
}

export default App