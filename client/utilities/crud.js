const executeRequest = async (url, config = {}) => {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error('An error occured: ${response.status}');
  }
  return response.json && (await response.json());
};

export const getRequest = async url => {
  return await executeRequest(url);
};

export const postRequest = async (url, body) => {
  return await executeRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
