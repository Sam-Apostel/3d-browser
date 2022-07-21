import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<a
				href="https://github.com/Sam-Apostel"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>By <b>Sam Apostel</b></span>
			</a>
		</footer>
	);
};

export default Footer;
