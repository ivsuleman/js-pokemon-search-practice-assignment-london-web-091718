//1. query items on page which we will need to interact with
const elPokelistDiv = document.querySelector("#pokemon-container");
const elSearchInput = document.querySelector("#pokemon-search-input");
const searchValue = '';
let pokemonListApi = []; //empty array just in case nothing is returned from API call

//2.render a single pokemon
const renderPokemon = (pokemon) => {
  //1.create element on page
  const elPokemonDiv = document.createElement('div');
  //2.add the same class as final eg to element 
  elPokemonDiv.className = 'pokemon-container';

  //copied from final eg, every pokemon needs to look like this. inspected and copied html from eg.
  elPokemonDiv.innerHTML = `
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${pokemon.name}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img 
            data-id="11" 
            data-action="flip" 
            class="toggle-sprite" 
            src="${pokemon.sprites.front}
          ">
        </div>
      </div>
    </div>`
  
  //add image toggle event (image switches to front from back and vice-versa)
  const elImage = elPokemonDiv.querySelector('.toggle-sprite')
  
  elImage.addEventListener('click', () => {
    elImage.src = elImage.src === pokemon.sprites.front ? pokemon.sprites.back : pokemon.sprites.front
  })

  elPokelistDiv.appendChild(elPokemonDiv);
}


//3.render multiple pokemon
const renderPokemons = (pokemonList) => {
  //1.for each item it will render
  pokemonList.forEach(element => {
    renderPokemon(element)
  });
}


//4.update the list for rendering. when a use searches the list reduces.
const updateRenderPokemon = (pokemonList) => {
  //1.clear page of pokemons
  elPokelistDiv.innerHTML = '';

  //2.render the list of pokemon passed in
  renderPokemons(pokemonList);
}


//5.listen for user input search string
elSearchInput.addEventListener('keyup', event => {
  //1.capture input search term
  let searchValue = event.target.value;

  //2.using search value we want to update the list. 
    //Test in console POKEMON[1].name.includes('ven')
    //Change search terms to lower case
  const pokemonListFiltered = pokemonListApi.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()))

  //3.render pokemons
  updateRenderPokemon(pokemonListFiltered);
})


//Run

//unwrap promise to get the list in array form
getPromiseFromApi()
  .then(pokemonList => {
    pokemonListApi = pokemonList
    updateRenderPokemon(pokemonList)
  })

// updateRenderPokemon(pokemonListFromApi)  // page will display all pokemon when refreshed.