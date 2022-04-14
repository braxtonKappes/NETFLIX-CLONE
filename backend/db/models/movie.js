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
      Movie.belongsToMany(models.Channel, {
        through: "channel_movie",
        as: "channels",
        otherKey: "channelId",
        foreignKey: "movieId",
      });
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    releaseDate: DataTypes.INTEGER,
    casting: DataTypes.STRING,
    director: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
