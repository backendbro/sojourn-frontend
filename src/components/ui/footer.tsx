import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="w-full min-h-96">
//       <div className="w-full min-h-full bg-[#2C2C2C]  py-14 px-10  text-white grid  sm:grid-cols-4 sm:py-8 sm:px-20">
//         <div className="flex flex-col py-8">
//           <h4 className="font-[700] text-[18px] mb-3 sm:uppercase sm:text-gray-500">
//             Support
//           </h4>
//           <ul className="w-full flex flex-col space-y-3 overflow-x-hidden list-none">
//             <li>
//               <Link href="/privacy-policy">Privacy policy</Link>
//             </li>
//             <li>
//               <Link href="/cookie-policy">Cookie policy</Link>
//             </li>
//             <li>
//               <Link href="/terms-of-use">Terms of use</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="flex flex-col py-8">
//           <h4 className="font-[700] text-[18px] mb-3  sm:uppercase sm:text-gray-500">
//             Company
//           </h4>
//           <ul className="w-full flex flex-col space-y-3 overflow-x-hidden list-none">
//             <li>
//               <Link href="/Linkbout-us">About us</Link>
//             </li>
//             <li>
//               <Link href="/become-a-partner">Become a Partner</Link>
//             </li>
//             <li>
//               <Link href="/careers">Careers</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="flex flex-col mb-14 py-8 sm:col-span-2">
//           <h4 className="font-[700] text-[18px] mb-6  sm:uppercase sm:text-gray-500">
//             Connect with Us
//           </h4>
//           <div className="flex items-center space-x-3">
//             <FacebookIcon size={32} />
//             <TwitterIcon size={32} />
//             <InstagramIcon size={32} />
//           </div>
//         </div>
//         <div className="flex items-center space-x-3 sm:border-t sm:border-t-white sm:col-span-4 sm:py-20 sm:mt-10">
//           <Image
//             src="/assets/logo/sojourn-logo-white.svg"
//             alt="sojourn logo"
//             width={148.13}
//             height={69.06}
//             priority={true}
//           />
//           <span>&copy;2023</span>
//         </div>
//       </div>
//     </footer>
//   );
// };
// export default Footer;

