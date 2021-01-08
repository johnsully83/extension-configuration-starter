const interaction: FieldInteraction = {
    fieldName: 'customDate1',
    name: 'disable-field',
    event: 'init',
    sortOrder: 0,
    invokeOnInit: true,
    script: (API: FieldInteractionAPI) => {
      
      const myClient = {
  
        //adminUserTypeId: parseInt(  "${admin.user.type.id}"),
        adminUserTypeId: "104816",
  
        init: () => {
            const userTypeId = API.globals.user.userTypeId;

            if(userTypeId!==myClient.adminUserTypeId)// only this to watch out for here is the !== as opposed to !=...I believe API.globals.user.userTypeId is a number (the comment you made above would solve this)
            {
                API.disable('customDate1');
            }
          
        },
  
      };
  
      return myClient.init();
  
    },
  };
  
  export default interaction;
  
