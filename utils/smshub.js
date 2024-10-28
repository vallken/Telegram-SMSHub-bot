import user from "./smsModel.js";
import axios from "axios";
import fs from "fs";

const loadData = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

const Fetching = (url) => axios.get(url).then(response => response.data);

const apiUrl = (action, params) => `https://smshub.org/stubs/handler_api.php?${new URLSearchParams({ ...params, action })}`;

async function getNumber(apiKey, country, service) {
  const url = apiUrl('getNumber', { api_key: apiKey, service, operator: 'any', country, maxPrice: 1, currency: 840 });
  const data = await Fetching(url);
  return data.includes("ACCESS_NUMBER") ? data.split(":") : data;
}

async function cancelAction(apiKey, ID) {
  const url = apiUrl('setStatus', { api_key: apiKey, status: 8, id: ID });
  return Fetching(url);
}

async function getBalance(userId) {
  const User = await user.findOne({ userId });
  if (!User?.apiKey) return "Invalid API Key"
  
  const url = apiUrl('getBalance', { api_key: User.apiKey, currency: 840 });
  const data = await Fetching(url);
  return data.includes("ACCESS_BALANCE") ? data.split(":")[1] : "Invalid API Key";
}

async function getStatus(apiKey, ID) {
  const url = apiUrl('getStatus', { api_key: apiKey, id: ID });
  const data = await Fetching(url);
  if (data.includes("STATUS_WAIT_CODE")) return "Waiting for status code";
  if (data.includes("STATUS_OK")) return data.split(":")[1];
  return data;
}

const dataService = loadData("./utils/service.json");
const dataCountry = loadData("./utils/country.json");

const getCountry = (countryCode) => dataCountry.find(item => item.ID === countryCode)?.Name || null;
const getService = (id) => dataService.find(item => item.ID.toLowerCase() === id.toLowerCase())?.Name || null;

const checkData = (array, id) => array.some(item => item.ID.toLowerCase() === id.toLowerCase());
const checkCountry = (country) => checkData(dataCountry, country);
const checkService = (serviceName) => checkData(dataService, serviceName);

const searchInArray = (array, query) => array.filter(item => item.Name.toLowerCase().includes(query.toLowerCase()));
const searchCountry = (query) => searchInArray(dataCountry, query);
const searchService = (query) => searchInArray(dataService, query);

export {
  getBalance,
  searchService,
  getNumber,
  checkService,
  cancelAction,
  getService,
  getStatus,
  getCountry,
  checkCountry,
  searchCountry
};
