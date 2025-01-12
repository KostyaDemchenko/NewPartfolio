import Head from "next/head";

interface HeadProps {
  pageTitle: string;
  pageDescription: string;
  pageImage?: string;
  pageUrl?: string;
}

const HeadComponent: React.FC<HeadProps> = ({
  pageTitle,
  pageDescription,
  pageImage = "/img/page_image_prev.jpg",
  pageUrl = process.env.PORTFOLIO_URL,
}) => {
  return (
    <Head>
      {/* Basic meta tags */}
      <title>Kostiantyn Demchenko / {pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <link rel='canonical' href={pageUrl} />

      {/* Fonts (example: Fira Code, or Montserrat, etc.) */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap'
        rel='stylesheet'
      />

      {/* Open Graph meta tags */}
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:type' content='website' />

      {/* Twitter Cards meta tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={pageImage} />

      {/* Favicon */}
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HeadComponent;
