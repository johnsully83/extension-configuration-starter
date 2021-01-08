const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'win-wash-lost',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {
          
            init: () => {
                const status =  form.value.status;

                API.setValue('customFloat1',API.getValue('numOpenings'));
                
                API.hide('customFloat1');                       
                API.disable('customFloat1');
                API.disable('customInt3');

                
                // one thing to keep in mind here is the user may not have changed the status to Approved, so we may want to get the old value of status via the API
              // e.g. this should probably be 
              /*
               const oldStatus = appBridge.....// get status of Placement via API
               
               if (oldStatus !== 'Approved' && status === 'Approved') ...rest of code
              */
                if(status==='Approved') {//httpGET, not httpGet
                    return API.appBridge.httpGet('/entity/Placement/${API.currentEntityId}?fields=jobOrder(id,customInt3,numOpenings)').then(response => {
                        
                        API.setValue('customInt3',response.jobOrder.customInt3 + 1),
                        API.setValue('numOpenings',response.jobOrder.numOpenings - 1);

                        return API.appBridge.httpPOST('/entity/JobOrder/${response.data.data.id}', {
                            numOpenings: response.data.data.numOpenings
                        })
                    })
                } else {
                    return Promise.resolve();
                }
 
                
            },
         
        };

        // need the check for if entity === 'Placement'!
        return myClient.init();
        
    },
  };
  
  export default interaction;
  
