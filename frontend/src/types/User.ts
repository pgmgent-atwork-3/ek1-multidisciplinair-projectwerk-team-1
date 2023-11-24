type User = {
  id: number;
  attributes: {
    stamNr: string;
    voornaam: string;
    achternaam: string;
    username: string;
    straat: string;
    huisNr: string;
    postcode: string;
    gemeente: string;
    telefoon: string;
    land: string;
    gsm: string;
    email: string;
    role: string;
  };
};

type UserUpdate = {
  id: number;
  stamNr: string;
  voornaam: string;
  achternaam: string;
  username: string;
  straat: string;
  huisnummer: string;
  postcode: string;
  gemeente: string;
  telefoon: string;
  land: string;
  gsm: string;
  email: string;
};
