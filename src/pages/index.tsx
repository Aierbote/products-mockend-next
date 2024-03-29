import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Product {
	qty: number;
	userId: number;
	title: string;
	description: string;
	id: number;
	price: number;
	image: string;
	thumbnail: string;
}

export async function getStaticProps() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/products/`
		);
		const data = await response.json();

		return { props: { products: data } };
	} catch (error) {
		console.error("Error fetching products", error);

		return { props: { products: [] } };
	}
}

export default function Home({ products }: { products: Product[] }) {
	return (
		<>
			<h1>Lets see Products</h1>
			<ul>
				{products?.map((product) => (
					<li key={product.id}>
						<div>
							<h2>{product.title}</h2>
							<p>{product.description}</p>
							<p>Price: {product.price.toFixed(2)}€</p>
							<br />
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
