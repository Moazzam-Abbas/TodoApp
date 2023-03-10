import crypto from 'crypto'
import { v1 as uuidv1 } from 'uuid';
import ITodoAppUserService from './Domain/Abstractions/ITodoAppUserService.js';
console.log(typeof uuidv1());

 const totalPostsCount = (User) => { 
    console.log(User);
};

const obj = new ITodoAppUserService();

obj.findAllUser()

totalPostsCount('hello');



