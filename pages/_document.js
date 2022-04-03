import { Html, Head, Main, NextScript } from 'next/document';

export default function Document () {
	return (
		<Html>
			<Head>
				<script src="http://localhost:8097"></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
