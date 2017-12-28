
function CheckOutFile(Documentid) {
debugger;
		documentidnew=Documentid
		var clientContext = SP.ClientContext.get_current();            
		var webSite = clientContext.get_web();
		this.list = webSite.get_lists().getByTitle("ClientDocForm");
		this.item = list.getItemById(Documentid);
		this.file = this.item.get_file();
		this.file.checkOut();
		clientContext.load(this.file)
		clientContext.executeQueryAsync(Function.createDelegate(this, this.OnLoadSuccess), Function.createDelegate(this, this.OnLoadFailed));            
}

function CheckInFile(success,failure,documentname,Docid)
{
debugger;
    $.ajax(
    {                                             
        url: siteURL+"/_api/web/GetFileByServerRelativeUrl('/sites/Inspire/ClientDocForm/"+documentname+"')/CheckIn(comment='this is test comment', checkintype=0)",
        method: "POST",                                            
        headers: {
				"ACCEPT": "application/json;odata=verbose",                                                                                                                                   
				"X-RequestDigest": digest
        },                                                                                                                            
                
        success: function (data) {
           success(data);     
        },
        error: function (data) {
        debugger;
            failure(data);
        }                                 
 });
}

