import { ProductRepository } from '../../../application/database/mongodb';
import { AWSPresignedAdapter } from '../../../application/services/adapters/aws/aws-adapter';
import { ProductController } from '../index';

/**
 * Factory for the ProductController.
 * Instantiates all required dependencies and injects it into the ProductController object.
 * @returns {ProductController} - ProductController Object
 */
export const makeProductController = () => {
  const imageService = new AWSPresignedAdapter();
  const repository = new ProductRepository();

  return new ProductController(repository, imageService);
};
