import Head from "next/head";

import "./style.scss";

const HeadComponent = () => {
  return (
    <Head>
      <title>kostiantyn-demchenko</title>

      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap'
        rel='stylesheet'
      ></link>
    </Head>
  );
};

export default HeadComponent;
