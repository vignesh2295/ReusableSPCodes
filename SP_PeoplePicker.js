 $(document).ready(function () {
                $("#peoplePickerDiv").spPeoplePicker();            
            $("#pp1").click(function(){
                alert($("#peoplePickerDiv").getUserInfo());
                return false;
            });            
    });

//Below code will call the Button click event for ADD list item (first we are getting the user id from the selected people Picker & in the success event we are calling the update function):
// Get the user ID from Login name.
function fnCreateItem() {
    alert('loginName: '+$("#peoplePickerDiv").getUserInfo());
    var loginName = $("#peoplePickerDiv").getUserInfo();
    if(loginName.length != 0)
    {    
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().ensureUser(loginName);
    context.load(this.user);
    context.executeQueryAsync(
         Function.createDelegate(null, ensureUserSuccess), 
         Function.createDelegate(null, onFail)
         );
    }

    else

    {alert('enter valid user name');}
}

function ensureUserSuccess() {
    addNewItem(this.user.get_id());
}

function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
}
//adding New item
function addNewItem(userId) {
debugger;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Employee')/Items",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify( {
    		__metadata: { 'type': 'SP.Data.EmployeeListItem' },
    		Title: $('#txtTitle').val(),
    		testppId:{'results': [userId] }
    		}),
        success: function (data) {
            console.log(data);
            alert('sucess');
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
}