$(pokemon).focus()
$("#precedent").hide();
$("#suivant").hide();
let pokemonId;
let pokemonRecherche;

document.querySelector('#pokemon').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        pokemonRecherche = $('#pokemon').val();
        pokemonRecherche = pokemonRecherche.toLowerCase().trim();
        afficher(pokemonRecherche);
    }
});

function afficher(id) {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + id,
        success: function (result) {
            let imageSrc = result.sprites.front_default;
            let pokemonNom = result.name;
            pokemonId = result.id;
            let pokemonPoids = result.weight;
            let monUl = $("#typePokemon");
            $("#precedent").show();
            $("#suivant").show();

            $("#my_image").attr("src", imageSrc);

            $('#nomPokemon').text("Nom : " + pokemonNom)
            $('#idPokemon').text("ID : " + pokemonId)
            $('#poidsPokemon').text("Poids : " + pokemonPoids)

            monUl.empty()

            for (const index in result.types) {
                let pokemonType = result.types[index].type.name;
                let compteur = index;
                compteur++
                monUl.append("<p>" + " type  " + compteur + " : " + pokemonType + "</p>")
            }


        }, error: function (result) {
            alert("Le pokemon n'existe pas")
        }
    });
}

function precedent() {
    if (pokemonId > 1) {
        pokemonId--;
        afficher(pokemonId);
    }

}

function suivant() {
    if (pokemonId < 898) {
        pokemonId++;
        afficher(pokemonId);
    }

}
