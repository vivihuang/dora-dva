import faker from 'faker'

const data = []
const dataLength = 10

let i = dataLength - 1
for (i; i >= 0; i -= 1) {
  data.push({
    id: dataLength - i,
    name: faker.name.findName(),
    website: faker.internet.url(),
    email: faker.internet.email()
  })
}

export default data
