async function getUsers() {
    // Default options are marked with *
    const response = await fetch('/api/GetSubscribers/maryCargoExpress');
    const results = await response.json();
    let arrayTableResults = []; 
    let myTable = document.getElementById('datatablesSimple');
    let dataTable = new simpleDatatables.DataTable(myTable);
   
     for (let index = 0; index < results.value.length; index++) {
       const client = results.value[index];
       let tempObj = {}
   
       tempObj['Name'] = `${client.firstName} ${client.lastName}`;
       tempObj['Phone Number'] = `${client.phoneNumber}`;
       tempObj['Date'] = `${client.Timestamp}`;
       tempObj['Address'] = `${client.address1}`;
       
       arrayTableResults.push(tempObj);
     }
   
     dataTable.insert(arrayTableResults)
   }
getUsers();