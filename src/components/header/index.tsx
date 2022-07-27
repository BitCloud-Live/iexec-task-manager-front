import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import Link from 'next/link';

export function Header() {
  return (
    <Navbar className={styles.NavBarRoot}  bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className={styles.navBarBrand} href="/">{process.env.siteName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className={`me-auto ${styles.navLinkContainer}`}>
            <Link href="/">
              <a>Explore <b>dApps</b></a>
            </Link>
            <Link href="/createorder/">
             <a>Create <b>Order</b></a>
            </Link>
            <Link href="/">
              <a> About Us</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

