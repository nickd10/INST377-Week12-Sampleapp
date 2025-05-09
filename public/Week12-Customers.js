async function loadCustomerData() {
    console.log('Loading customer data...');
    await fetch(`/customers`)
      .then((result) => result.json())
      .then((resultJson) => {
        console.log(resultJson);
        const table = document.createElement('table');
        table.setAttribute('id', 'customerInfo');
  
        const tableRow = document.createElement('tr');
  
        const tableHeadingFirstName = document.createElement('th');
        tableHeadingFirstName.innerHTML = 'First Name';
        tableRow.appendChild(tableHeadingFirstName);
  
        const tableHeadingLastName = document.createElement('th');
        tableHeadingLastName.innerHTML = 'Last Name';
        tableRow.appendChild(tableHeadingLastName);
  
        const tableHeadingState = document.createElement('th');
        tableHeadingState.innerHTML = 'State';
        tableRow.appendChild(tableHeadingState);
  
        table.appendChild(tableRow);
        
        document.body.appendChild(table);
    });
}

window.onload = loadCustomerData;