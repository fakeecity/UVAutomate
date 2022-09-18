# <img src="/uvautomate-extension/public/icons/uva48.png" width="45" align="left"> UVAutomate
Extension and Serverless Functions for the Automation of UVA's Netbadge

> # Components
> **[Serverless Secret Generator](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/lambda-logsecret)** *(100%)*
> - Ran as Serverless Function on AWS Lambda (Connected to UVAutomate API Gateway)
> - Used in the onboarding flow, takes in string from decoded QR code and stores base32 encoded secret
>
> **[Serverless HOTP Code Generator](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/lambda-codegen)** *(100%)*
> - Ran as Serverless Function on AWS Lambda (Connected to UVAutomate API Gateway)
> - Called during login, fetches secret from DDB and returns current iterative HOTP
>
> **[Extension](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/chrome-plugin)** *(~90%)*
> - Responsible for making calls to API, injecting script into login page and verifying successful login
> - Stores only client API key, username, and password LOCALLY
> - user/pass are **NEVER** transmitted from client

> # TODO
> - Troubleshoot Login
> - Increase Efficiency
> - Port for Use in Other Duo Applications