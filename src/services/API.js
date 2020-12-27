import axios from 'axios';

const URL_API = 'https://crudcrud.com/api/a47b7026695e4620aa13511b1a2c9aa9';
const ENDPOINT = '/abmstock';

export const apiGetList = async () => {
  return await axios({
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}${ENDPOINT}`,
  }).then((response) => {
    return response;
  });
};

export const apiCreate = async (data) => {
  await axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}${ENDPOINT}`,
    data,
  });
};

export const apiGetById = async (id) => {
  return await axios({
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}${ENDPOINT}/${id}`,
  }).then((response) => {
    return response.data;
  });
};

export const apiUpdate = async (data) => {
  await axios({
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}${ENDPOINT}/${data.id}`,
    data,
  });
};

export const apiDelete = async (id) => {
  await axios({
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}${ENDPOINT}/${id}`,
  });
};

export default apiGetList;
