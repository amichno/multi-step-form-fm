export const STEPS = [
  { id: 1, label: "Your info" },
  { id: 2, label: "Select plan" },
  { id: 3, label: "Add-ons" },
  { id: 4, label: "Summary" },
];

export const PLANS = [
  { id: "arcade", name: "Arcade", priceMonthly: 9, priceYearly: 90, icon: "arcade", color: "bg-orange-400" },
  { id: "advanced", name: "Advanced", priceMonthly: 12, priceYearly: 120, icon: "advanced", color: "bg-rose-500" },
  { id: "pro", name: "Pro", priceMonthly: 15, priceYearly: 150, icon: "pro", color: "bg-indigo-600" },
];

export const ADDONS = [
  {
    id: "online-service",
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    id: "larger-storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    id: "customizable-profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
];
