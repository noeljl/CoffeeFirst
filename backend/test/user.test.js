// Orientierungsfile
//  npm install --save-dev mocha chai sinon
// npm install --save-dev esm
// "test": "mocha --require esm" in packake.json

import { expect } from 'chai'
import sinon from 'sinon'
import UserModel from '../models/user.js'

describe('UserModel', function () {
  let userModelInstance

  beforeEach(function () {
    userModelInstance = new UserModel()
  })

  afterEach(function () {
    sinon.restore()
  })

  it('should create a user', async function () {
    const data = {
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail: 'test@example.com',
      username: 'testusername',
      password: 'testpassword',
    }

    // Stub create method
    const createStub = sinon.stub(userModelInstance, 'create').resolves({
      ...data,
      id: 1631,
    })

    const user = await userModelInstance.create(data)
    expect(user).to.deep.equal({
      ...data,
      id: 1631,
    })
    expect(createStub.calledOnce).to.be.true
  })

  it('should update a user', async function () {
    const data = {
      firstName: 'updatedFirstName',
      lastName: 'updatedLastName',
      mail: 'updated@example.com',
      username: 'testusername',
      password: 'updatedpassword',
    }

    // Stub update method
    const updateStub = sinon.stub(userModelInstance, 'update').resolves({
      ...data,
      id: 1631,
    })

    const user = await userModelInstance.update(data)
    expect(user).to.deep.equal({
      ...data,
      id: 1631,
    })
    expect(updateStub.calledOnce).to.be.true
  })

  it('should find a user by email', async function () {
    const mail = 'test@example.com'

    // Stub findOneByEmail method
    const findStub = sinon.stub(userModelInstance, 'findOneByEmail').resolves({
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail,
      username: 'testusername',
      password: 'testpassword',
      id: 1631,
    })

    const user = await userModelInstance.findOneByEmail(mail)
    expect(user).to.deep.equal({
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail,
      username: 'testusername',
      password: 'testpassword',
      id: 1631,
    })
    expect(findStub.calledOnce).to.be.true
  })

  it('should delete a user by username', async function () {
    const username = 'testusername'

    // Stub deleteOneByUsername method
    const deleteStub = sinon
      .stub(userModelInstance, 'deleteOneByUsername')
      .resolves({
        firstName: 'TestFirstName',
        lastName: 'TestLastName',
        mail: 'test@example.com',
        username,
        password: 'testpassword',
        id: 1631,
      })

    const user = await userModelInstance.deleteOneByUsername(username)
    expect(user).to.deep.equal({
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      mail: 'test@example.com',
      username,
      password: 'testpassword',
      id: 1631,
    })
    expect(deleteStub.calledOnce).to.be.true
  })
})
