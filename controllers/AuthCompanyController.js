const { CompanyService } = require('../services');
const { comparePasswords, createToken } = require('../utils');

module.exports = {
  register: async (req, res) => {
    try {
      const newcompany = await CompanyService.create(req.body);
      // eslint-disable-next-line no-param-reassign
      newcompany.password = undefined;
      res.status(201).json(newcompany);
    /* // eslint-disable-next-line no-console
      console.log(newcompany); */
    } catch (error) {
      res.status(400).json({ message: 'Aqui esta el error', error });
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    let globalUser;
    // 1) Comprobar que el correo existe
    CompanyService.findOneByEmail(email)
      .then((company) => {
        globalUser = company;
        if (!company) res.status(404).json({ message: 'Credentials Error' });
        return comparePasswords(password, company.password);
      })
    // 2) Comparamos la contraseña que llega con la contraseña que ya tenemos almacenada
      .then((isValidPassword) => {
        if (!isValidPassword) res.status(404).json({ message: 'Credentials Error' });
        const token = createToken(globalUser);
        if (!token) res.status(400).json({ message: 'Error creating token' });
        res.status(200).json({ message: 'Successful Login', token });
      })
    // 3) Crear token con las credenciales del usuario
    // 4) Enviar token al cliente
      .catch((err) => res.status(400).json(err));
  },
};
