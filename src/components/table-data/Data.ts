import faker from 'faker'

const Data = Array.from({ length: 50 }, () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.random.number(60),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber(),
}))

export default Data
