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

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top area: grid on md+, stacked on small */}
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" aria-label="Home" className="mb-4 inline-block">
              <img
                src="/assets/logo/soj_white.svg"
                alt="Sojourn"
                loading="lazy"
                className="w-36 h-auto"
              />
            </Link>
            <p className="text-sm max-w-xs">
              Simple stays, local hosts — book and earn with ease. Need help?
              Check our support links or contact us.
            </p>
          </div>

          {/* Support & Company links grouped vertically on mobile */}
          <div className="flex flex-col sm:flex-row sm:gap-8 justify-center md:justify-start">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <nav className="flex flex-col text-sm space-y-1">
                <Link href="/privacy-policy" className="block hover:underline">
                  Privacy policy
                </Link>
                <Link href="/terms-of-use" className="block hover:underline">
                  Terms of use
                </Link>
                <Link href="/safety" className="block hover:underline">
                  Safety
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <nav className="flex flex-col text-sm space-y-1">
                <Link href="/about-us" className="block hover:underline">
                  About Us
                </Link>
                <Link href="/become-a-host" className="block hover:underline">
                  Become a host
                </Link>
                <Link href="/contact-us" className="block hover:underline">
                  Contact Us
                </Link>
                <Link
                  href="/deals-and-offers"
                  className="block hover:underline"
                >
                  Deals & Offers
                </Link>
              </nav>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-white font-semibold mb-3">Connect with us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                {/* Facebook-like svg (kept your original) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="block"
                >
                  <path
                    d="M17.0182 24.0853C19.0728 23.8239 20.9508 22.7899 22.2705 21.1935C23.5901 19.5971 24.2524 17.5582 24.1227 15.491C23.993 13.4239 23.0811 11.4837 21.5722 10.0648C20.0634 8.64585 18.0708 7.85471 15.9996 7.85215C13.9259 7.8506 11.9296 8.63981 10.4175 10.0589C8.90538 11.4781 7.99127 13.4204 7.86141 15.4901C7.73156 17.5597 8.39572 19.601 9.71858 21.1981C11.0414 22.7951 12.9234 23.8276 14.9811 24.0853V18.0373H12.9441V16.0003H14.9811V14.3157C14.9811 12.9539 15.1237 12.4599 15.3885 11.9619C15.6494 11.4691 16.0526 11.0663 16.5456 10.8059C16.9346 10.5971 17.4184 10.4718 18.2638 10.4178C18.5989 10.3964 19.0328 10.4229 19.5655 10.4993V12.4345H19.0552C18.1212 12.4345 17.7352 12.4783 17.505 12.6015C17.3677 12.6721 17.2558 12.784 17.1852 12.9213C17.063 13.1515 17.0182 13.3796 17.0182 14.3146V16.0003H19.5645L19.0552 18.0373H17.0182V24.0853ZM15.9996 26.1855C10.3744 26.1855 5.81445 21.6256 5.81445 16.0003C5.81445 10.375 10.3744 5.81511 15.9996 5.81511C21.6249 5.81511 26.1848 10.375 26.1848 16.0003C26.1848 21.6256 21.6249 26.1855 15.9996 26.1855Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                {/* Twitter-like svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M19.3607 9.43027C18.5866 9.43014 17.8434 9.73391 17.291 10.2762C16.7386 10.8185 16.4212 11.556 16.407 12.33L16.3785 13.9342..."
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/sojourn.ng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              >
                {/* Instagram-like svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M15.9996 12.9447C15.1893 12.9447 14.4121 13.2667 13.839 13.8397C13.266 14.4127 12.9441 15.1899 12.9441 16.0003..."
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="mt-6 border-t border-white/20 pt-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Home" className="inline-block">
              <img
                src="/assets/logo/soj_white.svg"
                alt="Sojourn"
                className="w-28 h-auto"
              />
            </Link>
            <span className="text-sm opacity-90">
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="text-sm opacity-90">
            Built with care ·{" "}
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
