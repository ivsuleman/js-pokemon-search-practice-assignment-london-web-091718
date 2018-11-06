//API calls

const getPokemonList = () => {
    return fetch('http://localhost:3000/pokemon')
       .then(response => response.json())
}