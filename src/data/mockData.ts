export const CURRENT = {
  aqi: 287,
  category: "POOR" as const,
  pm25: 168,
  pm10: 294,
  o3: 42,
  nox: 61,
  co: 1.8,
  temperature: 24,
  humidity: 82,
  windSpeed: 2.1,
  windDir: "NW",
  pblHeight: 420,
  inversion: "STRONG" as const,
  surfaceTemp: 18,
  temp850m: 23,
  invStrength: 5.0,
  pressure: 1013,
  stability: "Very Stable",
  updated: "20:42 IST",
};

export const FORECAST_72H = [
  { t: "Now",  h: 0,  aqi: 287, pm25: 168, pm10: 294, o3: 42, nox: 61, lo: 272, hi: 305 },
  { t: "+6H",  h: 6,  aqi: 308, pm25: 181, pm10: 312, o3: 38, nox: 65, lo: 289, hi: 331 },
  { t: "+12H", h: 12, aqi: 322, pm25: 196, pm10: 331, o3: 35, nox: 68, lo: 299, hi: 349 },
  { t: "+18H", h: 18, aqi: 368, pm25: 218, pm10: 370, o3: 30, nox: 74, lo: 341, hi: 398 },
  { t: "+24H", h: 24, aqi: 401, pm25: 240, pm10: 398, o3: 28, nox: 81, lo: 370, hi: 436 },
  { t: "+30H", h: 30, aqi: 418, pm25: 252, pm10: 415, o3: 26, nox: 85, lo: 382, hi: 456 },
  { t: "+36H", h: 36, aqi: 428, pm25: 261, pm10: 427, o3: 24, nox: 88, lo: 388, hi: 471 },
  { t: "+42H", h: 42, aqi: 412, pm25: 248, pm10: 410, o3: 27, nox: 82, lo: 372, hi: 455 },
  { t: "+48H", h: 48, aqi: 365, pm25: 215, pm10: 371, o3: 31, nox: 73, lo: 328, hi: 403 },
  { t: "+54H", h: 54, aqi: 335, pm25: 196, pm10: 342, o3: 35, nox: 67, lo: 299, hi: 370 },
  { t: "+60H", h: 60, aqi: 318, pm25: 183, pm10: 324, o3: 38, nox: 62, lo: 282, hi: 354 },
  { t: "+66H", h: 66, aqi: 295, pm25: 170, pm10: 302, o3: 41, nox: 58, lo: 260, hi: 328 },
  { t: "+72H", h: 72, aqi: 276, pm25: 158, pm10: 281, o3: 44, nox: 54, lo: 243, hi: 308 },
];

export const ATTRIBUTION = [
  { driver: "Strong temperature inversion", pct: 34, color: "#f97316" },
  { driver: "Low PBL height",              pct: 27, color: "#ef4444" },
  { driver: "Weak surface winds",          pct: 21, color: "#eab308" },
  { driver: "Regional plume transport",    pct: 11, color: "#e879f9" },
  { driver: "High relative humidity",      pct:  7, color: "#38bdf8" },
];

export const HOTSPOTS = [
  {
    rank: 1, name: "Anand Vihar",   zone: "East Delhi",
    aqi: 365, fcast: 448, delta: 23, risk: "SEVERE" as const,
    drivers: ["Low PBL", "Traffic", "Regional transport"],
    cx: 382, cy: 234,
  },
  {
    rank: 2, name: "Ghaziabad",     zone: "NCR East",
    aqi: 341, fcast: 421, delta: 19, risk: "VERY POOR" as const,
    drivers: ["Industrial", "Low PBL", "Weak winds"],
    cx: 420, cy: 210,
  },
  {
    rank: 3, name: "Noida Sec 62",  zone: "NCR SE",
    aqi: 298, fcast: 377, delta: 16, risk: "VERY POOR" as const,
    drivers: ["Construction dust", "Transport", "Inversion"],
    cx: 400, cy: 268,
  },
  {
    rank: 4, name: "Wazirpur",      zone: "North Delhi",
    aqi: 312, fcast: 381, delta: 22, risk: "VERY POOR" as const,
    drivers: ["Industrial cluster", "Low wind", "PBL compression"],
    cx: 308, cy: 196,
  },
  {
    rank: 5, name: "Gurugram",      zone: "NCR South",
    aqi: 276, fcast: 334, delta: 21, risk: "POOR" as const,
    drivers: ["Traffic", "Dust", "Boundary layer"],
    cx: 262, cy: 300,
  },
];

