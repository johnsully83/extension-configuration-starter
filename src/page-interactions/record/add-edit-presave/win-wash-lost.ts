/*
  this should be several interactions, some on JobOrder, some on Placement, i.e.
  
  Whenever a new requisition (job) is entered, hide the job.customFloat1 (# of Original Openings) field. Display it after save / existing requisitions.
    - this should be a field interaction when the job is new
  Whenever a new requisition (job) is entered, set job.customFloat1 (# of Original Openings) to the value in job.numOpenings (# of Openings).
    - this should be a field/page interaction on Job when the job is new
  Set job.customFloat1 (# of Original Openings) and customInt3 (Wins) to view only for all users on all job tracks.
    - field interaction on JobOrder, can be the same as the ones above
  Create a field interaction on Placement to run the following logic: 
  When Placement.status for the job changes to “Approved”,
  set job.customInt3 (Wins) to # job.customInt3 + 1
  set job.numOpenings to job.numOpenings - 1, if it does not result in a negative number.  
    - is this page interaction, minus the handful of initial lines around hiding/disabling customFloat1/customInt3
*/

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
  
