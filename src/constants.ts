import {
  AlignVerticalSpaceAround,
  Beer,
  Church,
  Clapperboard,
  CookingPot,
  Plane,
  ShoppingCart,
  ShowerHead,
  Store,
  TreeDeciduous,
  Tv,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";

export const Backend_URL = "https://www.sojourn.ng";
// export const Backend_URL = "http://localhost:4000";
export const EMAIL_REGEX = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/;
export const REFRESH_TOKEN_KEY = "refresh_token";
export const ACCESS_TOKEN_KEY = "access_token";
export const CURRENT_ROLE_KEY = "app_current_role";

export const DUMMY_CITIES = [
  "Lagos",
  "Abuja",
  "Portharcourt",
  "AkwaIbom",
  "Delta",
  "Oyo",
  "Benin",
];

export const RECOMMENDED_CITIES = [
  "Lagos",
  "Abuja",
  "Portharcourt",
  "AkwaIbom",
  "Delta",
  "Oyo",
  "Benin",
];

export const HTTP_APP_STATE_PREFIX = "x-sojourn-app";

export const INSPECTION_FORM_STATES = {
  "section-1": "section-1",
  "section-2": "section-2",
  "section-3": "section-3",
  "section-4": "section-4",
  "section-5": "section-5",
  "section-6": "section-6",
  "section-7": "section-7",
};

export const BANKS = [
  { id: "1", name: "Access Bank", code: "044" },
  { id: "2", name: "Citibank", code: "023" },
  { id: "3", name: "Diamond Bank", code: "063" },
  { id: "4", name: "Dynamic Standard Bank", code: "" },
  { id: "5", name: "Ecobank Nigeria", code: "050" },
  { id: "6", name: "Fidelity Bank Nigeria", code: "070" },
  { id: "7", name: "First Bank of Nigeria", code: "011" },
  { id: "8", name: "First City Monument Bank", code: "214" },
  { id: "9", name: "Guaranty Trust Bank", code: "058" },
  { id: "10", name: "Heritage Bank Plc", code: "030" },
  { id: "11", name: "Jaiz Bank", code: "301" },
  { id: "12", name: "Keystone Bank Limited", code: "082" },
  { id: "13", name: "Providus Bank Plc", code: "101" },
  { id: "14", name: "Polaris Bank", code: "076" },
  { id: "15", name: "Stanbic IBTC Bank Nigeria Limited", code: "221" },
  { id: "16", name: "Standard Chartered Bank", code: "068" },
  { id: "17", name: "Sterling Bank", code: "232" },
  { id: "18", name: "Suntrust Bank Nigeria Limited", code: "100" },
  { id: "19", name: "Union Bank of Nigeria", code: "032" },
  { id: "20", name: "United Bank for Africa", code: "033" },
  { id: "21", name: "Unity Bank Plc", code: "215" },
  { id: "22", name: "Wema Bank", code: "035" },
  { id: "23", name: "Zenith Bank", code: "057" },
  { id: "24", name: "Opay Digital Services", code: "" },
];

export const EMMERGENCY_CONTACTS = [
  { type: "police", phone: "199" },
  { type: "Emergency (general)", phone: "112" },
  { type: "Ambulance", phone: "767" },
  { type: "Fire Department", phone: "01-7944929" },
  { type: "The Federal Road Safety Corps (FRSC)", phone: "122" },
  // { type: "Forest Fire", phone: "112" },
  // { type: "Mountain rescue", phone: "985" },
  // { type: "Emergency road number", phone: "981" },
  // { type: "Mental health emergency", phone: "116 123" },
];

export const HOST_PROPERTIES_MENU = [
  {
    text: "properties",
    link: "/hosts/dashboard/properties",
  },
  {
    text: "bookings",
    link: "/hosts/dashboard/bookings",
  },
  {
    text: "wallet",
    link: "/hosts/dashboard/wallet",
  },
  {
    text: "inbox",
    link: "/hosts/dashboard/inbox",
  },
  {
    text: "my plan",
    link: "/hosts/dashboard/my-plan",
  },
];

export const GUEST_SIDEBAR_MENU = [
  {
    text: "Home",
    link: "/",
  },

  {
    text: "bookings",
    link: "/dashboard/bookings",
  },
  {
    text: "wishlist",
    link: "/dashboard/wishlist",
  },
  {
    text: "wallet",
    link: "/dashboard/wallet",
  },
  {
    text: "inbox",
    link: "/dashboard/inbox",
  },
];

export const PROPERTY_TYPE_DESCRIPTIONS: { [x: string]: string } = {
  "prime-inn": `These are small private apartments or hotel rooms fully equipped with all the amenities required for a comfortable stay.`,
  "smart-share": `This type of accommodation is a shared space where guests have their own beds/room but share common areas like; Kitchen, balcony, living room.`,
  "town-house": `These are larger apartments or homes designed for short term stays or long-term stays (3-6 months).`,
};

export const SCHEDULE_TIMES = [10, 11, 12, 13, 14, 15, 16, 17, 18];

export const WHAT_IS_NEAR = [
  { text: "church", Icon: Church },
  { text: "park", Icon: TreeDeciduous },
  { text: "Market", Icon: Store },
  { text: "airport", Icon: Plane },
  { text: "Restaurant", Icon: UtensilsCrossed },
  { text: "mall", Icon: ShoppingCart },
  { text: "Bar/Club", Icon: Beer },
];

export const AMMENITIES = [
  { text: "kitchen", Icon: CookingPot },
  { text: "wi-fi", Icon: Wifi },
  { text: "cable Tv", Icon: Tv },
  { text: "shower", Icon: ShowerHead },
  { text: "home cinema", Icon: Clapperboard },
  { text: "car park", Icon: AlignVerticalSpaceAround },
  { text: "swimming pool", Icon: Waves },
];

export const SINGLE_PROPERTY_TITLE = ["title", "status", "type", "address"];

export const HOW_IT_WORKS = [
  {
    title: "Select a Destination",
    imageUrl: "/assets/imgs/location-image.png",
    list: [
      "Use our website to choose your desired destination.",
      "Use the street view to see the neighbourhood of desired destination.",
    ],
  },
  {
    title: "Choose an Apartment and Make a Reservation",
    imageUrl: "/assets/imgs/reservation.png",
    list: [
      "Select your preferred apartment based on your preferences.",
      // "Use the area view to move through the apartment to get more insight.",
      "Enter your desired dates and complete the reservation process.",
    ],
  },
  {
    title: "Payment Method",
    imageUrl: "/assets/imgs/payment.png",
    list: [
      "Choose your preferred payment method.",
      "We accept credit/debit cards, Sojourn credit, crypto.",
    ],
  },
  {
    title: "Enjoy your stay",
    imageUrl: "/assets/imgs/enjoy-stay.png",
    list: [
      "Upon confirmation, you'll receive check-in instructions via email.",
      "Arrive at your chosen apartment, check in smoothly, and start enjoying your stay!",
    ],
  },

  {
    title: "Check out",
    imageUrl: "/assets/imgs/checkout.png",
    list: [
      "Leave the apartment in the same condition as you found it.",
      "Use the check-out time extension option if you require a check-out time extension or contact support.",
    ],
  },

  {
    title: "Try it Out",
    imageUrl: "/assets/imgs/thumbs-up.png",
    list: [],
  },
];

// export const CITIES = ["lagos", "abuja", "port harcourt"];

export const CITIES = [
  {
    key: "lagos",
    value: "lagos",
  },
  {
    key: "abuja",
    value: "abuja",
  },
  {
    key: "Port Harcourt",
    value: "port harcourt",
  },
  { key: "Akwa Ibom", value: "akwa ibom" },
  {
    key: "Delta",
    value: "delta",
  },
  {
    key: "Oyo",
    value: "oyo",
  },
  {
    key: "Benin",
    value: "benin",
  },
];

export const WHY_HOST_WITH_SOJOURN = [
  {
    icon: "/assets/imgs/icons/earnings.svg",
    heading: "Maximize Your Earnings",
    text: "Earn competitive rates with our flexible pricing model and benefit from our large customer base.",
  },
  {
    icon: "/assets/imgs/icons/support.svg",
    heading: "24/7 Support",
    text: "Our dedicated support team is always available to assist you and your guests.",
  },
  {
    icon: "/assets/imgs/icons/tools.svg",
    heading: "Professional Tools",
    text: "Access our suite of professional tools to manage your listings, bookings, and payments efficiently.",
  },
  {
    icon: "/assets/imgs/icons/growth.svg",
    heading: "Growth Opportunities",
    text: "Expand your hosting business with our marketing support and property management insights.",
  },
];

export const PLANS = [
  {
    icon: "/assets/icons/paper-plane.png",
    iconWhite: "/assets/icons/paper-plane-white.svg",
    name: "Basic",
    price: {
      monthly: {
        id: "",
        amount: 0,
        type: "monthly",
      },
      annually: {
        id: "",
        amount: 0,
        type: "annually",
      },
    },
    desc: "Ideal for starting out",
    list: [
      "2% commission on bookings",
      "Up to 3 listings",
      "24/7 chat and email support",
    ],
  },
  {
    icon: "/assets/icons/aeroplane.png",
    iconWhite: "/assets/icons/paper-plane-white.svg",
    name: "Lite",
    price: {
      monthly: {
        id: "PLN_p2wo7ln2yju2h8y",
        amount: 35000,
        type: "monthly",
      },
      annually: {
        id: "PLN_h6xpbpqlj0trlxe",
        amount: 420000,
        type: "annually",
      },
    },
    desc: "Best value for growing business",
    list: [
      "No commision on bookings",
      "Up to 10 listings",
      "Enhanced visibility option",
      "24/7 chat and email support",
      "Analytics and insights",
      "Basic optimization kit",
      "Sojourn cover",
    ],
  },
  {
    icon: "/assets/icons/Rocket.svg",
    iconWhite: "/assets/icons/paper-plane-white.svg",
    name: "Premium",
    price: {
      monthly: {
        id: "PLN_36mz1l3oj2rg4vl",
        amount: 50000,
        type: "monthly",
      },
      annually: {
        id: "PLN_uqcwn2pugyzn19j",
        amount: 600000,
        type: "annually",
      },
    },
    desc: "Bespoke solution for luxury",
    list: [
      "No commision on bookings",
      "Unlimited listings",
      "Advanced visibility option",
      "24/7 chat and email support",
      "Analytics and support insights",
      "Premium optimization kit",
      "Sojourn cover",
    ],
  },
];

// interface Plan {
//   name: string;
//   desc: string;
//   monthlyPrice: number;
//   yearlyPrice: number;
//   yearlySavings: string;
//   popular?: boolean;
//   list: string[];
// }

interface Plan {
  name: string;
  desc: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlySavings: string;
  popular?: boolean;
  locked?: boolean;
  list: string[];
}

// export const PLANS: Plan[] = [
//   {
//     name: "Basic",
//     desc: "Perfect for getting started",
//     monthlyPrice: 4999,
//     yearlyPrice: 3999,
//     yearlySavings: "₦12,000",
//     list: [
//       "Up to 3 listings",
//       "Basic analytics",
//       "Standard support",
//       "Basic property tools",
//       "Standard visibility",
//     ],
//   },
//   {
//     name: "Professional",
//     desc: "Best value for growing business",
//     monthlyPrice: 9999,
//     yearlyPrice: 7999,
//     yearlySavings: "₦24,000",
//     popular: true,
//     list: [
//       "Up to 10 listings",
//       "Advanced analytics",
//       "Priority support",
//       "Professional tools suite",
//       "Enhanced visibility",
//       "Marketing assistance",
//       "Booking management",
//     ],
//   },
//   {
//     name: "Enterprise",
//     desc: "For large-scale operations",
//     monthlyPrice: 19999,
//     yearlyPrice: 15999,
//     yearlySavings: "₦48,000",
//     list: [
//       "Unlimited listings",
//       "Enterprise analytics",
//       "24/7 dedicated support",
//       "Full property management suite",
//       "Maximum visibility",
//       "Custom marketing campaigns",
//       "Advanced booking tools",
//       "API access",
//     ],
//   },
// ];

// export const PLANS: Plan[] = [
//   {
//     name: "Basic",
//     desc: "Perfect for getting started",
//     monthlyPrice: 0.0,
//     yearlyPrice: 0.0,
//     yearlySavings: "₦0,00",
//     list: [
//       "Up to 3 listings",
//       "Basic analytics",
//       "Standard support",
//       "Basic property tools",
//       "Standard visibility",
//     ],
//   },
//   {
//     name: "Professional",
//     desc: "Best value for growing business",
//     monthlyPrice: 0.0,
//     yearlyPrice: 0.0,
//     yearlySavings: "₦0",
//     popular: true,
//     locked: true,
//     list: [
//       "Up to 10 listings",
//       "Advanced analytics",
//       "Priority support",
//       "Professional tools suite",
//       "Enhanced visibility",
//       "Marketing assistance",
//       "Booking management",
//     ],
//   },
//   {
//     name: "Enterprise",
//     desc: "For large-scale operations",
//     monthlyPrice: 0.0,
//     yearlyPrice: 0.0,
//     yearlySavings: "₦0",
//     locked: true, // 👈 Add this
//     list: [
//       "Unlimited listings",
//       "Enterprise analytics",
//       "24/7 dedicated support",
//       "Full property management suite",
//       "Maximum visibility",
//       "Custom marketing campaigns",
//       "Advanced booking tools",
//       "API access",
//     ],
//   },
// ];

export const MONTHS_OF_THE_YEAR = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const EXPLORE_CITIES = {
  lagos: `
  Lagos is the heartbeat of Nigeria, offering a perfect blend of tradition and modernity. Known as the city that never sleeps, it boasts a vibrant nightlife, bustling markets, sandy beaches, and a rich cultural heritage. From the historic streets of Lagos Island to the upscale neighborhoods of Victoria Island and Lekki, the city has something for everyone. Whether you're drawn to its thriving arts scene or its reputation as the nation's commercial hub, Lagos is a city that inspires adventure and ambition.  
  `,
  abuja: `
  Nigeria's capital city, Abuja, is a masterpiece of modern planning and natural beauty. Known for its serene atmosphere, green landscapes, and iconic landmarks like Aso Rock and the National Mosque, it's the perfect destination for those seeking tranquility and elegance. The city's world-class infrastructure, diverse cuisines, and cultural charm make Abuja an excellent choice for both business and leisure. 
  `,
  portharcout: `Nicknamed "The Garden City," Port Harcourt is a thriving hub in Nigeria's oil-rich region. It offers visitors a unique mix of industrial growth and cultural vibrancy. From its rich culinary scene showcasing local delicacies to its energetic business environment, the city provides opportunities for both work and relaxation. Port Harcourt is truly a gem in southern Nigeria.`,
  akwa_ibom: `
  Akwa Ibom is a serene and culturally rich state in southern Nigeria, celebrated for its hospitality, clean environment, and delicious cuisine. Uyo, the state capital, is known for its well-planned layout and scenic beauty. From the stunning Ibeno Beach to cultural festivals like the Ibom Christmas celebration, Akwa Ibom offers a blend of leisure, tradition, and modern development. It’s a perfect spot for eco-tourism and cultural exploration.
  `,

  delta: `
  Delta State is a vibrant and diverse destination in the Niger Delta region, offering a captivating mix of urban life, natural landscapes, and cultural heritage. Asaba and Warri are key cities where modern amenities meet local traditions. Known for its riverine beauty, oil industry, and bustling marketplaces, Delta is a place where business and pleasure thrive side by side. Visitors can enjoy boat rides, cultural festivals, and a rich taste of southern Nigerian life.
  `,

  oyo: `
  Oyo State, steeped in history and culture, is the home of the ancient Oyo Empire and the vibrant city of Ibadan. As one of Nigeria’s largest cities, Ibadan is known for its academic institutions, historic landmarks like Cocoa House, and colorful markets. The state is a treasure trove of Yoruba heritage, with traditional festivals, palaces, and crafts that offer a deep dive into Nigerian culture and pride.
  `,

  benin: `
  Benin City, the capital of Edo State, is a city with a regal past and a rich artistic legacy. Known for its bronze works, royal palace, and deep-rooted traditions, Benin is one of Nigeria’s most historically significant cities. It offers visitors a unique journey through pre-colonial African history, vibrant markets, and a growing modern economy. Benin is a cultural powerhouse where the past and present blend seamlessly.
  `,
};
