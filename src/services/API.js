import axios from 'axios';

const URL_API =
  'https://crudcrud.com/api/32be3cf8acef420988ec219dad3f3e86/abmstock';

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

export default apiGetList;
