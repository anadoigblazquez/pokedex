const Utils = {
    generatePokemons: function (pokemons, container) {
        var _this = this;
        container.innerHTML = "";
        pokemons.forEach(element => {
            let card = document.createElement('div');
            let typeClass= element.types[0].type.name;
            card.setAttribute('class', `card card--${typeClass}`);
            let pokemonNumber = _this.formatPokemonId(element.id);
        
            let cardHTML = `
                <p class="card__pokemon-number">${pokemonNumber}</p>
                <img class="card__img" src=${element.sprites.front_default} alt="${element.name}">
                <div class="info">
                    <p class="info__title">${element.name}</p>
                    <ul class="info__pokemon-type">${_this.generatePokemonTypes(element.types)}</ul>
                    <button class="info__more-info">More info</button>
                </div>`;
            card.innerHTML = cardHTML;
            container.appendChild(card);
        });
    },
    generatePokemonTypes: function (array) {
        if( array.length == 1) {
            return `<li>
                <img src="./img/${array[0].type.name}.png" title="${array[0].type.name}">
            </li>`
        } 
        // Buscar la manera de modificar el código para que dé lo mismo la cantidad de tipos que vengan y evitar que no funcione bien si un día un pokemon puede tener más de 2 tipos
        if (array.length > 1) {
            return `<li>
                        <img src="./img/${array[0].type.name}.png" title="${array[0].type.name}">
                    </li>
                    <li>
                        <img src="./img/${array[1].type.name}.png" title="${array[1].type.name}">
                    </li>`
        }
    },
    formatPokemonId: function (id) {
        let idToString = id.toString();
        let idLength = idToString.length;
        let zero = 0;
        let zeroToString = zero.toString();
        let zeros = 3 - parseInt(idLength, 10);
        let result = zeroToString.repeat(zeros);
        return `#${result}${id} `;
    },
    hide: function (element) {
        var _this = this;
        const fadeEffect = setInterval(function () {
            if (!element.style.opacity) {
                element.style.opacity = 1;
            }
            if (element.style.opacity > 0) {
                element.style.opacity -= 0.3;
                
            } else {
                clearInterval(fadeEffect);
                element.style.display = 'none';
            }
        }, 80);
    }
    
}