const dotenv = require('dotenv');
const { Employees, Users, Suppliers, Supplies } = require('./models');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const db = require('./models');
const port = process.env.PORT || 3000;

db.sequelize
  .sync({ force: true })
  .then(async () => {
    await Employees.create({
      firstName: 'Ajdin',
      lastName: 'Bukvic',
      phoneNumber: '123-456-789',
      address: 'Bez adrese',
      email: 'ajdin@gmail.com',
      employmentDate: '2022-05-07',
    });
    //korisnik ce imati primarni kljuc 1, jer ce sigurno na pokretanju prije njega biti kreiran prethodni zaposlenik
    await Users.create({
      employeeId: 1,
      username: 'admin',
      password: 'admin123', //lozinka se automatski hesira prilikom spremanja u bazu
      role: 'admin',
    });

    await Suppliers.create({
      name: 'Dobavljac 1',
      uid: 'ASD-678',
      vat: '999',
      phoneNumber: '987-654-321',
      contactPerson: 'Neki Lik',
      email: 'dobavljac@gmail.com',
      startDate: '2022-04-03',
    });

    await Supplies.create({
      name: 'Sirovina 1',
      quantity: 750.35,
      minQuantity: 240.5,
      price: 80.9,
      unitMeasure: 'kg',
      supplierId: 1, //sirovina ce imati strani kljuc za dobavljaca 1, jer ce na pokretanju prije nje biti kreiran prethodni dobavljac
    });

    console.log('DB connected successfully...');
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
