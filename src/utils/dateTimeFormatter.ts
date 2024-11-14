export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date
      .toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "short",
      })
      .replace(/\.$/, ""); // Tar bort eventuell punkt i slutet
  }
  return dateString;
};

export const formatTime = (timeString: string): string => {
  let cleanedTime = timeString.replace(/[^0-9.]/g, "");
  const parts = cleanedTime.split(".");

  // Behåll max två siffror efter punkten
  if (parts.length > 1) {
    cleanedTime = parts[0] + "." + parts[1].slice(0, 2);
  } else {
    // Lägg till punkt efter två siffror om punkt ej finns
    if (cleanedTime.length > 2) {
      cleanedTime = cleanedTime.slice(0, 2) + "." + cleanedTime.slice(2, 4);
    }
  }

  return cleanedTime;
};
