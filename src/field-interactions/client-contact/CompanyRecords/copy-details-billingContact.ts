// this interaction should be in the field-interactions/client-corporation folder
// as it is now the deploy would fail as ClientContact.billingContact is not a field
const interaction: FieldInteraction = {
    fieldName: 'billingContact',
    name: 'copy-details',
    event: 'change',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        change: () => {
          const billingContact = API.getValue('billingContact');

          if(billingContact!==undefined) {// capital httpGET
              API.appBridge.httpGet('/entity/ClientContact/${billingContact.id}?fields=address,email,phone').then( response => {
                API.setValue('customTextBlock3 ',response.data.data.email);
                API.setValue('billingPhone ',response.data.data.phone);
                API.setValue('billingAddress',response.data.data.address);
                // the spec didn't mention this, but address is an object like the below...we would need to format the address into a string
                // { address1: 'a value', address2: 'a value', city: 'city', state: 'state', zip: 'zip' }
              })

          } else {
              API.setValue('customTextBlock3 ','');
              API.setValue('billingPhone ','');
              API.setValue('billingAddress','');

          }
          
          
 
        },
  

      };
  
      return myClient.change();
  
    },
  };
  
  export default interaction;
  
