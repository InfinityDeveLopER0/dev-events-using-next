export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "ReactConf 2026",
    image: "/images/event1.png",
    slug: "reactconf-2026",
    location: "San Francisco, CA",
    date: "2026-07-15",
    time: "09:00",
  },
  {
    title: "JSConf 2026",
    image: "/images/event2.png",
    slug: "jsconf-2026",
    location: "Berlin, Germany",
    date: "2026-08-20",
    time: "10:00",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event3.png",
    slug: "hackmit-2026",
    location: "Cambridge, MA",
    date: "2026-09-12",
    time: "08:00",
  },
  {
    title: "KubeCon North America 2026",
    image: "/images/event4.png",
    slug: "kubecon-na-2026",
    location: "Los Angeles, CA",
    date: "2026-10-26",
    time: "09:00",
  },
  {
    title: "PyCon US 2027",
    image: "/images/event5.png",
    slug: "pycon-us-2027",
    location: "Salt Lake City, UT",
    date: "2027-05-12",
    time: "08:30",
  },
  {
    title: "RustConf 2026",
    image: "/images/event6.png",
    slug: "rustconf-2026",
    location: "Austin, TX",
    date: "2026-11-04",
    time: "09:00",
  },
  {
    title: "GraphQL Summit 2026",
    image: "/images/event-full.png",
    slug: "graphql-summit-2026",
    location: "New York, NY",
    date: "2026-06-22",
    time: "09:30",
  },
];
