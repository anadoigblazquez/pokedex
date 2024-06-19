function FilterAbstract() {
    this.filterButton = document.querySelector('.filter-button');
    this.filterContainer = document.querySelector('.filter');
    this.filterContainerHeight = this.filterContainer.clientHeight + 15;
    this.pokemonsContainer = document.querySelector('.pokemons-container-js');
    this.type = '';
    this.buttonClicked = false;
    this.menuDown = false;
};

FilterAbstract.prototype = {
    init: function () {
        var _this = this;
        _this.listeners();
        _this.filterContainer.style.top = _this.formatContainerHeight();
    },
    listeners: function () {
        var _this = this;
        
        _this.filterButton.addEventListener('click', function (event) {
            _this.toggleFilterContainer();
            
        });

        document.querySelectorAll('.filter__button').forEach((button) => {
            button.addEventListener('click', event => {
                _this.filterByType(event.target.classList[1]);
            })
        })
        
    },
    toggleFilterContainer: function () {
        var _this = this;
        if(!_this.menuDown) {
            _this.filterContainer.style.top = '0';
            _this.menuDown = true;
        } else {
            _this.filterContainer.style.top = _this.formatContainerHeight();
            _this.menuDown = false;
        }
    },
    formatContainerHeight: function () {
        var _this = this;
        return '-' + _this.filterContainerHeight + 'px';
    },
    filterByType: function (type) {
        var _this = this;
        if (type === "all") {
            return Utils.generatePokemons(CONFIG.pokemonsArray, _this.pokemonsContainer);
        }

        const filteredByType = CONFIG.pokemonsArray.filter((pokemon) => {
            let matchFirstType = false;
            let matchSecondType = false;

            if (pokemon.types[1]) {
                matchSecondType = pokemon.types[1].type.name === type;
            }

            if (pokemon.types[0]) {
                matchFirstType = pokemon.types[0].type.name === type;
            }
            return matchFirstType || matchSecondType;
        });
        Utils.generatePokemons(filteredByType, _this.pokemonsContainer);
    }
};

let Filter = function () {
    FilterAbstract.call(this);
};

Filter.prototype = Object.create(FilterAbstract.prototype);
Filter.prototype.constructor = FilterAbstract;