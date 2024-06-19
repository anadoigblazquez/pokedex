function SearchBarAbstract() {
    this.searchBar = document.querySelector('.search-bar__input-js');
    this.pokemonsContainer = document.querySelector('.pokemons-container-js');
};

SearchBarAbstract.prototype = {
    init: function () {
        var _this = this;
        
        _this.listeners();

    },
    listeners: function () {
        var _this = this;
        console.log(_this.searchBar);
        _this.searchBar.addEventListener('input', function(event) {
            _this.getSearchedPokemons(event);
        });
    },
    getSearchedPokemons: function (event) {
        var _this = this;
        console.log(event.target.value)
        const inputValue = event.target.value.toLowerCase().trim();
        const filtered = CONFIG.pokemonsArray.filter((pokemon) => {
            const matchId = pokemon.id === Number(inputValue);
            const matchName = pokemon.name.toLowerCase().includes(inputValue);
        
            return matchId || matchName;
        });

        Utils.generatePokemons(filtered, _this.pokemonsContainer);
    }
};

const SearchBar = function () {
    SearchBarAbstract.call(this);
};

SearchBar.prototype = Object.create(SearchBarAbstract.prototype);
SearchBar.prototype.constructor = SearchBarAbstract;