export const INVERSION_SERIES = [
  { t: "00:00", str: 2.1, pbl: 680 },
  { t: "02:00", str: 3.2, pbl: 520 },
  { t: "04:00", str: 4.1, pbl: 460 },
  { t: "06:00", str: 5.0, pbl: 420 },
  { t: "08:00", str: 5.8, pbl: 375, peak: true },
  { t: "10:00", str: 4.2, pbl: 510 },
  { t: "12:00", str: 2.5, pbl: 820 },
  { t: "14:00", str: 1.2, pbl: 1240 },
  { t: "16:00", str: 1.8, pbl: 960 },
  { t: "18:00", str: 3.4, pbl: 540 },
  { t: "20:00", str: 4.6, pbl: 440 },
  { t: "22:00", str: 5.2, pbl: 400 },
  { t: "+00:00", str: 5.8, pbl: 372, forecast: true },
  { t: "+02:00", str: 6.4, pbl: 342, forecast: true },
  { t: "+04:00", str: 7.1, pbl: 310, forecast: true, peak: true },
  { t: "+06:00", str: 6.8, pbl: 330, forecast: true, peak: true },
  { t: "+08:00", str: 5.9, pbl: 370, forecast: true },
  { t: "+10:00", str: 4.5, pbl: 490, forecast: true },
  { t: "+12:00", str: 2.9, pbl: 750, forecast: true },
];

export const VALIDATION = [
  { t: "-72H", obs: 210, pred: 198 },
  { t: "-66H", obs: 225, pred: 218 },
  { t: "-60H", obs: 242, pred: 235 },
  { t: "-54H", obs: 258, pred: 252 },
  { t: "-48H", obs: 271, pred: 264 },
  { t: "-42H", obs: 265, pred: 270 },
  { t: "-36H", obs: 248, pred: 255 },
  { t: "-30H", obs: 235, pred: 240 },
  { t: "-24H", obs: 259, pred: 262 },
  { t: "-18H", obs: 278, pred: 271 },
  { t: "-12H", obs: 282, pred: 279 },
  { t: "-6H",  obs: 285, pred: 282 },
  { t: "Now",  obs: 287, pred: 287 },
];

export const SCENARIOS = [
  { name: "Scenario A", label: "Current conditions",       peak: 428, color: "#ef4444", wind: 2.1, humid: 82, pbl: 420, emis: 100 },
  { name: "Scenario B", label: "Wind +2 m/s",              peak: 351, color: "#38bdf8", wind: 4.1, humid: 82, pbl: 420, emis: 100 },
  { name: "Scenario C", label: "Regional emissions +30%",  peak: 469, color: "#e879f9", wind: 2.1, humid: 82, pbl: 420, emis: 130 },
  { name: "Scenario D", label: "Stronger inversion",       peak: 452, color: "#f97316", wind: 2.1, humid: 82, pbl: 300, emis: 100 },
];

export const STATIONS: { name: string; aqi: number; cx: number; cy: number }[] = [
  { name: "Anand Vihar",   aqi: 365, cx: 382, cy: 234 },
  { name: "Wazirpur",      aqi: 312, cx: 308, cy: 196 },
  { name: "Ghaziabad",     aqi: 341, cx: 420, cy: 210 },
  { name: "Noida Sec 62",  aqi: 298, cx: 400, cy: 268 },
  { name: "Gurugram",      aqi: 276, cx: 262, cy: 300 },
  { name: "Faridabad",     aqi: 288, cx: 332, cy: 320 },
  { name: "Dwarka",        aqi: 261, cx: 252, cy: 258 },
  { name: "IHBAS",         aqi: 295, cx: 356, cy: 216 },
  { name: "Punjabi Bagh",  aqi: 278, cx: 288, cy: 228 },
  { name: "RK Puram",      aqi: 253, cx: 298, cy: 264 },
];

export const NOTIFICATIONS = [
  {
    id: 1, severity: "critical" as const,
    time: "20:42", title: "Plume arrival risk elevated",
    body: "Regional PM2.5 transport toward Delhi NCR has strengthened. Estimated arrival in 10 hours. Confidence 78%.",
    read: false,
  },
  {
    id: 2, severity: "warning" as const,
    time: "19:15", title: "Inversion layer deepening",
    body: "PBL height dropped to 420 m. Strong inversion expected to persist through 09:00 tomorrow.",
    read: false,
  },
  {
    id: 3, severity: "warning" as const,
    time: "18:30", title: "AQI forecast updated",
    body: "Predicted peak AQI revised upward to 428 due to improved emissions estimate from Punjab.",
    read: false,
  },
  {
    id: 4, severity: "info" as const,
    time: "17:00", title: "Model run completed",
    body: "72-hour coupled forecast updated. Next run scheduled at 23:00 IST.",
    read: true,
  },
];

export const AQI_COLOR = (aqi: number): string => {
  if (aqi <= 50)  return "#22c55e";
  if (aqi <= 100) return "#84cc16";
  if (aqi <= 200) return "#eab308";
  if (aqi <= 300) return "#f97316";
  if (aqi <= 400) return "#ef4444";
  return "#9333ea";
};

export const AQI_LABEL = (aqi: number): string => {
  if (aqi <= 50)  return "GOOD";
  if (aqi <= 100) return "SATISFACTORY";
  if (aqi <= 200) return "MODERATE";
  if (aqi <= 300) return "POOR";
  if (aqi <= 400) return "VERY POOR";
  return "SEVERE";
};
