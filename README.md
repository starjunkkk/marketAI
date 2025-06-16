# MarketAI

MarketAI is a full-stack application that combines AI technology with WhatsApp for market analysis and business automation.

> ⚠️ **Project Status**: Prototype
> 
> This project is in its early development stage (prototype). Some features may not be fully functional or are still experimental. We greatly appreciate feedback and contributions for further development.

## 🔄 External API Dependencies

This project relies on several external APIs that need to be configured:

- **WhatsApp Business API**: For WhatsApp integration
- **OpenAI API**: For AI analysis features (optional)
- **Market API**: For real-time market data (optional)

> 📝 **Note**: Some features may require valid API keys. Please check each API's documentation for more information.

## 🔑 API Key Acquisition Guide

### 1. WhatsApp Business API (Twilio)
1. Create an account at [Twilio](https://www.twilio.com/try-twilio)
2. Verify your account with phone number and email
3. In the Twilio dashboard, select "Messaging" > "Try it out" > "Send a WhatsApp message"
4. Follow the guide to activate WhatsApp Sandbox
5. Get your Account SID and Auth Token from the dashboard
6. Add to your `.env` file:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

### 2. OpenAI API
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or login if you already have one
3. Click "API Keys" in the sidebar
4. Click "Create new secret key"
5. Name your API key
6. Copy the generated API key
7. Add to your `.env` file:
   ```
   OPENAI_API_KEY=your_api_key
   ```
> ⚠️ **Note**: OpenAI API is paid. You'll get free credits upon registration, but you'll need to add a payment method for continued usage.

### 3. Market API (Optional)
Depending on your needs, you can use one of the following services:

#### Alpha Vantage
1. Visit [Alpha Vantage](https://www.alphavantage.co/)
2. Register for a free API key
3. Add to your `.env` file:
   ```
   ALPHA_VANTAGE_API_KEY=your_api_key
   ```

#### Yahoo Finance API
1. Visit [Yahoo Finance API](https://www.yahoofinanceapi.com/)
2. Register for an API key
3. Add to your `.env` file:
   ```
   YAHOO_FINANCE_API_KEY=your_api_key
   ```

## 🚀 Features

- WhatsApp integration for business communication
- Market analysis using AI
- Interactive dashboard
- RESTful API for data management

## 🛠️ Technologies

### Frontend
- React.js
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- WhatsApp Web.js

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WhatsApp Business API (optional)
- API keys for external services used

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/marketAI.git
cd marketAI
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configuration
- Create `.env` file in the server directory based on `.env.example`
- Obtain required API keys from respective services
- Adjust configuration as needed

4. Run the application
```bash
# Run server
cd server
npm run dev

# Run client
cd client
npm run dev
```

## ⚠️ Current Limitations

- Some features may require additional configuration
- Performance may vary depending on external API availability
- Some AI features may require additional costs for API usage

## 📝 License

This project is licensed under the [MIT License](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for discussion.

## 📧 Contact

For questions and support, please open an issue on GitHub. 