// this interaction should be in the field-interactions/client-corporation folder
// as it is now it wll be deployed to ClientContact.customText19
const interaction: FieldInteraction = {
    fieldName: 'customText19',
    name: 'copy-details',
    event: 'change',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        change: () => {
          const customText19 = API.getValue('customText19');

          if(customText19!==undefined) {// capital httpGET
              API.appBridge.httpGet('/entity/ClientContact/${customText19.id}?fields=email,phone').then( response => {
                // in this case the value of customText19 is likely to just be the ID itself...it's the kind of thing you'd want to test out
                // so instead of ${customText19.id} i believe it would be just ${customText19}
                API.setValue('customText18 ',response.data.data.email);
                API.setValue('customText20 ',response.data.data.phone);
                
              })

          } else {
              API.setValue('customText18 ','');
              API.setValue('customText20','');
              

          }
          
          
 
        },
  

      };
  
      return myClient.change();
  
    },
  };
  
  export default interaction;
  
