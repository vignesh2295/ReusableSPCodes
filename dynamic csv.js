function WriteToFile() {
debugger;
      var data0 = [
        ["A","B","C","D"],
        ["a","b","c","d"]
      ];
      var docTitle = "SupplierBusinessClassification.csv";     
        download_csv(data0,docTitle)            
}
 
function download_csv(data,docName) {
    var csv;
    data.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_parent';
    hiddenElement.download = docName;
    hiddenElement.click();
}