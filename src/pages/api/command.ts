import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  // Replace this URL with the target URL you want to proxy requests to
  const targetURL =
    "https://wblo235iab.execute-api.eu-north-1.amazonaws.com/prod/command";

  try {
    // Forward the request to the target URL including the path
    const response = await axios.post(targetURL, req.body);

    console.log(response.data);

    return res.json(response.data);

    // Forward the response from the target URL back to the client
    // res.status(response.status).send(await response.text());
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).send("Error in proxy");
  }
};

export default proxy;
