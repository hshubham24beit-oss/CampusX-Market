// src/utils/validators.js
import { COLLEGE_EMAIL_DOMAIN } from "./constants";

export const isValidCollegeEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  return email.trim().toLowerCase().endsWith(COLLEGE_EMAIL_DOMAIN.toLowerCase());
};

export const isValidPassword = (password) => {
  if (!password || typeof password !== "string") return false;
  return password.length >= 6;
};

export const isValidPhone = (phone) => {
  if (!phone) return true; // Optional field in some places
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^[6-9]\d{9}$/.test(cleaned);
};
