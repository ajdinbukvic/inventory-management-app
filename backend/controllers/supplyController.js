const { Supplies } = require('../models');
const factory = require('./factory');

exports.getAllSupplies = factory.getAll(Supplies);
exports.getSupply = factory.getOne(Supplies);
exports.createSupply = factory.createOne(Supplies);
exports.updateSupply = factory.updateOne(Supplies);
exports.deleteSupply = factory.deleteOne(Supplies);
