import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  id: number;
  amount: number;
  type: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { page } = req.query;
    const pageNumber = parseInt(page as string);

    const response = await axios.get(
      `https://ruwcrrmwj6.execute-api.us-east-1.amazonaws.com/transaction?page=${pageNumber}`
    );
    console.log("Conteúdo da resposta:", response.data);
    res
      .status(200)
      .json({ count: response.data.Count, itens: response.data.Items });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    res.status(500);
  }
}
