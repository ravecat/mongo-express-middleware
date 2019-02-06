import { mongoMiddleware } from '../src';
import { Elements } from './model';

export default () => mongoMiddleware({
  model: Elements
});
