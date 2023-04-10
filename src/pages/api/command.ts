import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { Headers } from 'node-fetch';

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  // Replace this URL with the target URL you want to proxy requests to
  const targetURL = 'https://wblo235iab.execute-api.eu-north-1.amazonaws.com/prod/command';

  try {
    // Forward the request to the target URL including the path
    const response = await fetch(targetURL, {
      method: req.method,
      body: req.body,
    });

    console.log(response.body);

    // Forward the response from the target URL back to the client
    res.status(response.status).send(response.body);
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(500).send('Error in proxy');
  }
};

export default proxy;
