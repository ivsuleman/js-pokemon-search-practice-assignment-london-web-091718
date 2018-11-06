//API calls

const getPromiseFromApi = () => {
    return fetch('http://localhost:3000/pokemon')
       .then(response => response.json())
}