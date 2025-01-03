# Crypto Dashboard

Welcome to the Crypto Dashboard project! This project is built using Vite with React 18. It provides a dashboard to view cryptocurrency prices, details, and trends using data from the CoinGecko API.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Features

- View cryptocurrency prices and market data.
- Search for cryptocurrencies by name.
- View detailed information for each cryptocurrency.
- Responsive design for mobile and desktop users.
- Searching and sorting the cryptos as required.

 
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (>= 14.0.0)
- [npm](https://www.npmjs.com/) (>= 6.0.0)

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/bipan1/crypto-dashboard.git
   ```
   
2. Navigate to the project directory:

   ```sh
   cd crypto-dashboard
   ```

3. Install the dependencies:

    ```sh
    npm install
    ```
### Usage
Set up the environment variables:

Create a .env file in the root of the project and add the following line:

```sh
VITE_API_BASE_URL="https://api.coingecko.com/api/v3"
VITE_API_KEY="YOUR_API_KEY"
```
Here if you don't want to use the API_KEY then you can remove the ```sh x_cg_api_key : import.meta.env.VITE_API_KEY``` from the params of the api request in CryptoService.ts file. 


Run the development server:
  
  ```sh
  npm run dev
  ```
Open your browser and navigate to http://localhost:5173 to see the app in action.

### Environment Variables
This project requires the following environment variables:

VITE_API_BASE_URL: The base URL for the CoinGecko API.

Ensure you create a .env file in the root of the project and add the required variables.
