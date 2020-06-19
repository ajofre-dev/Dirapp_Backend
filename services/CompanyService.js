/* eslint-disable no-underscore-dangle */
const { Companys } = require('../models');

module.exports = {
  create: (body) => {
    const newCompany = new Companys(body);
    return newCompany.save();
  },
  findOneByName: (name) => Companys.find({ name }),
  findAll: () => Companys.find({ is_active: true }),
  findOneByEmail: (email) => Companys.findOne({ email }),
  findOneEmployee: (company) => {
    const findemployee = company.employee.id();
    return findemployee;
  },
  removeOneEmployee: (company, idEmployee) => {
    // eslint-disable-next-line no-underscore-dangle
    const filteredEmployee = company.filter((employee) => !employee._id === idEmployee);
    // eslint-disable-next-line no-param-reassign
    Companys.employee = filteredEmployee;
    return company.save();
  },
  // eslint-disable-next-line consistent-return
  updateEmployee: (company, updatedEmployee) => {
    // user.foundPost.find((post) => post._id === updatedPost._id);
    // La forma de arriba y la de abajo devuelven lo mismo
    const foundEmployee = Companys.employee.id(updatedEmployee._id);
    if (!foundEmployee) return undefined;
    const updatedEmployees = company.employee.map((employee) => {
      if (employee._id === foundEmployee._id) return foundEmployee;
      return employee;
    });
    // eslint-disable-next-line no-param-reassign
    company.employee = updatedEmployees;
    return company.save();
  },
};
