let isAscending = true; 
async function getData() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=20");
    if (response.ok) {
      const data = await response.json();
      console.log("checkingdata", data);
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function maketable() {
  let data = await getData();
  data.results.sort((a, b) => isAscending
    ? a.location.street.number - b.location.street.number
    : b.location.street.number - a.location.street.number);

  document.getElementById("table-body").innerHTML = "";

  data?.results?.forEach((element) => {
    console.log("elemt", element);
    var tr = document.createElement("tr");
    const streetNumber = document.createElement("td");
    const streetName = document.createElement("td");
    const city = document.createElement("td");
    const state = document.createElement("td");
    const country = document.createElement("td");


    streetNumber.append(element.location.street.number) 
    streetName.append(element.location.street.name) 
    city.append(element.location.city) 
    state.append(element.location.state) 
    country.append(element.location.country) 

    tr.append(streetNumber);
    tr.append(streetName);
    tr.append(city);
    tr.append(state);
    tr.append(country);

    console.log("tr",tr)
    document.getElementById("table-body").appendChild(tr)

  });
 

}

document.addEventListener("content", () => {
    document.getElementById("street-number-header").addEventListener("click", () => {
      isAscending = !isAscending; 
      maketable(); 
    });
  
    maketable();
  });
