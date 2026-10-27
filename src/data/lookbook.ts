export interface LookbookItem {
  id: string;
  image: string;
  timestamp: string;
  title: string;
  location: string;
  focalObject: string;
  span: string; // Tailwind grid span for asymmetry
}

export const lookbookItems: LookbookItem[] = [
  {
    id: "lb-01",
    image: "/assets/lookbook/01.webp",
    timestamp: "02:14",
    title: "Denim jacket on hook",
    location: "Chișinău platform 3",
    focalObject: "Platform Selvedge Jacket",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "lb-02",
    image: "/assets/lookbook/02.webp",
    timestamp: "02:38",
    title: "Compact camera on strap",
    location: "Night station bench",
    focalObject: "Silver CCD Camera & Braided Strap",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lb-03",
    image: "/assets/lookbook/03.webp",
    timestamp: "03:02",
    title: "Wired earbuds & transit card",
    location: "Turnstile rail",
    focalObject: "Wired Earbuds & Canvas Pouch",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lb-04",
    image: "/assets/lookbook/04.webp",
    timestamp: "03:29",
    title: "Washed denim cap",
    location: "Concrete perimeter",
    focalObject: "Washed Gray Dusk Cap",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "lb-05",
    image: "/assets/lookbook/05.webp",
    timestamp: "03:55",
    title: "Heavyweight cotton tee flat",
    location: "Cold tile floor",
    focalObject: "Static Tee 260 GSM",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "lb-06",
    image: "/assets/lookbook/06.webp",
    timestamp: "04:12",
    title: "Fleece hoodie with photocard",
    location: "Subway exit 4",
    focalObject: "Hook Hoodie & Stash Pocket",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lb-07",
    image: "/assets/lookbook/07.webp",
    timestamp: "04:36",
    title: "Wide-leg trousers on asphalt",
    location: "Terminal ramp",
    focalObject: "Transit Trousers Twill",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lb-08",
    image: "/assets/lookbook/08.webp",
    timestamp: "05:01",
    title: "Canvas tote & carabiner set",
    location: "First train interior",
    focalObject: "Pocket Set Hardware",
    span: "md:col-span-2 md:row-span-1",
  },
];
