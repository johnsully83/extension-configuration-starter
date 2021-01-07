/*
  This file has the same problems as 
  https://github.com/johnsully83/extension-configuration-starter/blob/master/src/page-interactions/record/add-edit-presave/validate-number-of-submissions.ts
  
  e.g. we should be handling the returned Promise from 'getEligibility', and the URL for the query (passed into appBridge.httpGET) should have ?fields=candidate(customText1)
  
  Also of note is that case matters in the fields parameter, candidate needs to be lowercase.
  
  Finally the returned object from getEligibility won't be the value of candidate.customText1, it will be a wrapper object.  We would need something like
  
  myClient.getEligibility(userId).then(response => {
      var elig = response.data.data.candidate.customText1;
      ...rest of the code goes here
    });
*/

const interaction: PageInteraction = {
    action: 'add-edit-presave',
    enabled: true,
    name: 'validate-number-of-submissions',
    page: 'record',
    sortOrder: 0,
    script: (API: PageInteractionAPI, form) => {
      
        const myClient =  {

            init: () => {
                
                var userId = form.submissions.userid;

                var elig = myClient.getEligibility(userId);

                if(elig === 'Pending' || elig === 'Suspended')
                {
                    form.valid = false;
                    form.errorMessage = 'Eligibility status requires review.';
                }

                else {
                    form.valid= true;
                }

            },

            
            getEligibility: (userId) => {

                var eligibilty = API.appBridge.httpGET('/entity/JobSubmission/${userId}?Candidate(customText1)')
                return eligibilty;
            }

        };

        if(API.currentEntity === 'JobSubmission')
        {
            return myClient.init();
        }
    },
  };
  
  export default interaction;
  
