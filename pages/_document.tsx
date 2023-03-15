import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://khoiphucanh.com/" />
          <meta property="og:site_name" content="khoiphucanh.com" />
          <meta
            property="og:description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta
            property="og:title"
            content="Khôi phục ảnh cũ chất lượng cao - khoiphucanh.com"
          />

          <meta
            property="og:image"
            content="https://khoiphucanh.com/og-image.png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
          <title>Khôi phục ảnh cũ chất lượng cao - khoiphucanh.com</title>
          <meta
            name="title"
            content="Khôi phục ảnh cũ chất lượng cao - khoiphucanh.com"
          />
          <meta
            name="description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://khoiphucanh.com/" />
          <meta
            name="twitter:title"
            content="Khôi phục ảnh cũ chất lượng cao - khoiphucanh.com"
          />
          <meta
            name="twitter:description"
            content="Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn ngay hôm nay."
          />
          <meta
            property="twitter:image"
            content="https://khoiphucanh.com/og-image.png"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta name="theme-color" content="#6A3DE8" />
          <meta name="robots" content="all" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
