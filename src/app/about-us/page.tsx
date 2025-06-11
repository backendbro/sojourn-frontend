"use client";

import Footer from "@/components/ui/footer";
import { useEffect } from "react";

export default () => {
  const today = new Date();
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  useEffect(() => {
    const script = document.createElement("script");
    const script2 = document.createElement("script");
    script.src =
      "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=663cc5b081e30522b7cd88ac";
    script.crossOrigin = "anonymous";
    script.type = "text/javascript";
    script.integrity = "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=";

    script2.src =
      "https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/js/webflow.40f3fea11.js";
    script2.type = "text/javascript";

    // document.body.appendChild(script);
    document.body.appendChild(script);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script); // Clean up the script
      document.body.removeChild(script2); // Clean up the script
    };
  }, []);
  //living-room-about-us
  return (
    <>
      <div className="section-about-header">
        <div className="container-regular-about">
          <div
            data-w-id="e84562fd-889a-f76c-7152-850886839095"
            className="about-one w-layout-grid header-title-grid mt-[-80px] mb-[-50px]  sm:mb-[30px]"
          >
            <div
              id="w-node-e84562fd-889a-f76c-7152-850886839096-b7cd8927"
              className="header-content"
            >
              <h2 className="heading-about fade-in-and-out-header font-sans">
                Welcome to Sojourn
              </h2>
            </div>
            <div
              id="w-node-e84562fd-889a-f76c-7152-850886839099-b7cd8927"
              className="header-subheading-wrap"
            ></div>
            <h3 className="lower-about fade-in-and-out-caption font-sans">
              Redefining Your Travel Experience
            </h3>
          </div>
          <div
            data-w-id="e84562fd-889a-f76c-7152-85088683909a"
            className="header-bottom-wrap about-one"
          ></div>
        </div>
        <div className="container-regular">
          <div
            data-w-id="3575c869-5e9d-fe78-2156-4b6da71c7f8a"
            className="about-three about-cta1"
          >
            <div className="container-4">
              <div className="hero-wrapper">
                <div className="hero-split md:px-6 lg:px-4">
                  <h1 className="soj-subhead font-sans">
                    At Sojourn, we believe that travel should be more than just
                    a journey
                  </h1>
                  <p className="margin-bottom-24px font-sans">
                    It should be an unforgettable experience that leaves a
                    lasting impression.
                  </p>
                  <a
                    href={`/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`}
                    className="button-primary-big bg-primary w-button font-sans"
                  >
                    Explore
                  </a>
                </div>
                <div className="hero-split md:px-6 lg:px-4">
                  <div className="journey">
                    <div
                      className="lottie-animation"
                      data-w-id="b4c98dd0-a2e9-1e11-eee3-8cc84fced1b0"
                      data-animation-type="lottie"
                      data-src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/67534d756275b4d3b1dd6366_soj_babe.json"
                      data-loop="1"
                      data-direction="1"
                      data-autoplay="1"
                      data-is-ix2-target="0"
                      data-renderer="svg"
                      data-default-duration="0"
                      data-duration="6.0060057613763815"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-w-id="5546e555-24a0-f73e-3077-6cea4357ecd9"
          className="about-one about-header-bg"
        ></div>
        <section className="combine-section_team3">
          <div className="combine-padding-global-5">
            <div className="combine-padding-section-medium-2">
              <div className="uui-text-align-center">
                <div className="uui-max-width-large align-center">
                  <h2 className="sojourn_head font-sans">Who we are</h2>
                </div>
              </div>
              <div className="combine-container-small-2">
                <div className="combine-text-align-center-2">
                  <div className="combine-text-size-regular-2 font-sans">
                    At Sojourn, we are reimagining the way Nigerians experience
                    short-term stays. <br />
                    We are a vibrant marketplace connecting guests with hosts
                    offering carefully curated apartments that meet
                    pre-determined standards of comfort, cleanliness, and
                    convenience.
                  </div>
                </div>
              </div>
              {/* <div className="combine-space-large"></div> */}
              {/* <div className="combine-container-large-3">
                <div className="combine-team3_component">
                  <div className="combine-team3_item">
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf24e-b7cd8927"
                      className="combine-team3_image-wrapper"
                    >
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddce8_client2.jpg"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, (max-width: 991px) 240px, 21vw"
                        srcSet="
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddce8_client2-p-500.jpg 500w,
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddce8_client2.jpg       640w
                      "
                        alt="woman avatar"
                        className="combine-team3_image"
                      />
                    </div>
                    <h3 className="combine-heading-style-h6 font-sans">
                      Jenny Watson
                    </h3>
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf252-b7cd8927"
                      className="combine-team3_job-title font-sans"
                    >
                      Product Manager
                    </div>
                    <div className="combine-team3_social-links">
                      <a
                        href="https://www.facebook.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM18.4594 8.09766H16.9617C15.7875 8.09766 15.5602 8.65547 15.5602 9.47578V11.2828H18.3633L17.9977 14.1117H15.5602V21.375H12.6375V14.1141H10.193V11.2828H12.6375V9.19687C12.6375 6.77578 14.1164 5.45625 16.2773 5.45625C17.3133 5.45625 18.2016 5.53359 18.4617 5.56875V8.09766H18.4594Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.instagram.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2.25C9.35125 2.25 9.02138 2.26138 7.97975 2.31013C4.43725 2.47263 2.471 4.43725 2.3085 7.97975C2.26138 9.02138 2.25 9.35288 2.25 12C2.25 14.6488 2.26138 14.9803 2.3085 16.0203C2.471 19.5611 4.43725 21.529 7.97975 21.6915C9.02138 21.7386 9.35125 21.75 12 21.75C14.6488 21.75 14.9803 21.7386 16.0219 21.6915C19.5579 21.529 21.5322 19.5644 21.6915 16.0203C21.7386 14.9803 21.75 14.6488 21.75 12C21.75 9.35288 21.7386 9.02138 21.6915 7.97975C21.5322 4.44213 19.5644 2.471 16.0219 2.31013C14.9803 2.26138 14.6488 2.25 12 2.25ZM11.9997 4.00781C14.603 4.00781 14.9117 4.01756 15.9403 4.06469C18.5842 4.18494 19.816 5.43781 19.9378 8.06056C19.9833 9.08919 19.9931 9.39631 19.9931 11.9996C19.9931 14.6028 19.9833 14.9116 19.9378 15.9386C19.816 18.5597 18.5858 19.8158 15.9403 19.9361C14.9117 19.9816 14.6046 19.9929 11.9997 19.9929C9.39647 19.9929 9.08772 19.9832 8.06072 19.9361C5.41197 19.8142 4.1851 18.5564 4.06322 15.9386C4.01772 14.9116 4.00635 14.6028 4.00635 11.9996C4.00635 9.39631 4.01772 9.08756 4.06322 8.06056C4.18347 5.43619 5.41522 4.18331 8.06072 4.06306C9.08772 4.01594 9.39647 4.00781 11.9997 4.00781ZM6.99316 11.9998C6.99316 9.23404 9.23566 6.99316 11.9998 6.99316C14.7639 6.99316 17.0064 9.23566 17.0064 11.9998C17.0064 14.7655 14.7639 17.0064 11.9998 17.0064C9.23566 17.0064 6.99316 14.7655 6.99316 11.9998ZM11.9995 15.2495C10.2039 15.2495 8.74951 13.7951 8.74951 11.9995C8.74951 10.2055 10.2039 8.74951 11.9995 8.74951C13.7935 8.74951 15.2511 10.2039 15.2511 11.9995C15.2511 13.7951 13.7935 15.2495 11.9995 15.2495ZM16.0327 6.79646C16.0327 6.14971 16.5576 5.62646 17.2027 5.62646C17.8511 5.62646 18.3743 6.14971 18.3743 6.79646C18.3743 7.44321 17.8495 7.96646 17.2027 7.96646C16.556 7.96646 16.0327 7.44159 16.0327 6.79646Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://twitter.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6287 6.3652C20.9165 6.68171 20.1494 6.89488 19.3452 6.99177C20.1672 6.49923 20.7954 5.72086 21.0941 4.79229C20.3254 5.24769 19.4744 5.57875 18.5684 5.75638C17.845 4.98285 16.8098 4.5 15.6681 4.5C13.1004 4.5 11.2142 6.89488 11.794 9.38181C8.49154 9.21547 5.56052 7.63288 3.60005 5.22831C2.55844 7.01438 3.06067 9.35274 4.83059 10.5365C4.17979 10.5155 3.56775 10.3362 3.03161 10.0391C2.988 11.88 4.30898 13.6031 6.22101 13.9875C5.66226 14.1393 5.0486 14.1748 4.42525 14.0553C4.93071 15.6347 6.40188 16.7828 8.1395 16.8151C6.46486 18.1264 4.36066 18.7126 2.25 18.4639C4.01023 19.5927 6.09828 20.25 8.34297 20.25C15.7262 20.25 19.8959 14.0149 19.644 8.42256C20.4223 7.86381 21.0957 7.16295 21.6287 6.3652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.62988 4.19648C2.62988 3.78103 2.79492 3.38259 3.08869 3.08882C3.38247 2.79505 3.7809 2.63001 4.19636 2.63001H19.8117C20.0176 2.62967 20.2215 2.66995 20.4118 2.74853C20.6021 2.82711 20.7751 2.94246 20.9207 3.08796C21.0664 3.23347 21.1819 3.40628 21.2607 3.59649C21.3395 3.78671 21.38 3.9906 21.3799 4.19648V19.8118C21.3801 20.0177 21.3397 20.2217 21.261 20.412C21.1824 20.6023 21.0669 20.7752 20.9214 20.9209C20.7758 21.0665 20.6029 21.1821 20.4127 21.2608C20.2224 21.3396 20.0185 21.3801 19.8126 21.38H4.19636C3.99058 21.38 3.78681 21.3395 3.5967 21.2607C3.40659 21.1819 3.23386 21.0664 3.08839 20.9209C2.94292 20.7753 2.82755 20.6026 2.74888 20.4124C2.67021 20.2222 2.62977 20.0185 2.62988 19.8127V4.19648ZM10.0515 9.77887H12.5904V11.0539C12.9569 10.3209 13.8944 9.66126 15.3032 9.66126C18.004 9.66126 18.6441 11.1212 18.6441 13.7999V18.7618H15.9108V14.4101C15.9108 12.8846 15.5444 12.0238 14.6137 12.0238C13.3225 12.0238 12.7856 12.9519 12.7856 14.4101V18.7618H10.0515V9.77887ZM5.36397 18.6451H8.09806V9.66126H5.36397V18.6442V18.6451ZM8.48926 6.73114C8.49441 6.96524 8.45276 7.19801 8.36673 7.41579C8.28071 7.63356 8.15206 7.83197 7.98832 7.99935C7.82458 8.16674 7.62906 8.29973 7.41322 8.39052C7.19739 8.48132 6.9656 8.52809 6.73145 8.52809C6.49729 8.52809 6.2655 8.48132 6.04967 8.39052C5.83383 8.29973 5.63831 8.16674 5.47457 7.99935C5.31083 7.83197 5.18218 7.63356 5.09616 7.41579C5.01013 7.19801 4.96848 6.96524 4.97363 6.73114C4.98375 6.27164 5.17339 5.83437 5.50194 5.51298C5.8305 5.19158 6.27183 5.01161 6.73145 5.01161C7.19106 5.01161 7.63239 5.19158 7.96095 5.51298C8.2895 5.83437 8.47914 6.27164 8.48926 6.73114Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="combine-team3_item">
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf260-b7cd8927"
                      className="combine-team3_image-wrapper"
                    >
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcdb_client6.jpg"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, (max-width: 991px) 240px, 21vw"
                        srcSet="
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcdb_client6-p-500.jpg 500w,
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcdb_client6.jpg       640w
                      "
                        alt="man avatar"
                        className="combine-team3_image"
                      />
                    </div>
                    <h3 className="combine-heading-style-h6 font-sans">
                      Luke Harper
                    </h3>
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf264-b7cd8927"
                      className="combine-team3_job-title font-sans"
                    >
                      UX Designer
                    </div>
                    <div className="combine-team3_social-links">
                      <a
                        href="https://www.facebook.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM18.4594 8.09766H16.9617C15.7875 8.09766 15.5602 8.65547 15.5602 9.47578V11.2828H18.3633L17.9977 14.1117H15.5602V21.375H12.6375V14.1141H10.193V11.2828H12.6375V9.19687C12.6375 6.77578 14.1164 5.45625 16.2773 5.45625C17.3133 5.45625 18.2016 5.53359 18.4617 5.56875V8.09766H18.4594Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.instagram.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2.25C9.35125 2.25 9.02138 2.26138 7.97975 2.31013C4.43725 2.47263 2.471 4.43725 2.3085 7.97975C2.26138 9.02138 2.25 9.35288 2.25 12C2.25 14.6488 2.26138 14.9803 2.3085 16.0203C2.471 19.5611 4.43725 21.529 7.97975 21.6915C9.02138 21.7386 9.35125 21.75 12 21.75C14.6488 21.75 14.9803 21.7386 16.0219 21.6915C19.5579 21.529 21.5322 19.5644 21.6915 16.0203C21.7386 14.9803 21.75 14.6488 21.75 12C21.75 9.35288 21.7386 9.02138 21.6915 7.97975C21.5322 4.44213 19.5644 2.471 16.0219 2.31013C14.9803 2.26138 14.6488 2.25 12 2.25ZM11.9997 4.00781C14.603 4.00781 14.9117 4.01756 15.9403 4.06469C18.5842 4.18494 19.816 5.43781 19.9378 8.06056C19.9833 9.08919 19.9931 9.39631 19.9931 11.9996C19.9931 14.6028 19.9833 14.9116 19.9378 15.9386C19.816 18.5597 18.5858 19.8158 15.9403 19.9361C14.9117 19.9816 14.6046 19.9929 11.9997 19.9929C9.39647 19.9929 9.08772 19.9832 8.06072 19.9361C5.41197 19.8142 4.1851 18.5564 4.06322 15.9386C4.01772 14.9116 4.00635 14.6028 4.00635 11.9996C4.00635 9.39631 4.01772 9.08756 4.06322 8.06056C4.18347 5.43619 5.41522 4.18331 8.06072 4.06306C9.08772 4.01594 9.39647 4.00781 11.9997 4.00781ZM6.99316 11.9998C6.99316 9.23404 9.23566 6.99316 11.9998 6.99316C14.7639 6.99316 17.0064 9.23566 17.0064 11.9998C17.0064 14.7655 14.7639 17.0064 11.9998 17.0064C9.23566 17.0064 6.99316 14.7655 6.99316 11.9998ZM11.9995 15.2495C10.2039 15.2495 8.74951 13.7951 8.74951 11.9995C8.74951 10.2055 10.2039 8.74951 11.9995 8.74951C13.7935 8.74951 15.2511 10.2039 15.2511 11.9995C15.2511 13.7951 13.7935 15.2495 11.9995 15.2495ZM16.0327 6.79646C16.0327 6.14971 16.5576 5.62646 17.2027 5.62646C17.8511 5.62646 18.3743 6.14971 18.3743 6.79646C18.3743 7.44321 17.8495 7.96646 17.2027 7.96646C16.556 7.96646 16.0327 7.44159 16.0327 6.79646Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://twitter.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6287 6.3652C20.9165 6.68171 20.1494 6.89488 19.3452 6.99177C20.1672 6.49923 20.7954 5.72086 21.0941 4.79229C20.3254 5.24769 19.4744 5.57875 18.5684 5.75638C17.845 4.98285 16.8098 4.5 15.6681 4.5C13.1004 4.5 11.2142 6.89488 11.794 9.38181C8.49154 9.21547 5.56052 7.63288 3.60005 5.22831C2.55844 7.01438 3.06067 9.35274 4.83059 10.5365C4.17979 10.5155 3.56775 10.3362 3.03161 10.0391C2.988 11.88 4.30898 13.6031 6.22101 13.9875C5.66226 14.1393 5.0486 14.1748 4.42525 14.0553C4.93071 15.6347 6.40188 16.7828 8.1395 16.8151C6.46486 18.1264 4.36066 18.7126 2.25 18.4639C4.01023 19.5927 6.09828 20.25 8.34297 20.25C15.7262 20.25 19.8959 14.0149 19.644 8.42256C20.4223 7.86381 21.0957 7.16295 21.6287 6.3652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.62988 4.19648C2.62988 3.78103 2.79492 3.38259 3.08869 3.08882C3.38247 2.79505 3.7809 2.63001 4.19636 2.63001H19.8117C20.0176 2.62967 20.2215 2.66995 20.4118 2.74853C20.6021 2.82711 20.7751 2.94246 20.9207 3.08796C21.0664 3.23347 21.1819 3.40628 21.2607 3.59649C21.3395 3.78671 21.38 3.9906 21.3799 4.19648V19.8118C21.3801 20.0177 21.3397 20.2217 21.261 20.412C21.1824 20.6023 21.0669 20.7752 20.9214 20.9209C20.7758 21.0665 20.6029 21.1821 20.4127 21.2608C20.2224 21.3396 20.0185 21.3801 19.8126 21.38H4.19636C3.99058 21.38 3.78681 21.3395 3.5967 21.2607C3.40659 21.1819 3.23386 21.0664 3.08839 20.9209C2.94292 20.7753 2.82755 20.6026 2.74888 20.4124C2.67021 20.2222 2.62977 20.0185 2.62988 19.8127V4.19648ZM10.0515 9.77887H12.5904V11.0539C12.9569 10.3209 13.8944 9.66126 15.3032 9.66126C18.004 9.66126 18.6441 11.1212 18.6441 13.7999V18.7618H15.9108V14.4101C15.9108 12.8846 15.5444 12.0238 14.6137 12.0238C13.3225 12.0238 12.7856 12.9519 12.7856 14.4101V18.7618H10.0515V9.77887ZM5.36397 18.6451H8.09806V9.66126H5.36397V18.6442V18.6451ZM8.48926 6.73114C8.49441 6.96524 8.45276 7.19801 8.36673 7.41579C8.28071 7.63356 8.15206 7.83197 7.98832 7.99935C7.82458 8.16674 7.62906 8.29973 7.41322 8.39052C7.19739 8.48132 6.9656 8.52809 6.73145 8.52809C6.49729 8.52809 6.2655 8.48132 6.04967 8.39052C5.83383 8.29973 5.63831 8.16674 5.47457 7.99935C5.31083 7.83197 5.18218 7.63356 5.09616 7.41579C5.01013 7.19801 4.96848 6.96524 4.97363 6.73114C4.98375 6.27164 5.17339 5.83437 5.50194 5.51298C5.8305 5.19158 6.27183 5.01161 6.73145 5.01161C7.19106 5.01161 7.63239 5.19158 7.96095 5.51298C8.2895 5.83437 8.47914 6.27164 8.48926 6.73114Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="combine-team3_item">
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf272-b7cd8927"
                      className="combine-team3_image-wrapper"
                    >
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcf2_client1.jpg"
                        loading="lazy"
                        sizes="(max-width: 479px) 100vw, (max-width: 991px) 240px, 21vw"
                        srcSet="
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcf2_client1-p-500.jpg 500w,
                        https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647e87657f9f6ae548ddcf2_client1.jpg       640w
                      "
                        alt="woman avatar"
                        className="combine-team3_image"
                      />
                    </div>
                    <h3 className="combine-heading-style-h6 font-sans">
                      Lisa Jhonson
                    </h3>
                    <div
                      id="w-node-a864c761-2504-4135-a06e-98976ffdf276-b7cd8927"
                      className="combine-team3_job-title font-sans"
                    >
                      Sales Team Lead
                    </div>
                    <div className="combine-team3_social-links">
                      <a
                        href="https://www.facebook.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM18.4594 8.09766H16.9617C15.7875 8.09766 15.5602 8.65547 15.5602 9.47578V11.2828H18.3633L17.9977 14.1117H15.5602V21.375H12.6375V14.1141H10.193V11.2828H12.6375V9.19687C12.6375 6.77578 14.1164 5.45625 16.2773 5.45625C17.3133 5.45625 18.2016 5.53359 18.4617 5.56875V8.09766H18.4594Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.instagram.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2.25C9.35125 2.25 9.02138 2.26138 7.97975 2.31013C4.43725 2.47263 2.471 4.43725 2.3085 7.97975C2.26138 9.02138 2.25 9.35288 2.25 12C2.25 14.6488 2.26138 14.9803 2.3085 16.0203C2.471 19.5611 4.43725 21.529 7.97975 21.6915C9.02138 21.7386 9.35125 21.75 12 21.75C14.6488 21.75 14.9803 21.7386 16.0219 21.6915C19.5579 21.529 21.5322 19.5644 21.6915 16.0203C21.7386 14.9803 21.75 14.6488 21.75 12C21.75 9.35288 21.7386 9.02138 21.6915 7.97975C21.5322 4.44213 19.5644 2.471 16.0219 2.31013C14.9803 2.26138 14.6488 2.25 12 2.25ZM11.9997 4.00781C14.603 4.00781 14.9117 4.01756 15.9403 4.06469C18.5842 4.18494 19.816 5.43781 19.9378 8.06056C19.9833 9.08919 19.9931 9.39631 19.9931 11.9996C19.9931 14.6028 19.9833 14.9116 19.9378 15.9386C19.816 18.5597 18.5858 19.8158 15.9403 19.9361C14.9117 19.9816 14.6046 19.9929 11.9997 19.9929C9.39647 19.9929 9.08772 19.9832 8.06072 19.9361C5.41197 19.8142 4.1851 18.5564 4.06322 15.9386C4.01772 14.9116 4.00635 14.6028 4.00635 11.9996C4.00635 9.39631 4.01772 9.08756 4.06322 8.06056C4.18347 5.43619 5.41522 4.18331 8.06072 4.06306C9.08772 4.01594 9.39647 4.00781 11.9997 4.00781ZM6.99316 11.9998C6.99316 9.23404 9.23566 6.99316 11.9998 6.99316C14.7639 6.99316 17.0064 9.23566 17.0064 11.9998C17.0064 14.7655 14.7639 17.0064 11.9998 17.0064C9.23566 17.0064 6.99316 14.7655 6.99316 11.9998ZM11.9995 15.2495C10.2039 15.2495 8.74951 13.7951 8.74951 11.9995C8.74951 10.2055 10.2039 8.74951 11.9995 8.74951C13.7935 8.74951 15.2511 10.2039 15.2511 11.9995C15.2511 13.7951 13.7935 15.2495 11.9995 15.2495ZM16.0327 6.79646C16.0327 6.14971 16.5576 5.62646 17.2027 5.62646C17.8511 5.62646 18.3743 6.14971 18.3743 6.79646C18.3743 7.44321 17.8495 7.96646 17.2027 7.96646C16.556 7.96646 16.0327 7.44159 16.0327 6.79646Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://twitter.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6287 6.3652C20.9165 6.68171 20.1494 6.89488 19.3452 6.99177C20.1672 6.49923 20.7954 5.72086 21.0941 4.79229C20.3254 5.24769 19.4744 5.57875 18.5684 5.75638C17.845 4.98285 16.8098 4.5 15.6681 4.5C13.1004 4.5 11.2142 6.89488 11.794 9.38181C8.49154 9.21547 5.56052 7.63288 3.60005 5.22831C2.55844 7.01438 3.06067 9.35274 4.83059 10.5365C4.17979 10.5155 3.56775 10.3362 3.03161 10.0391C2.988 11.88 4.30898 13.6031 6.22101 13.9875C5.66226 14.1393 5.0486 14.1748 4.42525 14.0553C4.93071 15.6347 6.40188 16.7828 8.1395 16.8151C6.46486 18.1264 4.36066 18.7126 2.25 18.4639C4.01023 19.5927 6.09828 20.25 8.34297 20.25C15.7262 20.25 19.8959 14.0149 19.644 8.42256C20.4223 7.86381 21.0957 7.16295 21.6287 6.3652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        className="combine-team3_social-link w-inline-block"
                      >
                        <div className="combine-social_icon w-embed">
                          <svg
                            width="currentWidth"
                            height="currentHeight"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.62988 4.19648C2.62988 3.78103 2.79492 3.38259 3.08869 3.08882C3.38247 2.79505 3.7809 2.63001 4.19636 2.63001H19.8117C20.0176 2.62967 20.2215 2.66995 20.4118 2.74853C20.6021 2.82711 20.7751 2.94246 20.9207 3.08796C21.0664 3.23347 21.1819 3.40628 21.2607 3.59649C21.3395 3.78671 21.38 3.9906 21.3799 4.19648V19.8118C21.3801 20.0177 21.3397 20.2217 21.261 20.412C21.1824 20.6023 21.0669 20.7752 20.9214 20.9209C20.7758 21.0665 20.6029 21.1821 20.4127 21.2608C20.2224 21.3396 20.0185 21.3801 19.8126 21.38H4.19636C3.99058 21.38 3.78681 21.3395 3.5967 21.2607C3.40659 21.1819 3.23386 21.0664 3.08839 20.9209C2.94292 20.7753 2.82755 20.6026 2.74888 20.4124C2.67021 20.2222 2.62977 20.0185 2.62988 19.8127V4.19648ZM10.0515 9.77887H12.5904V11.0539C12.9569 10.3209 13.8944 9.66126 15.3032 9.66126C18.004 9.66126 18.6441 11.1212 18.6441 13.7999V18.7618H15.9108V14.4101C15.9108 12.8846 15.5444 12.0238 14.6137 12.0238C13.3225 12.0238 12.7856 12.9519 12.7856 14.4101V18.7618H10.0515V9.77887ZM5.36397 18.6451H8.09806V9.66126H5.36397V18.6442V18.6451ZM8.48926 6.73114C8.49441 6.96524 8.45276 7.19801 8.36673 7.41579C8.28071 7.63356 8.15206 7.83197 7.98832 7.99935C7.82458 8.16674 7.62906 8.29973 7.41322 8.39052C7.19739 8.48132 6.9656 8.52809 6.73145 8.52809C6.49729 8.52809 6.2655 8.48132 6.04967 8.39052C5.83383 8.29973 5.63831 8.16674 5.47457 7.99935C5.31083 7.83197 5.18218 7.63356 5.09616 7.41579C5.01013 7.19801 4.96848 6.96524 4.97363 6.73114C4.98375 6.27164 5.17339 5.83437 5.50194 5.51298C5.8305 5.19158 6.27183 5.01161 6.73145 5.01161C7.19106 5.01161 7.63239 5.19158 7.96095 5.51298C8.2895 5.83437 8.47914 6.27164 8.48926 6.73114Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <div className="later">
        <div className="container-regular">
          <div className="w-layout-grid about-content-grid">
            <div
              id="w-node-ccd3efc2-503c-f97e-8ccc-38934be51f5a-b7cd8927"
              data-w-id="ccd3efc2-503c-f97e-8ccc-38934be51f5a"
              className="about-one"
            >
              <div className="margin-bottom-12">
                <div className="detail text-color-primary font-sans">
                  about hireup
                </div>
              </div>
              <div className="margin-bottom-24">
                <h3 className="font-sans">
                  Who is
                  <br />
                  our audience?
                </h3>
              </div>
              <p className="paragraph-regular font-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                rhoncus pharetra cursus. Suspendisse sodales porta leo, ac
                placerat ex pretium quis.
              </p>
              <div className="about-content-list-wrapper">
                <div className="about-content-list-item">
                  <div className="icon-regular w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 12C19 13.4776 18.5324 14.9173 17.6642 16.113C16.796 17.3086 15.5717 18.1989 14.1667 18.6562C12.7616 19.1136 11.2479 19.1146 9.84223 18.6591C8.43657 18.2037 7.21109 17.315 6.34129 16.1206C5.47149 14.9261 5.00198 13.487 5.00001 12.0094C4.99803 10.5318 5.46368 9.09141 6.33028 7.8946C7.19688 6.69779 8.41998 5.80591 9.82441 5.34667C11.2289 4.88743 12.7426 4.88439 14.1489 5.33799"
                        stroke="#D4D3F4"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 11L12 14L19 7"
                        stroke="#4640DE"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="paragraph-regular font-sans">
                    Add your feature here
                  </div>
                </div>
                <div className="about-content-list-item">
                  <div className="icon-regular w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 12C19 13.4776 18.5324 14.9173 17.6642 16.113C16.796 17.3086 15.5717 18.1989 14.1667 18.6562C12.7616 19.1136 11.2479 19.1146 9.84223 18.6591C8.43657 18.2037 7.21109 17.315 6.34129 16.1206C5.47149 14.9261 5.00198 13.487 5.00001 12.0094C4.99803 10.5318 5.46368 9.09141 6.33028 7.8946C7.19688 6.69779 8.41998 5.80591 9.82441 5.34667C11.2289 4.88743 12.7426 4.88439 14.1489 5.33799"
                        stroke="#D4D3F4"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 11L12 14L19 7"
                        stroke="#4640DE"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="paragraph-regular font-sans">
                    Add your feature here
                  </div>
                </div>
              </div>
            </div>
            <div
              data-w-id="beb7038e-1484-b02d-5171-8f7827b14975"
              className="about-one w-layout-grid about-content-image-grid"
            >
              <div
                id="w-node-_891a2e3c-8db2-7181-d35a-5580af89f693-b7cd8927"
                className="about-content-image-bottom-left"
              >
                <img
                  src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8974_About%20Page%20Image%20(4).webp"
                  loading="lazy"
                  id="w-node-_5d0089f8-8183-ac45-04bc-a4b4283492c6-b7cd8927"
                  alt=""
                  className="image-cover"
                />
              </div>
              <div
                id="w-node-_36ecdbfe-7139-4220-d685-0caadfd024e2-b7cd8927"
                className="about-content-image-top-right"
              >
                <img
                  src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd896f_About%20Page%20Image%20(3).webp"
                  loading="lazy"
                  id="w-node-_36ecdbfe-7139-4220-d685-0caadfd024e3-b7cd8927"
                  alt=""
                  className="image-cover"
                />
              </div>
              <div id="w-node-_830f4ea9-6d21-fe97-64e4-cf7f5edfa5c6-b7cd8927">
                <img
                  src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8976_About%20Page%20Image%20(2).webp"
                  loading="lazy"
                  alt=""
                  className="image-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="later">
        <div className="container-regular">
          <div
            data-w-id="04fdb74d-33c9-b477-a3a1-f30fc534148f"
            className="about-one title-wrap-center max-width-450"
          >
            <div className="margin-bottom-12">
              <div className="detail text-color-primary font-sans">
                about hireup
              </div>
            </div>
            <div className="margin-bottom-24">
              <h3 className="font-sans">Our Team</h3>
            </div>
            <p className="paragraph-regular font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              rhoncus pharetra cursus. Suspendisse sodales porta leo, ac
              placerat ex pretium quis.
            </p>
          </div>
          <div
            data-w-id="64e2202d-fb29-c003-d547-fd497a14ed0a"
            className="about-one w-layout-grid about-team-image-grid"
          >
            <img
              src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8973_About%20Page%20Image%20(6).webp"
              loading="lazy"
              id="w-node-_8d2cf6e8-2f20-9910-5cf6-825a2a726b87-b7cd8927"
              alt=""
              className="image-cover"
            />
            <img
              src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8972_About%20Page%20Image%20(1).webp"
              loading="lazy"
              width="787"
              id="w-node-_2188cea0-b1c9-1999-8d80-7a5f0d7bc428-b7cd8927"
              alt=""
              className="image-cover"
            />
            <img
              src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8970_About%20Page%20Image%20(5).webp"
              loading="lazy"
              id="w-node-_0b6fa830-0fde-8a26-8fdc-27f1d31bfcc7-b7cd8927"
              alt=""
              className="image-cover"
            />
          </div>
          <div
            data-w-id="ae3a6e9a-b479-da57-893a-50af76d20679"
            className="about-one w-layout-grid about-team-image-grid-bottom"
          >
            <img
              src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8977_About%20Page%20Image%20(7).webp"
              loading="lazy"
              sizes="100vw"
              srcSet="
              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8977_About%2520Page%2520Image%2520(7)-p-1080.jpeg 1080w,
              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8977_About%20Page%20Image%20(7).webp              1088w
            "
              alt=""
              className="image-cover"
            />
            <img
              src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8975_About%20Page%20Image%20(8).webp"
              loading="lazy"
              sizes="100vw"
              srcSet="
              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8975_About%2520Page%2520Image%2520(8)-p-500.jpeg   500w,
              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8975_About%2520Page%2520Image%2520(8)-p-1080.jpeg 1080w,
              https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd8975_About%20Page%20Image%20(8).webp              1088w
            "
              alt=""
              className="image-cover"
            />
          </div>
        </div>
        <div
          data-w-id="3d8d189f-114f-51e5-f69b-60e22c2b7a5d"
          className="about-content-background-color about-two"
        ></div>
      </div>
      <header className="uui-section_heroheader09">
        <div className="uui-page-padding-2-copy">
          <div className="uui-container-large-2">
            <div className="uui-padding-vertical-xhuge-2">
              <div className="uui-text-align-center">
                <div className="uui-max-width-large align-center">
                  <h2 className="sojourn_head">Safety and comfort</h2>
                </div>
              </div>
              <div className="w-layout-grid uui-heroheader09_component">
                <div className="uui-heroheader09_content">
                  <div className="uui-space-small-2"></div>
                  <div className="soj-first">
                    <div className="combine-text-size-regular-2">
                      At Sojourn, your safety and comfort are at the core of our
                      mission. We know finding the right apartment can feel
                      overwhelming, which is why we ensure every property listed
                      meets high safety and comfort standards.
                    </div>
                  </div>
                  <div className="soj-second">
                    <div className="combine-text-size-regular-2">
                      Each property undergoes a thorough evaluation process,
                      checking for secure access, fire safety measures, and
                      essential amenities. Our commitment is to provide you with
                      a trusted platform where you can book with confidence,
                      knowing your well-being is prioritized every step of the
                      way.
                    </div>
                  </div>
                  <div className="uui-max-width-small"></div>
                  <div className="uui-space-large"></div>
                  <div className="div-block-10">
                    <a
                      href="#"
                      // className="button-primary-big-3 w-button"
                      className="button-primary-big bg-primary w-button font-sans"
                    >
                      Explore
                    </a>
                  </div>
                </div>
                <div className="uui-heroheader09_image-wrapper">
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648081800ff680e6103928a_pexels-jovydas-2462015.jpg"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 32vw, (max-width: 991px) 29vw, 14vw"
                    height="600"
                    alt="Geometric shape"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648081800ff680e6103928a_pexels-jovydas-2462015-p-500.jpg   500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648081800ff680e6103928a_pexels-jovydas-2462015-p-800.jpg   800w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648081800ff680e6103928a_pexels-jovydas-2462015-p-1080.jpg 1080w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648081800ff680e6103928a_pexels-jovydas-2462015.jpg        1333w
                  "
                    className="uui-heroheader09_image _03"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb02b6c7afe5679d1d_p1.jpg"
                    loading="lazy"
                    width="960"
                    height="200"
                    alt="Geometric shape"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb02b6c7afe5679d1d_p1-p-500.jpg  500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb02b6c7afe5679d1d_p1-p-800.jpg  800w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb02b6c7afe5679d1d_p1.jpg       1000w
                  "
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 32vw, (max-width: 991px) 29vw, 14vw"
                    className="uui-heroheader09_image _02"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2e0_geometric-shape-04.jpg"
                    loading="lazy"
                    width="600"
                    height="600"
                    alt="Geometric shape"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2e0_geometric-shape-04-p-500.jpg 500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2e0_geometric-shape-04.jpg       600w
                  "
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 32vw, (max-width: 991px) 29vw, 14vw"
                    className="uui-heroheader09_image _01"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcbe0c8682c23de8b54_p3.jpg"
                    loading="lazy"
                    alt="Geometric shape"
                    height="200"
                    width="200"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcbe0c8682c23de8b54_p3-p-500.jpg  500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcbe0c8682c23de8b54_p3-p-800.jpg  800w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcbe0c8682c23de8b54_p3.jpg       1000w
                  "
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 32vw, (max-width: 991px) 29vw, 14vw"
                    className="uui-heroheader09_image _07"
                  />
                  <img
                    className="uui-heroheader09_image _08 hide-mobile-landscape"
                    // src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb359ec355bf1c3fac_p2.jpg"
                    src="/assets/imgs/living-room-about-us.jpg"
                    width="1200"
                    height="600"
                    alt="Geometric shape"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 29vw, 14vw"
                    id="w-node-b3038d4b-1789-30ab-82c4-215d2cb84025-b7cd8927"
                    loading="lazy"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb359ec355bf1c3fac_p2-p-500.jpg  500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb359ec355bf1c3fac_p2-p-800.jpg  800w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f2fcb359ec355bf1c3fac_p2.jpg       1000w
                  "
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2c7748109af638e311_geometric-shape-08.jpg"
                    loading="lazy"
                    width="600"
                    height="600"
                    alt="Geometric shape"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2c7748109af638e311_geometric-shape-08-p-500.jpg 500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2c7748109af638e311_geometric-shape-08.jpg       600w
                  "
                    sizes="100vw"
                    className="uui-heroheader09_image _09 hide-tablet"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2c7748109af638e2f8_geometric-shape-05.svg"
                    loading="lazy"
                    width="200"
                    height="200"
                    alt="Geometric shape"
                    className="uui-heroheader09_image _10 hide-tablet"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2b7_geometric-shape-01.jpg"
                    loading="lazy"
                    width="600"
                    height="600"
                    alt="Geometric shape"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2b7_geometric-shape-01-p-500.jpg 500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6647ec2b7748109af638e2b7_geometric-shape-01.jpg       600w
                  "
                    sizes="100vw"
                    className="uui-heroheader09_image _11 hide-tablet"
                  />
                </div>
              </div>
            </div>
          </div>
          <header className="uui-section_heroheader01">
            <div className="uui-page-padding-6">
              <div className="uui-container-large-6">
                <div className="uui-padding-vertical-xhuge-6">
                  <div className="w-layout-grid uui-heroheader01_component">
                    <div className="uui-heroheader01_content">
                      <div className="uui-max-width-medium"></div>
                      <div>
                        <div>
                          <h2 className="heading-about-copy-copy">
                            Sojourn and Our Commitment to
                          </h2>
                          <h2 className="heading-about-copy">ESG in Nigeria</h2>
                        </div>
                        <div className="subhead-copy">
                          At Sojourn, we’re dedicated to transforming travel in
                          Nigeria with comfort, luxury, flexibility, and
                          sustainability. Our focus on Environmental, Social,
                          and Governance (ESG) principles ensures we make a
                          positive impact. Here’s how:
                        </div>
                        <div className="combine-space-large-4"></div>
                      </div>
                    </div>
                    <div className="uui-heroheader01_image-wrapper">
                      <img
                        className="uui-heroheader01_image"
                        src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/66663c838849ddf3a64d0446_esg2.jpeg"
                        alt="Header image"
                        style={{ opacity: 1 }}
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 84vw, 37vw"
                        data-w-id="c6e46a7d-5fc6-51b3-be9d-06dded2ada07"
                        loading="lazy"
                        srcSet="
                        https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/66663c838849ddf3a64d0446_esg2-p-500.jpeg  500w,
                        https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/66663c838849ddf3a64d0446_esg2-p-800.jpeg  800w,
                        https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/66663c838849ddf3a64d0446_esg2.jpeg       1067w
                      "
                      />
                      <div className="uui-heroheader01_fileupload-image-wrapper hide-mobile-landscape"></div>
                      <img
                        src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/665f27664e206c9660b37a48_Line%20Pattern%20Header%201.1.svg"
                        loading="lazy"
                        alt=""
                        className="uui-heroheader01_pattern-image"
                      />
                    </div>
                  </div>
                  <div className="esg-more">
                    <div className="uui-padding-vertical-xhuge-7">
                      <div className="w-layout-grid uui-layout34_component">
                        <div
                          id="w-node-c6e46a7d-5fc6-51b3-be9d-06dded2ada0d-b7cd8927"
                          className="uui-layout34_content"
                        >
                          <div className="uui-icon-featured-outline-large">
                            <div className="uui-icon-1x1-xsmall-2 w-embed">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.09436 11.2288C6.03221 10.8282 5.99996 10.4179 5.99996 10C5.99996 5.58172 9.60525 2 14.0526 2C18.4999 2 22.1052 5.58172 22.1052 10C22.1052 10.9981 21.9213 11.9535 21.5852 12.8345C21.5154 13.0175 21.4804 13.109 21.4646 13.1804C21.4489 13.2512 21.4428 13.301 21.4411 13.3735C21.4394 13.4466 21.4493 13.5272 21.4692 13.6883L21.8717 16.9585C21.9153 17.3125 21.9371 17.4895 21.8782 17.6182C21.8266 17.731 21.735 17.8205 21.6211 17.8695C21.4911 17.9254 21.3146 17.8995 20.9617 17.8478L17.7765 17.3809C17.6101 17.3565 17.527 17.3443 17.4512 17.3448C17.3763 17.3452 17.3245 17.3507 17.2511 17.3661C17.177 17.3817 17.0823 17.4172 16.893 17.4881C16.0097 17.819 15.0524 18 14.0526 18C13.6344 18 13.2237 17.9683 12.8227 17.9073M7.63158 22C10.5965 22 13 19.5376 13 16.5C13 13.4624 10.5965 11 7.63158 11C4.66668 11 2.26316 13.4624 2.26316 16.5C2.26316 17.1106 2.36028 17.6979 2.53955 18.2467C2.61533 18.4787 2.65322 18.5947 2.66566 18.6739C2.67864 18.7567 2.68091 18.8031 2.67608 18.8867C2.67145 18.9668 2.65141 19.0573 2.61134 19.2383L2 22L4.9948 21.591C5.15827 21.5687 5.24 21.5575 5.31137 21.558C5.38652 21.5585 5.42641 21.5626 5.50011 21.5773C5.5701 21.5912 5.67416 21.6279 5.88227 21.7014C6.43059 21.8949 7.01911 22 7.63158 22Z"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="uui-space-small-4"></div>
                          <h3 className="uui-heading-xsmall-2">
                            Environmental Responsibility
                          </h3>
                          <div className="uui-space-xxsmall-2"></div>
                          <ul role="list" className="list">
                            <li className="soj-list">
                              Energy Efficiency: We use energy-saving appliances
                              and smart technology.
                            </li>
                            <li className="soj-list">
                              Sustainable Materials: Our interiors feature
                              eco-friendly and recycled materials.
                            </li>
                            <li className="soj-list">
                              Waste Reduction: We promote recycling and
                              composting.
                            </li>
                            <li className="soj-list">
                              Carbon Footprint Tracking: We monitor emissions
                              and offer eco-friendly tips to guests.
                              <br />
                            </li>
                          </ul>
                        </div>
                        <div
                          id="w-node-c6e46a7d-5fc6-51b3-be9d-06dded2ada1e-b7cd8927"
                          className="uui-layout34_content"
                        >
                          <div className="uui-icon-featured-outline-large">
                            <div className="uui-icon-1x1-xsmall-2 w-embed">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="uui-space-small-4"></div>
                          <h3 className="uui-heading-xsmall-2">
                            Social Responsibility
                          </h3>
                          <div className="uui-space-xxsmall-2"></div>
                          <ul role="list" className="list">
                            <li className="soj-list">
                              Community Engagement: We support local businesses
                              and artisans.
                            </li>
                            <li className="soj-list">
                              Inclusive Practices: Our properties are accessible
                              and welcoming to all.
                            </li>
                            <li className="soj-list">
                              Fair Labor Practices: We ensure fair wages and
                              training for employees.
                            </li>
                          </ul>
                        </div>
                        <div
                          id="w-node-c6e46a7d-5fc6-51b3-be9d-06dded2ada2c-b7cd8927"
                          className="uui-layout34_content"
                        >
                          <div className="uui-icon-featured-outline-large">
                            <div className="uui-icon-1x1-xsmall-2 w-embed">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V13M12 8H16V12M15.5 3.5V2M19.4393 4.56066L20.5 3.5M20.5103 8.5H22.0103M3 13.3471C3.65194 13.4478 4.31987 13.5 5 13.5C9.38636 13.5 13.2653 11.3276 15.6197 8"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="uui-space-small-4"></div>
                          <div className="uui-space-xxsmall-2"></div>
                          <h3 className="uui-heading-xsmall-2">Governance</h3>
                          <ul role="list" className="list">
                            <li className="soj-list">
                              Ethical Standards: We operate with integrity and
                              transparency.
                            </li>
                            <li className="soj-list">
                              Data Privacy and Security: We protect guest and
                              host data.
                            </li>
                            <li className="soj-list">
                              Stakeholder Engagement: We address the needs of
                              guests, hosts, employees, and investors.
                            </li>
                          </ul>
                          <div className="uui-space-small-4"></div>
                        </div>
                        <div
                          id="w-node-c6e46a7d-5fc6-51b3-be9d-06dded2ada3b-b7cd8927"
                          className="uui-layout34_content"
                        >
                          <div className="uui-icon-featured-outline-large">
                            <div className="uui-icon-1x1-xsmall-2 w-embed">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.99962 14C8.99962 14 10.3121 15.5 12.4996 15.5C14.6871 15.5 15.9996 14 15.9996 14M15.2496 9H15.2596M9.74962 9H9.75962M12.4996 20C17.194 20 20.9996 16.1944 20.9996 11.5C20.9996 6.80558 17.194 3 12.4996 3C7.8052 3 3.99962 6.80558 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.443 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78127 19.299 8.85881 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20ZM15.7496 9C15.7496 9.27614 15.5258 9.5 15.2496 9.5C14.9735 9.5 14.7496 9.27614 14.7496 9C14.7496 8.72386 14.9735 8.5 15.2496 8.5C15.5258 8.5 15.7496 8.72386 15.7496 9ZM10.2496 9C10.2496 9.27614 10.0258 9.5 9.74962 9.5C9.47348 9.5 9.24962 9.27614 9.24962 9C9.24962 8.72386 9.47348 8.5 9.74962 8.5C10.0258 8.5 10.2496 8.72386 10.2496 9Z"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="uui-space-small-4"></div>
                          <h3 className="uui-heading-xsmall-2">
                            Our ESG Metrics
                          </h3>
                          <div className="uui-space-xxsmall-2"></div>
                          <div className="uui-text-size-medium-5">
                            We track and improve our performance by monitoring
                            energy use, carbon emissions, waste recycling, local
                            sourcing, and satisfaction surveys.
                            <br />
                            <br />
                            Join us at Sojourn, where comfort meets
                            sustainability.
                          </div>
                          <div className="uui-space-small-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section className="uui-section_layout34">
                    <div className="uui-page-padding-7">
                      <div className="uui-container-large-7"></div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </header>
        </div>
      </header>
      <section className="combine-section_team1 bg-primary">
        <div className="combine-padding-global-6">
          <div className="combine-padding-section-medium-3">
            <div className="combine-container-small-3">
              <div className="combine-text-align-center-2">
                <div className="soj-bigtext font-sans text-white">
                  At the heart of Sojourn is a commitment to simplicity,
                  sustainability, and inclusivity.
                  <p className="soj-bigtext font-sans text-white">
                    Join us on this journey as we transform the hospitality
                    landscape in Nigeria, one stay at a time.
                  </p>
                </div>
              </div>
            </div>
            <div className="combine-space-large"></div>
            <div className="combine-container-medium">
              <div className="combine-team1_component">
                <div
                  id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d80d-b7cd8927"
                  className="combine-team1_item"
                >
                  <div
                    id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d80e-b7cd8927"
                    className="combine-team1_image-wrapper"
                  >
                    <img
                      src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647fa82fc7ebdd3bd8172ba_inspect.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team1_image"
                    />
                  </div>
                  <h3 className="combine-heading-style-h6 font-sans">
                    Quality standards
                  </h3>
                  <div className="combine-text-size-regular-3 font-sans">
                    At Sojourn, we ensure all listed properties meet strict
                    quality benchmarks through regular evaluations and
                    maintenance, guaranteeing a consistently high standard of
                    living for every guest.
                  </div>
                </div>
                <div
                  id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d81f-b7cd8927"
                  className="combine-team1_item"
                >
                  <div
                    id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d820-b7cd8927"
                    className="combine-team1_image-wrapper"
                  >
                    <img
                      src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647fa8238867edf4a209b17_clean.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team1_image"
                    />
                  </div>
                  <h3 className="combine-heading-style-h6 font-sans">
                    Flexible Payment System & Value Rewards
                  </h3>
                  <div className="combine-text-size-regular-3 font-sans">
                    We make staying easier with flexible payment options and a
                    rewarding system that lets you earn credits, share them with
                    others, or use them for discounts on future bookings.
                  </div>
                </div>
                <div
                  id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d831-b7cd8927"
                  className="combine-team1_item"
                >
                  <div
                    id="w-node-_6aaaa759-4827-b412-8e3b-4a4eb7b5d832-b7cd8927"
                    className="combine-team1_image-wrapper"
                  >
                    <img
                      src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/6647fa829a700b79118f1375_convey.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team1_image"
                    />
                  </div>
                  <h3 className="combine-heading-style-h6 font-sans">
                    Control your journey
                  </h3>
                  <div className="combine-text-size-regular-3 font-sans">
                    With Sojourn, you’re in charge of your experience. Our
                    platform empowers you to choose from diverse options,
                    customizing your stay to match your unique preferences and
                    lifestyle needs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="combine-section_team2">
        <div className="combine-padding-global-7">
          <div className="combine-padding-section-medium-4">
            <div className="combine-container-small-4">
              <div className="combine-text-align-center-3">
                <div className="soj-bigtext-copy">Perfect apartments</div>
              </div>
            </div>
            <div className="combine-space-large-2"></div>
            <div className="combine-container-large-4">
              <div className="combine-team2_component-copy">
                <div className="combine-team2_item">
                  <div
                    id="w-node-_06597348-8e11-5aca-61d8-0ecc1906ab41-b7cd8927"
                    className="combine-team2_image-wrapper"
                  >
                    <img
                      src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/664800849c263259fb570557_s1.svg"
                      loading="lazy"
                      alt=""
                      className="soj-icon-perfect"
                    />
                  </div>
                  <div className="soj-text-cen">
                    Our intuitive booking platform makes it easy to find the
                    perfect accommodation for your needs.
                  </div>
                </div>
                <div className="combine-team2_item">
                  <div
                    id="w-node-_06597348-8e11-5aca-61d8-0ecc1906ab53-b7cd8927"
                    className="combine-team2_image-wrapper"
                  >
                    <img
                      src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6648008464a40ba4eb3488a2_s2.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team2_image"
                    />
                  </div>
                  <div className="soj-text-cen">
                    We provide comprehensive information, including detailed
                    descriptions and photographs of each property, so you can
                    make an informed decision.
                  </div>
                </div>
                <div className="combine-team2_item">
                  <div
                    id="w-node-_06597348-8e11-5aca-61d8-0ecc1906ab65-b7cd8927"
                    className="combine-team2_image-wrapper"
                  >
                    <img
                      src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/66480084d9f15d2477cac95c_s3.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team2_image"
                    />
                  </div>
                  <div className="soj-text-cen">
                    As responsible global citizens, we are committed to making a
                    positive impact on the environment.
                  </div>
                </div>
                <div className="combine-team2_item">
                  <div
                    id="w-node-_06597348-8e11-5aca-61d8-0ecc1906ab77-b7cd8927"
                    className="combine-team2_image-wrapper"
                  >
                    <img
                      src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/664800848232c9c2a2fc38d7_s4.svg"
                      loading="lazy"
                      alt=""
                      className="combine-team2_image"
                    />
                  </div>
                  <div className="soj-text-cen">
                    We actively promote sustainable practices and eco-friendly
                    initiatives across all aspects of our operations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-5">
        <div className="about-cta2">
          <div className="container-4">
            <div className="hero-wrapper">
              <div className="hero-split">
                <h1 className="soj-subhead-copy">Enjoy your jouney</h1>
                <p className="margin-bottom-24px">
                  Your journey with Sojourn begins the moment you consider
                  booking with us. Our dedicated customer support team is
                  available 24/7 to assist you with any queries or concerns.{" "}
                  <br />
                  <br />
                  We invite you to join us on this exciting journey. Experience
                  the Sojourn difference today and immerse yourself in the
                  beauty of your chosen destination. Whether you &#x27;re a
                  seasoned traveler or embarking on your first adventure, we
                  promise to provide a stay that surpasses expectations.
                </p>
                <div className="combine-space-medium"></div>
                <a
                  href={`/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`}
                  className="button-primary-big-3 w-button"
                >
                  Explore
                </a>
              </div>
              <div className="man-trav">
                <div className="journey">
                  <img
                    src="https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav.jpg"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 991px) 74vw, 41vw"
                    srcSet="
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav-p-500.jpg   500w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav-p-800.jpg   800w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav-p-1080.jpg 1080w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav-p-1600.jpg 1600w,
                    https://cdn.prod.website-files.com/663cc5b081e30522b7cd88ac/6666de1cfad3168337745326_mantrav.jpg        2000w
                  "
                    alt=""
                    className="image-7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="soj-cta3">
        <div className="combine-container-small-4">
          <div className="combine-text-align-center-3">
            <div className="soj-bigtext-white font-sans">
              Together, let&#x27;s create lasting moments and embrace the joy of
              exploration.
            </div>
            <a
              href={`/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`}
              className="button-primary-big bg-primary w-button font-sans"
            >
              Explore
            </a>
          </div>
        </div>
      </section>
      <div className="section-regular grey">
        <div className="container-small">
          <div
            data-w-id="0314d801-392d-31f1-af4e-5260fa92cf04"
            className="title-wrap-center max-with-630"
          >
            <div className="margin-bottom-12">
              <div className="detail text-color-primary font-sans">
                about sojourn
              </div>
            </div>
            <h3 className="font-sans">Frequently asked questions</h3>
          </div>
          <div
            data-w-id="0314d801-392d-31f1-af4e-5260fa92cf0a"
            className="faq-wrap"
          >
            <div
              data-w-id="0314d801-392d-31f1-af4e-5260fa92cf0b"
              className="faq-block"
            >
              <div className="faq-header">
                <div className="paragraph-large font-sans">
                  How do I get started lorem ipsum dolor at?
                </div>
                <div className="filters-drop-down-wrap">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd896e_chevron-up.svg"
                    loading="lazy"
                    alt=""
                    className="plus-icon"
                  />
                </div>
              </div>
              <div className="faq-content">
                <p className="faq-paragraph font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus at dui mollis metus gravida tristique. Morbi semper
                  ornare euismod. Morbi magna urna, pulvinar ac massa ultricies,
                  molestie finibus sem. Sed facilisis velit nisi, non efficitur
                  nibh tincidunt at. Cras condimentum ante sit amet rutrum
                  euismod. Fusce porttitor ipsum consequat tortor feugiat varius
                  ac et ipsum. Quisque sed est non erat ultricies condimentum
                  sed quis nisi. Nullam rutrum sapien nec sapien venenatis,
                  vitae auctor elit malesuada. Nam feugiat enim a urna blandit
                  ullamcorper. Nunc purus urna, auctor quis aliquet eget,
                  consectetur quis metus.
                </p>
              </div>
            </div>
            <div
              data-w-id="0314d801-392d-31f1-af4e-5260fa92cf14"
              className="faq-block"
            >
              <div className="faq-header">
                <div className="paragraph-large font-sans">
                  How do I get started lorem ipsum dolor at?
                </div>
                <div className="filters-drop-down-wrap">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd896e_chevron-up.svg"
                    loading="lazy"
                    alt=""
                    className="plus-icon"
                  />
                </div>
              </div>
              <div className="faq-content">
                <p className="faq-paragraph font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus at dui mollis metus gravida tristique. Morbi semper
                  ornare euismod. Morbi magna urna, pulvinar ac massa ultricies,
                  molestie finibus sem. Sed facilisis velit nisi, non efficitur
                  nibh tincidunt at. Cras condimentum ante sit amet rutrum
                  euismod. Fusce porttitor ipsum consequat tortor feugiat varius
                  ac et ipsum. Quisque sed est non erat ultricies condimentum
                  sed quis nisi. Nullam rutrum sapien nec sapien venenatis,
                  vitae auctor elit malesuada. Nam feugiat enim a urna blandit
                  ullamcorper. Nunc purus urna, auctor quis aliquet eget,
                  consectetur quis metus.
                </p>
              </div>
            </div>
            <div
              data-w-id="0314d801-392d-31f1-af4e-5260fa92cf1d"
              className="faq-block"
            >
              <div className="faq-header">
                <div className="paragraph-large font-sans">
                  How do I get started lorem ipsum dolor at?
                </div>
                <div className="filters-drop-down-wrap">
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd896e_chevron-up.svg"
                    loading="lazy"
                    alt=""
                    className="plus-icon"
                  />
                </div>
              </div>
              <div className="faq-content">
                <p className="faq-paragraph font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus at dui mollis metus gravida tristique. Morbi semper
                  ornare euismod. Morbi magna urna, pulvinar ac massa ultricies,
                  molestie finibus sem. Sed facilisis velit nisi, non efficitur
                  nibh tincidunt at. Cras condimentum ante sit amet rutrum
                  euismod. Fusce porttitor ipsum consequat tortor feugiat varius
                  ac et ipsum. Quisque sed est non erat ultricies condimentum
                  sed quis nisi. Nullam rutrum sapien nec sapien venenatis,
                  vitae auctor elit malesuada. Nam feugiat enim a urna blandit
                  ullamcorper. Nunc purus urna, auctor quis aliquet eget,
                  consectetur quis metus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="later">
        <div className="container-regular">
          <div
            data-w-id="09b4561c-c985-dd18-c7e4-6d46f558a654"
            className="title-wrap-center about-one"
          >
            <div className="margin-bottom-16">
              <h3 className="font-sans">Contact us</h3>
            </div>
            <p className="paragraph-regular font-sans">
              Questions about Hireup? Get in touch and let us know how we can
              help.
            </p>
          </div>
          <div
            data-w-id="0031b683-4aef-bb66-79a7-f4a04ab4be72"
            className="w-layout-grid contact-us-grid about-one"
          >
            <div id="w-node-a681d0e8-a327-f6e8-1998-8a38a6660cf0-b7cd8927">
              <div
                id="w-node-a681d0e8-a327-f6e8-1998-8a38a6660cf1-b7cd8927"
                className="contact-image-wrap"
              >
                <img
                  src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd899e_Feature%20Image.webp"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="
                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd899e_Feature%2520Image-p-500.jpg 500w,
                  https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/663cc5b081e30522b7cd899e_Feature%20Image.webp        721w
                "
                  alt=""
                  className="image-cover"
                />
              </div>
              <div className="partnership-wrap">
                <div className="partnership-text-wrap">
                  <div className="font-sans">
                    Partnership with
                    <span className="header-company-span font-sans">
                      Glassdoor
                    </span>{" "}
                    and
                    <span className="header-company-span font-sans">
                      LinkedIn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
