const { CompanyService } = require('../services');

module.exports = {
  create: async (req, res) => {
    /*      const userExists = UserService.findUserByEmail(req.body.email);
            if (userExists) res.status(400).json({message: 'User already exist'}) */
    try {
      const company = CompanyService.create(req.body);
      res.status(201).json({ message: 'Succeful create', company });
    } catch (error) {
      res.status(400).json({ message: 'No se pudo crear el nuevo registro' });
    }
  },
  findSelf: async (req, res) => {
    const { name } = req.body;
    // eslint-disable-next-line no-console
    console.log(name);
    try {
      const company = await CompanyService.findOneByName(name);
      res.status(200).json(company);
    } catch (error) {
      res.status(404).json({ message: 'Error company not found' });
    }
  },
  findAll: async (req, res) => {
    // console.log('◄◄', req.decoded.email);
    try {
      const company = await CompanyService.findAll(req.body);
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
