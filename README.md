# Project Infinix
This project specifically handle hooks from Shopify store. \
Features:
- Integrate order creation hook to GDEX on creating consignment note

## Credential
### GDex
 - API Token: https://myprime.gdexpress.com/apitoken
 - Subscription Key: https://myopenplatform.gdexpress.com/developer

## Development
### Local
`sls offline -s dev`

## Deployment
`export GDEX_PROD_API=?; sls deploy -s production`