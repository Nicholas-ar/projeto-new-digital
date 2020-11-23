import { ProductRepository } from '../../../application/database/mongodb';
import { AWSPresignedAdapter } from '../../../application/services/adapters/aws-adapter';
import { ProductController } from '../product-controller';

/**
 * Factory for the ProductController.
 * Instantiates all required dependencies and injects it into the ProductController object.
 * @returns {ProductController} - ProductController Object
 */
export const makeProductController = () => {
  const imageUploaderService = new AWSPresignedAdapter()
  const repository = new ProductRepository();

  return new ProductController(repository, imageUploaderService);
};
