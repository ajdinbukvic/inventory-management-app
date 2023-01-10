const { Suppliers } = require('../models');
const factory = require('./factory');

exports.getAllSuppliers = factory.getAll(Suppliers);
exports.getSupplier = factory.getOne(Suppliers);
exports.createSupplier = factory.createOne(Suppliers);
exports.updateSupplier = factory.updateOne(Suppliers);
//exports.deleteSupplier = factory.deleteOne(Suppliers); //nema brisanja
