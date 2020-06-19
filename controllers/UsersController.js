/* eslint-disable no-console */
const { UserService, CompanyService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const createEmployee = UserService.create(req.body);
      createEmployee.password = undefined;
      res.status(201).json(createEmployee);
    } catch (error) {
      res.status(400).json({ message: 'Error to create user employee' });
    }
    /*      const userExists = UserService.findUserByEmail(req.body.email);
            if (userExists) res.status(400).json({message: 'User already exist'}) */
  },
  findOne: async (req, res) => {
    const { first_name } = req.body;
    try {
      const employee = await UserService.findOneByName(first_name);
      res.status(200).json(employee);
    } catch (error) {
      res.status(404).json({ message: 'Employee not found', error });
    }
  },
  findAll: async (req, res) => {
    try {
      const all = UserService.findAll();
      res.status(200).json(all);
    } catch (error) {
      res.status(400).json(error);
    }
    // eslint-disable-next-line spaced-comment
    //console.log('◄◄', req.decoded.email);
  },
};
