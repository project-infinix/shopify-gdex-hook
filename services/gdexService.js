const axios = require('axios')

const gdexAPIEndpoint = process.env.GDEX_ENDPOINT
const gdexAPItoken = process.env.GDEX_API_TOKEN
const gdexSubscriptionKey = process.env.GDEX_SUBSCRIPTION_KEY

const createConsignmentNote = async (orderId, total_value, total_weight, itemsTitleString1, itemsTitleString2, shipping) => {
  const headers = {
    "Content-Type": "application/json",
    "ApiToken": gdexAPItoken,
    "Subscription-key": gdexSubscriptionKey
  }

  // itemsTitleString is concanated list of items' title
  // GDEX request allows note1 and note2 with limitation of 50 characters/note
  const requestBody = [
    {
      "shipmentType": "Parcel",
      "totalPiece": 1,
      "shipmentValue": total_value,
      "shipmentWeight": total_weight,
      "note1": itemsTitleString1,
      "note2": itemsTitleString2,
      "orderID": orderId,
      "receiverName": `${shipping.first_name} ${shipping.last_name}`,
      "receiverMobile": shipping.phone.replace(/\s/g, "").replace("-",""),
      "receiverAddress1": shipping.address1,
      "receiverAddress2": shipping.address2,
      "receiverPostcode": shipping.zip,
      "receiverCity": shipping.city,
      "receiverState": shipping.province,
      "receiverCountry": shipping.country,
    }
  ]

  return await axios.post(`${gdexAPIEndpoint}/CreateConsignment`, requestBody, {headers})
    .then(() => {
      console.log(`Expected to have successfully created a consignment note on Gdex for order #${orderId}`)
    })
    .catch((error) => {
      console.log(`Failed to create consignment note for order #${orderId} with attempted request body:`)
      console.log(requestBody)
      console.log(error)
    })
}

module.exports = { createConsignmentNote }