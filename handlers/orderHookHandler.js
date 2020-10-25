const gdexService = require('../services/gdexService')

const created = (event, context, callback) => {
  try {
    const order = JSON.parse(event.body)
    const orderId = order.name
    const shipping = order.shipping_address
    const items = order.line_items.map(({title, variant_title, quantity, price, grams}) => ({title, variant_title, quantity, price, grams}))

    let title = (items.map(a => a.title)).filter((elem, index, self) => {return index === self.indexOf(elem)}).join(', ')
    const totalValue = items.reduce((a, {quantity, price}) => a+(quantity*price), 0)
    const totalWeightInKg = items.reduce((a, {quantity, grams}) => a+(quantity*grams), 0) / 1000

    if(title.length > 100) {
      title = `${title.substring(0, 98)}..`
    }

    console.log(`orderHookHandler:`)
    console.log(order)
    console.log("----------------------")
    console.log(shipping)
    gdexService.createConsignmentNote(
      orderId,
      totalValue,
      totalWeightInKg,
      title.substring(0, 50),
      title.substring(50, 100),
      shipping
    )
  } catch(error) {
    console.log(`Received order body:`)
    console.log(event.body)
    console.log(`Failed to create a consigment note on GDEX for Shopify`)
    console.log(error)
  } finally {
    callback(null, {statusCode: 200})
  }
}

module.exports = { created }