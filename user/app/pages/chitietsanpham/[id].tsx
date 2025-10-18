import { GetServerSideProps } from "next";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type SanPham = {
  id: number;
  ten: string;
  gia_goc: number;
  mo_ta: string;
  hinh: string;
  luot_xem: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`http://localhost:3000/api/san-pham?id=${id}`);
  const sanPham = await res.json();

  const relRes = await fetch(`http://localhost:3000/api/san-pham`);
  const sanPhamLienQuan = await relRes.json();

  return { props: { sanPham, sanPhamLienQuan } };
};

export default function ProductDetailPage({
  sanPham,
  sanPhamLienQuan,
}: {
  sanPham: SanPham;
  sanPhamLienQuan: SanPham[];
}) {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={5}>
            <Image src={`/hinh/${sanPham.hinh}`} fluid rounded />
          </Col>
          <Col md={7}>
            <h4>{sanPham.ten}</h4>
            <p>
              <span className="text-warning">⭐⭐⭐⭐⭐</span> ({sanPham.luot_xem} lượt xem)
            </p>
            <h3 className="text-danger">{sanPham.gia_goc.toLocaleString()} ₫</h3>
            <Button variant="danger" className="mt-2">
              Thêm vào giỏ hàng
            </Button>
            <p className="mt-3">{sanPham.mo_ta}</p>
          </Col>
        </Row>

        {/* Sản phẩm liên quan */}
        <div className="mt-5">
          <h5>Sản phẩm liên quan</h5>
          <Row>
            {sanPhamLienQuan.slice(0, 4).map((sp) => (
              <Col md={3} key={sp.id}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={`/hinh/${sp.hinh}`} />
                  <Card.Body>
                    <Card.Title>{sp.ten}</Card.Title>
                    <Card.Text className="text-danger">
                      {sp.gia_goc.toLocaleString()} ₫
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}
