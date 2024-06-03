// Import the Axios library
import axios from "axios";

// Create an instance of Axios with a base URL
const myAxios = axios.create({
  // Specify the base URL for your requests
  baseURL: "https://k9xqsxsf3p.us-east-1.awsapprunner.com",
});

// Export the configured Axios instance as the default export
export default myAxios;
