import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import FooterEnd from "../../../components/Footer/FooterEnd"
import FooterCR from "../../../components/Footer/FooterCR";
import Footer1 from "../../../components/Footer/Footer1";
import "./Home.css";

function Home() {
  // Inline styles for the Home component
  const styles = {
    container: {
      fontSize: "20px",
      color: "white",
    },
    aboutSection: {
      backgroundColor: "#212121",
      padding: "20px",
    },
    heading: {
      textAlign: "center",
      fontWeight: "bold",
      fontFamily: "JetBrains Mono",
      fontSize: "60px",
    },
    text: {
      maxWidth: "1200px",
      lineHeight: "1.3",
      fontFamily: "JetBrains Mono",
      fontSize: "20px",
    },
    smallText: {
      maxWidth: "1200px",
      lineHeight: "1.3",
      fontFamily: "JetBrains Mono",
      fontSize: "20px",
    },
    imgContainer: {
      display: "grid",
      justifyContent: "center",
      margin: "0",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
    imageWrapper: {
      textAlign: "center",
      margin: "10px",
    },
    image: {
      maxWidth: "265px",
      height: "auto",
    },
    imageDescription: {
      maxWidth: "300px",
      textAlign: "center",
      fontFamily: "JetBrains Mono",
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      <div id="about" className="grid-container" style={styles.aboutSection}>
        <h2 style={styles.heading}>Đặc điểm chung</h2>
        <section style={styles.imgContainer}>
          <p style={styles.text}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Những dịch vụ chăm sóc bảo dưỡng hồ cá
            Koi tại Koiday gồm những gì?
            <br />
            Dịch vụ chăm sóc, kiểm tra hồ cá:
            <br />+ Kiểm tra, tư vấn và xử lý tình trạng nước hồ, cung cấp các
            bộ test, chế phẩm vi sinh giúp kiểm tra và duy trì hệ thống vi sinh
            của hồ. <br />
            + Kiểm tra hoạt động và bảo dưỡng các thiết bị trong hồ cá <br />
            + Hướng dẫn khách hàng những yêu cầu cơ bản để chăm sóc hồ cá và sử
            dụng các thiết bị trong hồ <br />
            - Dịch vụ chăm sóc, chữa bệnh cho cá Koi: <br />
            + Cung cấp thức ăn chuẩn cho cá Koi theo mục đích nuôi, từng giai
            đoạn phát triển và theo yêu cầu của khách hàng <br />
            + Kiểm tra, phát hiện, chuẩn đoán và điều trị các bệnh thường gặp ở
            cá Koi <br />+ Tư vấn kỹ thuật chăm sóc cá giúp quý khách hàng an
            tâm hơn trong quá trình nuôi dưỡng
          </p>
        </section>
        <br />
        <section style={styles.imgContainer}>
          <p style={styles.smallText}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chăm sóc hồ cá Koi là rất quan trọng
            vì những lý do sau: <br />
            1. Sức khỏe của cá Koi: Cá Koi cần môi trường nước sạch và giàu oxy
            để phát triển khỏe mạnh. Chăm sóc hồ giúp duy trì chất lượng nước,
            ngăn ngừa bệnh tật và giúp cá sống lâu. <br />
            2. Ngăn ngừa ô nhiễm: Nếu không chăm sóc định kỳ, chất thải của cá,
            thức ăn thừa, và tảo có thể tích tụ, gây ô nhiễm nước, làm giảm chất
            lượng sống của cá. <br />
            3. Cân bằng hệ sinh thái: Một hồ cá được chăm sóc tốt sẽ duy trì hệ
            sinh thái cân bằng, bao gồm cây thủy sinh, vi sinh vật có lợi và cá
            Koi. <br />
            4. Thẩm mỹ và thư giãn: Hồ cá Koi thường được coi là yếu tố trang
            trí quan trọng trong không gian sân vườn. Chăm sóc hồ giúp giữ cho
            nó luôn đẹp, mang lại cảm giác thư giãn và hài hòa. <br />
            5. Giá trị kinh tế: Cá Koi là loài cá cảnh có giá trị kinh tế cao.
            Việc chăm sóc tốt không chỉ giúp cá khỏe mạnh mà còn làm tăng giá
            trị của chúng khi bán hoặc trao đổi.
          </p>
        </section>
        <h2 id="blog" style={styles.heading}>
          Những hình ảnh nổi bật
        </h2>
        <div className="d-flex grid-container">
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/img1.png" alt="Fish 1" />
            <p style={styles.imageDescription}>
              Cá bơi ở hồ Thiên Phong Trì của anh Đỗ Xuân Hiệp tại Quảng Ninh
            </p>
          </div>
          <div style={styles.imageWrapper}>
            <p style={styles.imageDescription}>
              "Cá Koi không chỉ là biểu tượng của cái đẹp, mà còn là sứ giả của
              lòng kiên định và khát vọng vươn lên giữa chừng thử thách của cuộc
              đời" theo lời của anh Nam chia sẻ
            </p>
            <img style={styles.image} src="/img2.png" alt="Fish 2" />
          </div>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src="/img3.png" alt="Fish 3" />
            <p style={styles.imageDescription}>
              Khách hàng thân thiết và đã hỗ trợ cho anh Thành trong 2 năm
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {/* <FooterEnd /> */}
    </div>
  );
}

export default Home;
