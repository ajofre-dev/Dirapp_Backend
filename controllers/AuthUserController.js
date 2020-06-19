const { UserService } = require('../services');
const { comparePasswords, createToken } = require('../utils');

module.exports = {
  registeruser: async (req, res) => {
    try {
      const user = await UserService.create(req.body);
      user.password = undefined;
      res.status(201).json(user);
      console.log(user);
    } catch (error) {
      res.status(400).json({ message: 'No se puede desde aqui' });
    }
  },
  loginuser: (req, res) => {
    const { email, password } = req.body;
    let globalUser;
    // 1) Comprobar que el correo existe
    UserService.findOneByEmail(email)
      .then((user) => {
        globalUser = user;
        if (!user) res.status(404).json({ message: 'Credentials Error' });
        return comparePasswords(password, user.password);
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
