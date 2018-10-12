# okta-org2org
2 applications that demonstrate org2org SSO with Okta

# Getting Started
```
# Ensure correct node version and install
nvm use
npm i
npm run bootstrap

# Run both apps simultaneously
npm run dev

# Hub is running on http://localhost:3000
# Spoke is running on http://localhost:3001
```

# Scenarios
## From Spoke, go to a specific resource in hub
In this scenario, a user logs into the Spoke application and then via a single link can access a specific resource in the Hub application.

- Go to http://localhost:3001
- Login with sconnolly+oktaspoke@tangogroup.com (login will hang so you need to refresh)
- Click `Go to Hub Other`
- You should see a page with `Hub: Other` as its header and a message that says you are logged in as sconnolly+oktaspoke@tangogroup.com
