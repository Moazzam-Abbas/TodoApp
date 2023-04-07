import QueryBus from './QueryBus.js'
import { container } from '../http/DI/container.js';

function createQueryBus() {
  const queryBus = new QueryBus();
  queryBus.registerHandler('FetchUsersQuery', container.resolve('fetchUsersQueryHandler'));
  queryBus.registerHandler('FetchTodosQuery', container.resolve('fetchTodosQueryHandler'));

  return queryBus;
}

export {createQueryBus}
