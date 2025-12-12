export const MOCK_PATIENT = {
  name: "Ahmad bin Abdullah",
  id: "850212-14-XXXX",
  dob: "12 Feb 1985",
  age: 40,
  gender: "Male",
  bloodType: "O+",
  contactInfo: {
    phone: "+60 12-345 6789",
    email: "ahmad.abd@gmail.com",
    address: "No 15, Jalan Harmoni, 53000 KL"
  },
  biometrics: {
    height: "175", 
    weight: "70"   
  },
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Hypertension", "Asthma (Mild)"],
  okuStatus: "OKU-1",
  medications: [
    { name: "Amlodipine", dosage: "5mg daily", purpose: "Blood Pressure" },
    { name: "Salbutamol Inhaler", dosage: "As needed", purpose: "Asthma" }
  ],
  emergencyContacts: [
    { name: "Aminah (Mother)", phone: "+60 12-345 6789" },
    { name: "Abdullah (Father)", phone: "+60 19-876 5432" }
  ],
  insurance: {
    provider: "Takaful Malaysia",
    policyNo: "TM-99887766",
    coverage: "Full Hospitalization"
  },
  history: [
    { date: "15 Oct 2024", facility: "Hospital Kuala Lumpur", type: "Check-up", summary: "Routine cardiac screening." },
    { date: "03 Mar 2024", facility: "Klinik Mediviron", type: "Acute", summary: "Mild asthma attack treated." }
  ],
  vaccinations: [
      { name: "COVID-19 Booster", date: "Jan 2023" },
      { name: "Tetanus", date: "Jun 2020" }]
};

