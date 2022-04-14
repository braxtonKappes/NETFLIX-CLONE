'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel_Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  };
  Channel_Movie.init({
    movieId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channel_Movie',
  });
  return Channel_Movie;
};
