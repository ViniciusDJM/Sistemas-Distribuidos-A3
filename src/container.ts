import { container } from 'tsyringe';

// Repositories
import { UserRepository } from './repositories/user.repository';
import { ProductRepository } from './repositories/product.repository';

// Services
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';

// Register repositories
container.register('UserRepository', {
  useClass: UserRepository,
});

container.register('ProductRepository', {
  useClass: ProductRepository,
});

// Register services
container.register('UserService', {
  useClass: UserService,
});

container.register('ProductService', {
  useClass: ProductService,
});
