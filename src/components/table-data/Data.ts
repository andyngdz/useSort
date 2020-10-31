import faker from 'faker'

interface IData {
  id: string

  isActive: boolean

  firstName: string

  lastName: string

  age: number

  email: string

  address: string

  phoneNumber: string
}

const Data: IData[] = Array.from({ length: 50 }, () => ({
  id: faker.random.uuid(),
  isActive: faker.random.boolean(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.random.number({ min: 10, max: 60 }),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber(),
}))

export default Data
