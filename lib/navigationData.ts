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
        href: '/residential',
        items: [
          { id: 'res-lighting', label: 'Lighting Automation', href: '/residential/lighting-automation' },
          { id: 'res-shades', label: 'Motorized Shades & Curtain Automation', href: '/residential/curtain-automation' },
          { id: 'res-complete', label: 'Complete Home Automation Solutions', href: '/residential/mdu-automation' },
          { id: 'res-av', label: 'Audio, Video Integration', href: '/residential/audio-video-automation' },
          { id: 'res-security', label: 'Security, Surveillance & Access Control', href: '/residential/security-automation' },
          { id: 'res-wifi', label: 'Wi-Fi, Networking & Smart Control Interfaces', href: '/residential/wifi-networking' },
        ]
      },
      {
        id: 'future-hospitality',
        label: 'Hospitality',
        href: '/hospitality',
        items: [
          { id: 'hosp-public', label: 'Public areas', href: '/hospitality/public-area-automation' },
          { id: 'hosp-boardroom', label: 'Boardroom and Meeting Room', href: '/hospitality/boardroom-automation' },
          { id: 'hosp-banquet', label: 'Banquet Halls & Event Spaces', href: '/hospitality/banquet-hall-automation' },
          { id: 'hosp-restaurants', label: 'Restaurants', href: '/hospitality/restaurant-automation' },
          { id: 'hosp-spa', label: 'Spa and Wellness', href: '/hospitality/spa-and-wellness' },
          { id: 'hosp-guest', label: 'Guest Rooms', href: '/hospitality/guest-room-automation' },
        ]
      },
      {
        id: 'future-commercial',
        label: 'Commercial',
        href: '/commercial',
        items: [
          { id: 'comm-restaurants', label: 'Restaurants', href: '/commercial/restaurant-automation' },
          { id: 'comm-offices', label: 'Offices', href: '/commercial/office-automation' },
          { id: 'comm-institutes', label: 'Institutes', href: '/commercial/institutes' },
          { id: 'comm-exhibitions', label: 'Exhibitions', href: '/commercial/exhibitions' },
          { id: 'comm-retail', label: 'Retail Stores', href: '/commercial/retail-automation' },
          { id: 'comm-multiplexes', label: 'Multiplexes', href: '/commercial/multiplexes' },
          { id: 'comm-airport', label: 'Airport Lounges', href: '/commercial/airport-lounges' },
        ]
      }
    ]
  },
  {
    id: 'disciplines',
    label: 'Disciplines',
    items: [
      { id: 'disc-lighting', label: 'Lighting Automation', href: '/disciplines/lighting-automation' },
      { id: 'disc-av', label: 'Audio Video Automation', href: '/disciplines/audio-video' },
      { id: 'disc-shades', label: 'Shades Automation', href: '/disciplines/shade-automation' },
      { id: 'disc-hvac', label: 'HVAC Automation', href: '/disciplines/hvac-automation' },
      { id: 'disc-security', label: 'Security Automation', href: '/disciplines/security-automation' },
      { id: 'disc-wifi', label: 'Wi-Fi & Networking', href: '/disciplines/wifi-automation' },
      { id: 'disc-amc', label: 'AMC', href: '/disciplines/amc' },
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
    label: 'Experience Centres',
    href: '/experience-center',
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
