declare module "@paystack/inline-js";
declare module "is-online";
declare module "@splidejs/react-splide" {
  import { ReactNode } from "react";

  export interface SplideProps {
    options?: any;
    hasTrack?: boolean;
    children?: ReactNode;
    [key: string]: any;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<any>;
  // Add more components/types as needed
}
