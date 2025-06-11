"use client";

import Script from "next/script";

export const dynamic = "force-dynamic";

export default () => {
  return (
    <>
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=663cc5b081e30522b7cd88ac"
        type="text/javascript"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/js/webflow.40f3fea11.js"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  );
};
