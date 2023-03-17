import userRequestDTO from "../dto/userRequestDTO.js";

export const createUserRequestDTO = (jsonObj) => {
    const data = JSON.parse(jsonObj, (key, value) => {return key.toLowerCase(), value});
    console.log(JSON.stringify(data))
  return new userRequestDTO(data.username, data.password)
};