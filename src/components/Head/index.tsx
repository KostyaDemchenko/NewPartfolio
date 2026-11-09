import Head from "next/head";
import { SITE_URL } from "@/src/data/contacts";

interface HeadProps {
  pageTitle: string;
  pageDescription: string;
  /** Path of the page, e.g. "/projects"; used for canonical and og:url. */
  path?: string;
  pageImage?: string;
}

const HeadComponent: React.FC<HeadProps> = ({
  pageTitle,
  pageDescription,
  path = "/",
  pageImage = "/img/page_image_prev.jpg",
}) => {
  const title = `${pageTitle} | Kostiantyn Demchenko, Front-End Developer`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const image = pageImage.startsWith("http") ? pageImage : `${SITE_URL}${pageImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={pageDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#01080e' />
      <link rel='canonical' href={url} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={image} />

      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default HeadComponent;
