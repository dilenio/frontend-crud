import axios from 'axios';

const URL_API =
  'https://crudcrud.com/api/a47b7026695e4620aa13511b1a2c9aa9/abmstock';

export const apiCreate = async (data) => {
  await axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: URL_API,
    data,
  });
};

export const apiGetList = async () => {
  return await axios({
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    url: URL_API,
  }).then((response) => {
    console.log(response);
    return response;
  });
};

export const apiGetById = async (id) => {
  return await axios({
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}/${id}`,
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const apiUpdate = async (data) => {
  await axios({
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}/${data.id}`,
    data,
  });
};

export const apiDelete = async (id) => {
  await axios({
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    url: `${URL_API}/${id}`,
  });
};

export default apiGetList;
