export interface Location {
  country: string;
  cities: string[];
}

export const locations: Location[] = [
  {
    country: 'South Korea',
    cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Sejong', 'Suwon', 'Changwon', 'Goyang', 'Yongin', 'Bucheon', 'Cheonan', 'Ansan']
  },
  {
    country: 'United States', 
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco']
  },
  {
    country: 'Japan',
    cities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama', 'Hiroshima', 'Sendai', 'Kitakyushu', 'Chiba', 'Sakai']
  },
  {
    country: 'China',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xian', 'Hangzhou', 'Chongqing', 'Harbin', 'Suzhou', 'Dalian', 'Qingdao', 'Jinan']
  },
  {
    country: 'United Kingdom',
    cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester', 'Wakefield', 'Coventry', 'Nottingham', 'Newcastle', 'Belfast']
  },
  {
    country: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Geelong', 'Hobart', 'Townsville', 'Cairns', 'Darwin']
  },
  {
    country: 'Canada',
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Mississauga', 'Winnipeg', 'Quebec City', 'Hamilton', 'Brampton', 'Surrey', 'Laval', 'Halifax', 'London']
  },
  {
    country: 'Germany',
    cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg']
  },
  {
    country: 'France',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon']
  },
  {
    country: 'Thailand',
    cities: ['Bangkok', 'Nonthaburi', 'Pak Kret', 'Hat Yai', 'Chiang Mai', 'Phuket', 'Pattaya', 'Nakhon Ratchasima', 'Udon Thani', 'Surat Thani', 'Khon Kaen', 'Rayong', 'Chonburi', 'Lampang', 'Songkhla']
  }
];

export function getCitiesByCountry(countryName: string): string[] {
  const location = locations.find(loc => loc.country === countryName);
  return location ? location.cities : [];
}

export function searchCountries(query: string): string[] {
  if (!query) return [];
  
  const matches = locations
    .map(loc => loc.country)
    .filter(country => 
      country.toLowerCase().includes(query.toLowerCase())
    );
  
  return matches.slice(0, 5);
}

export function searchCities(query: string, selectedCountry?: string): string[] {
  if (!query) return [];
  
  let citiesToSearch: string[] = [];
  
  if (selectedCountry) {
    citiesToSearch = getCitiesByCountry(selectedCountry);
  } else {
    citiesToSearch = locations.flatMap(loc => loc.cities);
  }
  
  const matches = citiesToSearch.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );
  
  return matches.slice(0, 8);
}