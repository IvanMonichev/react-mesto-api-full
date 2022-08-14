function Footer() {
  const date = new Date();

    return (
        <footer className="footer">
            <p className="footer__text">© {date.getFullYear()} Ivan Monichev</p>
        </footer>
    );
}

export default Footer;