const Footer = () => {
  return (
    <div className="footer-section bg-primary ">
      <div
        data-w-id="27694c21-cbfc-58f0-1e5c-e47458f6d8b6"
        className="container-regular"
      >
        <div className="footer-grid flex justify-center">
          <a href="/" className="footer-logo-link w-inline-block">
            <img
              src="/assets/logo/soj_white.svg"
              loading="lazy"
              alt="Brand"
              className="footer-logo"
            />
          </a>
          <div className="w-layout-grid footer-left-column">
            <div className="footer-column">
              <div className="margin-bottom-16">
                <div className="detail text-white">Support</div>
              </div>
              <a href="/privacy-policy" className="footer-link">
                Privacy policy
              </a>
              <a href="/terms-of-use" className="footer-link">
                Terms of use
              </a>
              <Link className="footer-link" href="/safety">
                Safety
              </Link>
            </div>
            <div className="footer-column">
              <div className="margin-bottom-16">
                <div className="detail text-white">Company</div>
              </div>
              <a
                href="/about-us"
                aria-current="page"
                className="footer-link w--current"
              >
                About Us
              </a>
              <a href="/become-a-host" className="footer-link">
                Become a host
              </a>
              <a href="/contact-us" className="footer-link">
                Contact Us
              </a>
              <a href="/deals-and-offers" className="footer-link">
                Deals and Offers
              </a>
            </div>
            <div className="footer-column">
              <div className="margin-bottom-16">
                <div className="detail text-white">Connect with us</div>
              </div>
              <div className="footer-social-links">
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  className="footer-social-link w-inline-block"
                >
                  <div className="footer-social w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M17.0182 24.0853C19.0728 23.8239 20.9508 22.7899 22.2705 21.1935C23.5901 19.5971 24.2524 17.5582 24.1227 15.491C23.993 13.4239 23.0811 11.4837 21.5722 10.0648C20.0634 8.64585 18.0708 7.85471 15.9996 7.85215C13.9259 7.8506 11.9296 8.63981 10.4175 10.0589C8.90538 11.4781 7.99127 13.4204 7.86141 15.4901C7.73156 17.5597 8.39572 19.601 9.71858 21.1981C11.0414 22.7951 12.9234 23.8276 14.9811 24.0853V18.0373H12.9441V16.0003H14.9811V14.3157C14.9811 12.9539 15.1237 12.4599 15.3885 11.9619C15.6494 11.4691 16.0526 11.0663 16.5456 10.8059C16.9346 10.5971 17.4184 10.4718 18.2638 10.4178C18.5989 10.3964 19.0328 10.4229 19.5655 10.4993V12.4345H19.0552C18.1212 12.4345 17.7352 12.4783 17.505 12.6015C17.3677 12.6721 17.2558 12.784 17.1852 12.9213C17.063 13.1515 17.0182 13.3796 17.0182 14.3146V16.0003H19.5645L19.0552 18.0373H17.0182V24.0853ZM15.9996 26.1855C10.3744 26.1855 5.81445 21.6256 5.81445 16.0003C5.81445 10.375 10.3744 5.81511 15.9996 5.81511C21.6249 5.81511 26.1848 10.375 26.1848 16.0003C26.1848 21.6256 21.6249 26.1855 15.9996 26.1855Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  className="footer-social-link w-inline-block"
                >
                  <div className="footer-social w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M19.3607 9.43027C18.5866 9.43014 17.8434 9.73391 17.291 10.2762C16.7386 10.8185 16.4212 11.556 16.407 12.33L16.3785 13.9342C16.3769 14.0203 16.357 14.1051 16.3202 14.183C16.2835 14.2609 16.2307 14.3302 16.1653 14.3863C16.0999 14.4423 16.0234 14.4839 15.9408 14.5084C15.8581 14.5328 15.7713 14.5395 15.6859 14.528L14.096 14.312C12.004 14.0268 9.99954 13.0633 8.07658 11.4612C7.4675 14.8325 8.65713 17.168 11.5222 18.9697L13.3016 20.088C13.3861 20.1412 13.4564 20.2142 13.5061 20.3008C13.5559 20.3873 13.5837 20.4848 13.5872 20.5846C13.5906 20.6843 13.5695 20.7835 13.5257 20.8732C13.482 20.963 13.4169 21.0406 13.3362 21.0994L11.7147 22.284C12.6793 22.3441 13.5949 22.3013 14.3547 22.1505C19.1601 21.1911 22.3552 17.5754 22.3552 11.6109C22.3552 11.1241 21.3244 9.43027 19.3607 9.43027ZM14.37 12.2923C14.3878 11.3105 14.6948 10.3558 15.2526 9.54762C15.8104 8.73948 16.5942 8.11385 17.5059 7.74907C18.4176 7.38428 19.4167 7.29655 20.378 7.49686C21.3393 7.69717 22.2202 8.17662 22.9103 8.87518C23.6344 8.87008 24.2507 9.05342 25.6287 8.21823C25.2875 9.8886 25.1194 10.6138 24.3922 11.6109C24.3922 19.3944 19.6082 23.1792 14.754 24.1479C11.4255 24.8119 6.58546 23.7211 5.19824 22.2728C5.90509 22.2178 8.77732 21.9092 10.4375 20.6941C9.03297 19.7682 3.44232 16.4784 7.11611 7.6336C8.84047 9.64721 10.5893 11.0181 12.3615 11.7454C13.5409 12.2292 13.8302 12.219 14.371 12.2933L14.37 12.2923Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </a>
                <Link
                  href="https://www.instagram.com/sojourn.ng"
                  target="_blank"
                  prefetch
                  className="footer-social-link w-inline-block"
                >
                  <div className="footer-social w-embed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M15.9996 12.9447C15.1893 12.9447 14.4121 13.2667 13.839 13.8397C13.266 14.4127 12.9441 15.1899 12.9441 16.0003C12.9441 16.8107 13.266 17.5879 13.839 18.1609C14.4121 18.7339 15.1893 19.0559 15.9996 19.0559C16.81 19.0559 17.5872 18.7339 18.1602 18.1609C18.7333 17.5879 19.0552 16.8107 19.0552 16.0003C19.0552 15.1899 18.7333 14.4127 18.1602 13.8397C17.5872 13.2667 16.81 12.9447 15.9996 12.9447ZM15.9996 10.9077C17.3503 10.9077 18.6456 11.4442 19.6006 12.3993C20.5557 13.3543 21.0922 14.6497 21.0922 16.0003C21.0922 17.3509 20.5557 18.6463 19.6006 19.6013C18.6456 20.5563 17.3503 21.0929 15.9996 21.0929C14.649 21.0929 13.3537 20.5563 12.3986 19.6013C11.4436 18.6463 10.907 17.3509 10.907 16.0003C10.907 14.6497 11.4436 13.3543 12.3986 12.3993C13.3537 11.4442 14.649 10.9077 15.9996 10.9077ZM22.62 10.6531C22.62 10.9907 22.4859 11.3146 22.2471 11.5533C22.0084 11.7921 21.6845 11.9262 21.3469 11.9262C21.0092 11.9262 20.6854 11.7921 20.4466 11.5533C20.2078 11.3146 20.0737 10.9907 20.0737 10.6531C20.0737 10.3154 20.2078 9.99158 20.4466 9.75282C20.6854 9.51406 21.0092 9.37992 21.3469 9.37992C21.6845 9.37992 22.0084 9.51406 22.2471 9.75282C22.4859 9.99158 22.62 10.3154 22.62 10.6531ZM15.9996 7.85215C13.4798 7.85215 13.0683 7.85928 11.896 7.91122C11.0975 7.94891 10.5618 8.05585 10.0647 8.24937C9.62269 8.42048 9.3039 8.6252 8.96473 8.96539C8.64594 9.27339 8.40083 9.64941 8.24769 10.0654C8.05418 10.5645 7.94723 11.0992 7.91056 11.8967C7.8576 13.0211 7.85149 13.4143 7.85149 16.0003C7.85149 18.5201 7.85862 18.9316 7.91056 20.1039C7.94825 20.9014 8.05519 21.4382 8.24769 21.9342C8.42084 22.3772 8.62455 22.696 8.96269 23.0342C9.30593 23.3764 9.62473 23.5811 10.0627 23.7502C10.5658 23.9447 11.1016 24.0527 11.896 24.0894C13.0205 24.1423 13.4136 24.1484 15.9996 24.1484C18.5195 24.1484 18.9309 24.1413 20.1032 24.0894C20.8997 24.0517 21.4365 23.9447 21.9335 23.7522C22.3745 23.5801 22.6954 23.3754 23.0335 23.0372C23.3768 22.694 23.5815 22.3752 23.7506 21.9372C23.9441 21.4351 24.052 20.8983 24.0887 20.1039C24.1417 18.9795 24.1478 18.5863 24.1478 16.0003C24.1478 13.4805 24.1407 13.069 24.0887 11.8967C24.051 11.1002 23.9441 10.5624 23.7506 10.0654C23.5971 9.64983 23.3524 9.27396 23.0345 8.96539C22.7267 8.64643 22.3506 8.4013 21.9345 8.24835C21.4355 8.05483 20.8997 7.94789 20.1032 7.91122C18.9788 7.85826 18.5857 7.85215 15.9996 7.85215ZM15.9996 5.81511C18.767 5.81511 19.1122 5.82529 20.198 5.87622C21.2827 5.92715 22.0211 6.09724 22.6709 6.34983C23.3432 6.60854 23.9095 6.95891 24.4757 7.52418C24.9937 8.03334 25.3944 8.64923 25.6501 9.329C25.9017 9.97779 26.0728 10.7172 26.1237 11.802C26.1716 12.8877 26.1848 13.233 26.1848 16.0003C26.1848 18.7676 26.1746 19.1129 26.1237 20.1986C26.0728 21.2834 25.9017 22.0218 25.6501 22.6716C25.3951 23.3517 24.9943 23.9678 24.4757 24.4764C23.9664 24.9941 23.3506 25.3949 22.6709 25.6508C22.0221 25.9023 21.2827 26.0734 20.198 26.1244C19.1122 26.1722 18.767 26.1855 15.9996 26.1855C13.2323 26.1855 12.887 26.1753 11.8013 26.1244C10.7166 26.0734 9.97816 25.9023 9.32834 25.6508C8.6483 25.3956 8.0323 24.9948 7.52353 24.4764C7.00552 23.9673 6.60475 23.3514 6.34918 22.6716C6.09658 22.0228 5.92649 21.2834 5.87556 20.1986C5.82769 19.1129 5.81445 18.7676 5.81445 16.0003C5.81445 13.233 5.82464 12.8877 5.87556 11.802C5.92649 10.7162 6.09658 9.97881 6.34918 9.329C6.60405 8.64881 7.0049 8.03275 7.52353 7.52418C8.03245 7.00599 8.64841 6.6052 9.32834 6.34983C9.97816 6.09724 10.7156 5.92715 11.8013 5.87622C12.887 5.82835 13.2323 5.81511 15.9996 5.81511Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#" className="footer-logo-link w-inline-block">
            <img
              src="/assets/logo/soj_white.svg"
              loading="lazy"
              alt="Brand"
              className="footer-logo"
            />
          </a>
          <div className="footer-link-copy">
            © {new Date().getUTCFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
