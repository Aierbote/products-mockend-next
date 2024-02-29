import { NextApiRequest, NextApiResponse } from "next";

export default async function getProducts(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const fetchedData = await fetch(
			"https://products-mockend-node-production.up.railway.app/api/products"
		);
		const parsedData = await fetchedData.json();

		response.status(200).json(parsedData);
	} catch (error) {
		console.error("Error fetching products", error);

		response.status(500).json({ error: "Error fetching products" });
	}
}
