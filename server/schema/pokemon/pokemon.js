'use strict';

const graphql = require('graphql');
const client = require('./pokemon.client');
const get = require('lodash.get');

const pokemonType = new graphql.GraphQLObjectType({
  name : 'PokemonType',
  fields : {
    id : {
      type : graphql.GraphQLString
    },
    name : {
      type : graphql.GraphQLString
    },
    order : {
      type : graphql.GraphQLInt
    },
    orderFormatted : {
      type : graphql.GraphQLString,
      resolve : (pokemon) => (get(pokemon, 'order') ? `# ${pokemon.order}` : '')
    },
    img : {
      type : graphql.GraphQLString,
      resolve : (pokemon) => pokemon.sprites.front_default
    }
  }
});

module.exports = {
  type : pokemonType,
  args : {
    id : {
      type : graphql.GraphQLInt
    }
  },
  resolve : (_, args) => {
    if (get(args, 'id')) {
      return client.getPokemon(args.id);
    }
    return client.getPokemons();
  }
};
