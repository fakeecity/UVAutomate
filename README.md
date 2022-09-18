# <img src="/uvautomate-extension/public/icons/uva48.png" width="48" align="left"> UVAutomate
Extension and Serverless Functions for the Automation of UVA's Netbadge

> # Components
> **[Serverless Secret Generator](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/lambda-onboarding)** *(100%)*
> - Ran as Serverless Function on AWS Lambda (Connected to UVAutomate API Gateway)
> - Used in the onboarding flow, takes in string from decoded QR code and stores plaintext secret
>
> **[Serverless HOTP Code Generator](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/lambda-auth)** *(100%)*
> - Ran as Serverless Function on AWS Lambda (Connected to UVAutomate API Gateway)
> - Called during login, fetches secret from DDB and returns current iterative HOTP
>
> **[Extension](https://github.com/Alpha-Iota-Omega/UVAutomate/tree/main/uvautomate-extension)** *(100%)*
> - Responsible for making calls to API, injecting script into login page and verifying successful login
> - Stores only client API key, username, and password LOCALLY
> - user/pass are **NEVER** transmitted from client

> # TODO
> - Increase Efficiency
> - Port for Use in Other Duo Applications