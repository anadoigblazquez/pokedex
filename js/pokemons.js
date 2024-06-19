function PokemonsAbstract() {
    this.pokemonId;
    this.url;
    this.pokemonsMax = 150;
    this.pokemonsContainer = document.querySelector('.pokemons-container-js');
    this.loadingContainer = document.querySelector('.loading-container');
    this.buttonsContainer = document.querySelector('.filter__buttons-container');
    this.filterContainer = document.querySelector('.filter');
    this.pokemonTypes = [];
}

PokemonsAbstract.prototype = {
    init: function () {
        var _this = this;
        _this.getPokemonsArr();
        
    },
    show: function () {
        var _this = this;
    },
    listeners: function () {
        var _this = this;
    },

    getPokemon: async function (pokemonId) {
        var _this = this;
        
        _this.url = `https://pokeapi.co/api/v2/pokemon/${_this.pokemonId}`;
        const res = await fetch(_this.url);
        const pokemon = await res.json();
        CONFIG.pokemonsArray.push(pokemon);
        // TO DO: solventar cuando recibe el 404
    },

    getPokemonsArr: async function () {
        var _this = this;
        for (_this.pokemonId = 1; _this.pokemonId <= _this.pokemonsMax; _this.pokemonId++) {
            await _this.getPokemon(_this.pokemonId);
        }

        Utils.generatePokemons(CONFIG.pokemonsArray, _this.pokemonsContainer);
        _this.getPokemonTypesArray();
        _this.generatePokemonTypesButtons();
        _this.initFilter();
        Utils.hide(_this.loadingContainer);
        
    },
    getPokemonTypesArray: function () {
        var _this = this;
        CONFIG.pokemonsArray.forEach(function (element) {
            _this.type = element.types[0].type.name;
            if (!_this.pokemonTypes.includes(_this.type)) {
                _this.pokemonTypes.push(_this.type);
            }
        });
    },
    generatePokemonTypesButtons: function () {
        var _this = this;
        const typeAllButton = document.createElement('button');
        const typeAllButtonText = document.createTextNode('All');
        typeAllButton.classList.add('filter__button', `all`);
        typeAllButton.appendChild(typeAllButtonText);

        _this.pokemonTypes.forEach(function (element) {
            const button = document.createElement('button');
            const buttonText = document.createTextNode(element);
            button.classList.add('filter__button', `${element}`);
            button.appendChild(buttonText);
            _this.buttonsContainer.appendChild(button);
        });
        _this.buttonsContainer.appendChild(typeAllButton);

    },
    initFilter: function () {
        let filter = new Filter();
        filter.init();
    }
      
};

let Pokemons = function () {
    PokemonsAbstract.call(this);
};

Pokemons.prototype = Object.create(PokemonsAbstract.prototype);
Pokemons.prototype.constructor = PokemonsAbstract;
