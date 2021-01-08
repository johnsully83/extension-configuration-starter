// this one is good, although we're missing the Placement interaction to hide the Placement field

const interaction: FieldInteraction = {
  fieldName: 'correlatedCustomText9',
  name: 'department-stamp',
  event: 'init',
  sortOrder: 0,
  invokeOnInit: true,
  script: (API: FieldInteractionAPI) => {
    
    const myClient = {

      adminUserTypeId: parseInt(  "${admin.user.type.id}"),

      init: () => {
        if(API.isEdit) {
          myClient.disableField();
        }

        else {
          myClient.disableField();
          return myClient.setInitialValue();
        }
      },

      setInitialValue: () => {
        return API.appBridge.httpGET('/entity/CorporateUser/${API.globals.userID}?fields=primaryDepartment(id)').then(response => {
          if(response.data && response.data.primaryDepartment && response.data.primaryDepartment.id) {
            API.setValue('correlatedCustomText9',response.data.primaryDepartment.id);
          }

          return Promise.resolve();
        });
      },

      disableField: () => {
        if (API.globals.userInfo.userTypeId != myClient.adminUserTypeId) {
          API.disable('correlatedCustomText9')
        }
      }

    };

    return myClient.init();

  },
};

export default interaction;
