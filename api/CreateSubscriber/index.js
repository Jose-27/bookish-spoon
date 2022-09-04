const { insertEntity } = require("../services/tableService");
module.exports = async function (context, req) {
    try {
        if(!req.body) {
            context.res = {
                status: 400,
                body: "Please pass a request body"
            };
            return;
        }

        const { 
            blog, 
            clientType,
            firstName, 
            lastName, 
            trackingId, 
            phoneNumber, 
            email,
            address1,
            address2,
            country,
            state,
            zipCode,
            senderRowKey
        } = req.body;

        if(!blog || !firstName || !lastName || !trackingId || !phoneNumber || !email || !senderRowKey) {
            context.res = {
                status: 400,
                body: "Please pass blog, firstName, lastName, phoneNumber, email"
            };
            return;
        }
        
        context.message = {};

        // A dynamic message can be set instead of the body in the output binding. The "To" number 
        // must be specified in code. 
        context.bindings.message = {
            body : 'Mary Cargo Express',
            to : `+${phoneNumber}`
        };

        const entity = {
            PartitionKey: {_: blog},
            RowKey: { _: new Date().getTime().toString() },
            firstName: {_: firstName },
            lastName: {_: lastName },
            clientType: {_: clientType },
            email: {_: email},
            phoneNumber: {_: phoneNumber},
            address1: {_: address1},
            address2: {_: address2},
            country: {_: country},
            state: {_: state},
            zipCode: {_: zipCode},
            trackingId: {_: trackingId},
            senderRowKey: {_: senderRowKey}
        }

        const result = await insertEntity("Post", entity);

        context.res = {
            body: result
        };

    } catch (error) {
        context.res = {
            status: 500, /* Defaults to 200 */
            body: error.message
        };
    }
}

