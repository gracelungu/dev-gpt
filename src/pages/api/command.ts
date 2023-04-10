import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { Headers } from 'node-fetch';

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  // Replace this URL with the target URL you want to proxy requests to
  const targetURL = 'https://wblo235iab.execute-api.eu-north-1.amazonaws.com/prod/command';

  // Create a new Headers instance and populate it with the incoming headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, String(value));
  }

  try {
    // Forward the request to the target URL including the path
    const response = await fetch(targetURL + req.url, {
      method: req.method,
      headers,
      body: req.body,
    });

    // Copy the response headers from the target URL
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    // Forward the response from the target URL back to the client
    res.status(response.status).send(await response.text());
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(500).send('Error in proxy');
  }
};

export default proxy;
