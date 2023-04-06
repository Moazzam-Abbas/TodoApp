import QueryBus from './QueryBus.js'
import { container } from '../http/DI/container.js';

function createQueryBus() {
  const queryBus = new QueryBus();
  queryBus.registerHandler('FetchUsersQuery', container.resolve('fetchUsersQueryHandler'));

  return queryBus;
}

export {createQueryBus}
