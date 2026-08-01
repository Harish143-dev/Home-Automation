export interface NavLink {
  id: string;
  label: string;
  href?: string;
  items?: NavLink[];
}

export const MAIN_NAVIGATION: NavLink[] = [
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
  },
  {
    id: 'future-of',
    label: 'The Future of',
    items: [
      {
        id: 'future-residential',
        label: 'Residential',
        items: [
          { id: 'res-lighting', label: 'Lighting Automation', href: '/lighting-automation' },
          { id: 'res-shades', label: 'Motorized Shades & Curtain Automation', href: '/curtain-automation' },
          { id: 'res-complete', label: 'Complete Home Automation Solutions', href: '/residential' },
          { id: 'res-av', label: 'Audio, Video Integration', href: '/audio-video-automation' },
          { id: 'res-security', label: 'Security, Surveillance & Access Control', href: '/security-automation' },
          { id: 'res-wifi', label: 'Wi-Fi, Networking & Smart Control Interfaces', href: '/wifi-networking' },
        ]
      },
      {
        id: 'future-hospitality',
        label: 'Hospitality',
        items: [
          { id: 'hosp-public', label: 'Public areas', href: '/public-area-automation' },
          { id: 'hosp-boardroom', label: 'Boardroom and Meeting Room', href: '/boardroom-automation' },
          { id: 'hosp-banquet', label: 'Banquet Halls & Event Spaces', href: '/banquet-hall-automation' },
          { id: 'hosp-restaurants', label: 'Restaurants', href: '#hosp-restaurants' },
          { id: 'hosp-spa', label: 'Spa and Wellness', href: '#hosp-spa' },
          { id: 'hosp-guest', label: 'Guest Rooms', href: '#hosp-guest' },
        ]
      },
      {
        id: 'future-commercial',
        label: 'Commercial',
        items: [
          { id: 'comm-restaurants', label: 'Restaurants', href: '#comm-restaurants' },
          { id: 'comm-offices', label: 'offices', href: '#comm-offices' },
          { id: 'comm-institutes', label: 'Institutes', href: '#comm-institutes' },
          { id: 'comm-exhibitions', label: 'Exhibitions', href: '#comm-exhibitions' },
          { id: 'comm-retail', label: 'Retail Stores', href: '#comm-retail' },
          { id: 'comm-multiplexes', label: 'Multiplexes', href: '#comm-multiplexes' },
          { id: 'comm-airport', label: 'Airport Lounges', href: '#comm-airport' },
        ]
      }
    ]
  },
  {
    id: 'disciplines',
    label: 'Disciplines',
    items: [
      { id: 'disc-lighting', label: 'Lighting Automation', href: '/lighting-automation' },
      { id: 'disc-av', label: 'Audio Video Automation', href: '/audio-video-automation' },
      { id: 'disc-shades', label: 'Shades Automation', href: '/curtain-automation' },
      { id: 'disc-hvac', label: 'HVAC Automation', href: '#hvac' },
      { id: 'disc-security', label: 'Security Automation', href: '/security-automation' },
      { id: 'disc-amc', label: 'AMC', href: '#amc' },
    ]
  },
  {
    id: 'work',
    label: 'Work',
    items: [
      { id: 'work-residential', label: 'Residential Projects', href: '#work-residential' },
      { id: 'work-hospitality', label: 'Hospitality Projects', href: '#work-hospitality' },
      { id: 'work-commercial', label: 'Commercial Projects', href: '#work-commercial' },
    ]
  },
  {
    id: 'experience',
    label: 'Experience',
    items: [
      { id: 'exp-delhi', label: 'Delhi', href: '#exp-delhi' },
      { id: 'exp-mumbai', label: 'Mumbai', href: '#exp-mumbai' },
      { id: 'exp-bangalore', label: 'Bangalore', href: '#exp-bangalore' },
    ]
  },
  {
    id: 'energy-saving',
    label: 'Energy Saving',
    href: '#energy-saving',
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { id: 'res-blogs', label: 'Blogs', href: '/blog' },
      { id: 'res-case', label: 'Case Studies', href: '#case-studies' },
      { id: 'res-pub', label: 'Publications', href: '#publications' },
    ]
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '/contact',
  }
];
