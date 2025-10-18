import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">LOGO</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} href="/products">Sản phẩm</Nav.Link>
            <Nav.Link as={Link} href="/about">Giới thiệu</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/cart">🛒 Giỏ hàng</Nav.Link>
            <Nav.Link href="#">Nguyễn Bích Ngọc</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
