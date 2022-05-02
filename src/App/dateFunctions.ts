const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const getToday = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export const formatMonth = (isoMonth: string) => {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[parseInt(month) - 1]} de ${year}`;
};

export const addMonths = (yearAndMonth: string, increment: number) => {
  const jsDate = new Date(yearAndMonth + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};
