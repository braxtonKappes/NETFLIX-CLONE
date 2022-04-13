'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movie.init({
    channelId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    releaseDate: DataTypes.INTEGER,
    casting: DataTypes.STRING,
    director: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};