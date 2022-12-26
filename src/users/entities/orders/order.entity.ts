import { User } from '../users.entity';
import { Product } from '../../../products/entities/products.entity';
export class Order {
  date: Date;
  user: User;
  product: Product[];
}
