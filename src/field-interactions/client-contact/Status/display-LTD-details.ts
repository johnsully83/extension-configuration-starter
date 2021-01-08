// this interaction should be in the folder /field-interactions/placement, as it is now if you were to deploy this repository it would deploy to ClientContact.status
const interaction: FieldInteraction = {
    fieldName: 'Status',// case sensitivity matters here, should be 'status'
    name: 'display-LTD-details',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {

        init: () => {
          
          const placementId = API.currentEntityId;
          if(API.isEdit) {
            API.appBridge.httpGet('/entity/Placement/${placementId}?fields=candidate(customText2,secondaryAddress)').then( response => {
              const candidate=response.data.data.candidate;

              if(candidate.secondaryAddress!=null) {
                
                API.displayToast( {
                    message: "Limited Company Name:" + candidate.customText2 + "\nLimited Company Address:" + candidate.secondaryAddress,
                    icon: 'caution',
                    theme: 'danger',
                    position: 'fixedTop',
                    isCloseable: true,
                    hideDelay: -1  
                })

              }

            })
          }
 
        },
  

      };
  
      return myClient.init();
  
    },
  };
  
  export default interaction;
  
