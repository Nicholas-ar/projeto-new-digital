/**
 * @abstract
 * @name UsersRepository
 * @method create
 * @method retrieveByEmail
 * @method updateAccessToken
 */
export class UsersRepository {
  constructor() {
    throw Error('Not implemmented');
  }
  async create(userData) {
    throw Error('Not implemmented');
  }

  async retrieveByEmail(email) {
    throw Error('Not implemmented');
  }

  async updateAccessToken(id, token) {
    throw Error('Not implemmented');
  }
}

/**
 * @abstract
 * @name OrdersRepository
 * @method list
 * @method create
 * @method retrieveByCpf
 * @method update
 * @method delete
 */
export class OrdersRepository {
  constructor() {
    throw Error('Not implemmented');
  }
  async list() {
    throw Error('Not implemmented');
  }
  async create() {
    throw Error('Not implemmented');
  }
  async retrieveByCpf() {
    throw Error('Not implemmented');
  }
  async update() {
    throw Error('Not implemmented');
  }
  async delete() {
    throw Error('Not implemmented');
  }
}
