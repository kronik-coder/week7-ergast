function handleSubmit(){
    
    year = document.getElementsByName('year')[0].value;
    round = document.getElementsByName('round')[0].value;
    doAPICall(year, round);
}

button = document.getElementById('button');
button.addEventListener('click', handleSubmit);

async function doAPICall(year, round){
    racers = await axios.get(`http://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
                        .catch((e)=>{console.error(e); alert("Bad Year/Round Combination!!")})
                        .finally(console.log("API request is over"));
    console.log(racers)
    racers2 = racers['data']['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
    buildTable(racers2)
}


function buildTable(racers2){
    for(racer of racers2){
        tr = document.getElementById('info')
        tbody= document.getElementsByTagName('tbody')[0];
        tr = document.createElement('tr');
        tbody.appendChild(tr);

        th = document.createElement('th');
        th.scope = 'row';
        th.innerText = `${racer.Driver.givenName} ${racer.Driver.familyName}`;
        tr.appendChild(th);
        
        td = document.createElement('td');
        td.innerText = racer.Driver.dateOfBirth;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = racer.position;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = racer.wins;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = racer.Driver.nationality;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = racer.Constructors[0].name;
    }
}
