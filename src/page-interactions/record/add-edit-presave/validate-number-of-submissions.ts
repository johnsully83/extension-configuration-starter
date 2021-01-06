const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'validate-number-of-submissions',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {

          
            init: () => {
                const jobOrderId = form.jobOrder.id;

                var max = myClient.getMaxSubmissions(jobOrderId);
                var num = myClient.queryNumberOfSubmissions(jobOrderId);//need to be handling the return Promise from both of these function calls here.  should look something like the below
                /*
                return myClient.getMaxSubmissions(jobOrderId).then(response => {
                    const max = response.data.data.customText9;
                    
                    return myClient.queryNumberOfSubmissions(jobOrderId).then(response => {
                      const num = response.data.total; // here we use that total property referenced below
                      
                        ...the rest of your code would go in here and should behave fine
                        
                        return form;// finally return the form in the promise to resolve it
                    });
                })
                */
                if(num < max)
                {
                    form.valid =  true;
                }

                else {
                    form.valid = false;
                    form.errorMessage = 'We have reached the maximum number of submissions that the Facility allows.';
                }
                
            },

            
            getMaxSubmissions: (jobOrderId) => {
                var maxSub = API.appBridge.httpGET('/entity/JobOrder/?clientCorporation(customText9)');
                //  URL should be `/entity/JobOrder/${jobOrderId}?fields=clientCorporation(customText9)`
                return maxSub;
            },

            queryNumberOfSubmissions: (jobOrderId) => {
                const where = 'jobOrder.id = ${jobOrderId}';

                var numSub = API.appBridge.httpGET('/query/JobSubmissions?where=${where}&fields=id')// JobSubmission should be singular in the URL, `/query/JobSubmission...`
                // also you want to pass &showTotalMatched=true so the /query operation returns a 'total' property representing the total number of records
                return numSub;
            }
        };

        if(API.currentEntity === 'JobSubmission')
        {
            return myClient.init();
        }
    },
  };
  
  export default interaction;
  
