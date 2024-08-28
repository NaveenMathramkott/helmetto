import banner01 from "../assets/banner01.png";
import banner02 from "../assets/banner02.png";
import banner03 from "../assets/banner03.png";
import banner04 from "../assets/banner04.png";

export const PRICE_DATA = [
  {
    id: 1,
    name: "All",
    range: [0, 100000],
  },
  {
    id: 2,
    name: "₹ 0-2000",
    range: [0, 2000],
  },
  {
    id: 3,
    name: "₹ 2000-4000",
    range: [2000, 4000],
  },
  {
    id: 4,
    name: "₹ 4000-6000",
    range: [4000, 6000],
  },
  {
    id: 5,
    name: "₹ 6000 or more",
    range: [6000, 100000],
  },
];

export const CAROUSEL_DATA = [
  {
    id: 1,
    source: banner03,
  },
  {
    id: 2,
    source: banner02,
  },
  {
    id: 3,
    source: banner01,
  },
  {
    id: 4,
    source: banner04,
  },
];
