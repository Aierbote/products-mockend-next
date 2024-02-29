import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { title } from "process";
import {
	ReactNode,
	createContext,
	use,
	useContext,
	useEffect,
	useState,
} from "react";

type TContext = {
	products: Array<Product> | null;
	setProducts: (products: Product[]) => void;
};

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
const inter = Inter({ subsets: ["latin"] });

const AppContext = createContext({
	products: null,
	setProducts: (products: Product[]) => {},
});

interface ContextProps {
	children: ReactNode;
}

const ContextProvider = ({ children }: ContextProps) => {
	const [products, setProducts] = useState<TContext["products"]>(null);

	async function fetchProducts() {
		try {
			const result = await fetch(
				"https://mockend.up.railway.app/api/products/"
			);
			const data = await result.json();
			// TODO : NOTE :
			const array: Product[] = use(data);
			setProducts(array);
			return data;
		} catch (error) {
			console.error("Error fetching products", error);
		}
	}

	useEffect(() => {
		fetchProducts();
	});

	return (
		<AppContext.Provider value={{ products, setProducts }}>
			{children}
		</AppContext.Provider>
	);
};

function MyComponent() {
	const { products } = useContext(AppContext);

	return (
		<>
			{products?.map((product: Product) => (
				<div key={product.id}>
					<h2>{product.title}</h2>
					<p>{product.description}</p>
					<p>{product.price}</p>
					<img src={product.image} alt={product.title} />
				</div>
			))}
		</>
	);
}

export default function Home() {
	return (
		<>
			<ContextProvider>
				<h1>Lets see Products</h1>
				<MyComponent />
			</ContextProvider>
		</>
	);
}
