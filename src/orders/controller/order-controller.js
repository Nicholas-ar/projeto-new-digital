class OrderController {
  constructor(repository) {
    this.repository = repository;
  }

  async handleRetrival(httpRequest) {
    const orders = await this.repository.retriveByCpf(httpRequest.cpf);
    if (!orders) {
      return {
        statusCode: 400,
        body: {
          message: 'Invalid param : cpf'
        },
      };
    }
    return {
      body: orders,
      statusCode: 200,
    };
  }
}

export default OrderController;
