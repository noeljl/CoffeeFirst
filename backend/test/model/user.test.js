// Orientierungsfile
//  npm install --save-dev mocha chai sinon
// npm install --save-dev esm
// "test": "mocha --require esm" in packake.json

import { expect } from 'chai'
import UserModel from '../../models/user.js'

describe('UserModel Lifecycle', function () {
  let userModelInstance
  let createdUser

  const data = {
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    mail: 'test@example.com',
    username: 'testusername',
    password: 'testpassword',
  }

  before(function () {
    userModelInstance = new UserModel()
  })

  it('should create a user', async function () {
    createdUser = await userModelInstance.create(data)
    expect(createdUser).to.include({
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail: 'test@example.com',
      username: 'testusername',
      password: 'testpassword',
    })
    expect(createdUser).to.have.property('id')
  })

  it('should find a user by mail', async function () {
    const foundUser = await userModelInstance.findOneByMail(data.mail)
    expect(foundUser).to.include({
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail: 'test@example.com',
      username: 'testusername',
      password: 'testpassword',
    })
    expect(foundUser).to.have.property('id')
  })

  it('should update a user', async function () {
    const updatedData = {
      ...data,
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      password: 'updatedpassword',
    }
    const updatedUser = await userModelInstance.update(updatedData)
    expect(updatedUser).to.include({
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      mail: 'test@example.com',
      username: 'testusername',
      password: 'updatedpassword',
    })
    expect(updatedUser).to.have.property('id')
  })

  it('should delete a user by username', async function () {
    const deletedUser = await userModelInstance.deleteOneByUsername(
      data.username
    )
    expect(deletedUser).to.include({
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      mail: 'test@example.com',
      username: 'testusername',
      password: 'updatedpassword',
    })
    expect(deletedUser).to.have.property('id')

    const nonExistentUser = await userModelInstance.findOneByMail(data.mail)
    expect(nonExistentUser).to.be.null
  })
})
