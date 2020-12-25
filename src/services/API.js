import axios from 'axios';

const URL_API =
  'https://crudcrud.com/api/32dd51cce83b4f8b8c4a25e08a563db2/abmstock';

export const apiCreate = async (data) => {
  await axios({
    method: 'post',
    url: URL_API,
    data,
  });
};

export default apiCreate;
