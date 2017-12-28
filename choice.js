function GetDropDown(success,failure)
 {
 debugger;
     $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('listname')/fields?$filter=EntityPropertyName eq 'column1' or EntityPropertyName eq 'column2' or EntityPropertyName eq 'column3'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
           //success(data.d.results);
            success(data.d.results);    
        },        
        error: function (data) {
        debugger;
            failure(data);
            
        }
        });
 } 
/* Function to getting all dropdown items from library success*/
function DropDownvaluessuccess(Dropdownarray)
{
    debugger;    
     if(Dropdownarray.length>0)
     {
        var cln1dd='<option selected value="Select">Select</option>';
        var cln2dd='<option selected value="Select">Select</option>';
        var cln3dd='<option selected value="Select">Select</option>';
             
            var cln1=Dropdownarray[0].Choices.results;
            var cln2=Dropdownarray[1].Choices.results;
            var cln3=Dropdownarray[2].Choices.results;
            
            for(var i=0;i<cln1.length;i++)
            {               
                cln1dd+='<option value='+i+'>'+cln1[i]+'</option>';
            }
            for(var i=0;i<cln2.length;i++)
            {               
                cln2dd+='<option value='+i+'>'+cln2[i]+'</option>';               
            }
            for(var i=0;i<cln3.length;i++)
            {
                cln3dd+='<option value='+i+'>'+cln3[i]+'</option>';
            }
            
            $("#TaxType").empty().append(cln1dd);
            $("#cln2").empty().append(cln2dd);
            $("#TaxCountry").empty().append(cln3dd);
                    
     }       
}
/* Function to getting all dropdown items from library on failure*/ 
function DropDownvaluesfailure()
{
    debugger; 
}