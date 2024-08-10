interface Rules {
    [key: string]: string;
  }

  const rules: Rules = {
    "Parkering förbjuden": "No parking",
    "Avgift": "Fee required",
    "P-skiva": "Parking disc required",
    "Mån": "Monday",
    "Tis": "Tuesday",
    "Ons": "Wednesday",
    "Tor": "Thursday",
    "Fre": "Friday",
    "Lör": "Saturday",
    "Sön": "Sunday"
  };

  export const parseParkingRules = (text: string): string => {
    console.log(text);
    let result = '';
    for (const [key, value] of Object.entries(rules)) {
      if (text.includes(key)) {
        result += `${value}\n`;
      }
    }
    return result || 'Parking rules not identified';
  };
