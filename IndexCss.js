function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/list",
        success: function (data) {
            let content = '    <tr>\n' +
                '        <td>#</td>\n' +
                '        <td>Thành phố</td>\n' +
                '        <td>Quốc gia</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i]);
            }
            document.getElementById('listCity').innerHTML = content;
        }
    })
}

successHandler();

function getCity(city) {
    return `<tr>
                        <td> ${city.id}</td>
                        <td ><a id="${city.id}" onclick="showinfo(this)">${city.name}</td>
                        <td >${city.nation.name}</td>`+
        `<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editmodal" value="${city.id}" onclick="showEdit(this)">
                Edit
            </button></td>`+
        `<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deletemodal" value="${city.id}" onclick="showdelete(this)">
                Delete
            </button></td>`
}
function addnewcity(){
    let name = $('#name').val();
    let nation = $('#nation').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let newcity = {
        name: name,
        nation: {id: nation},
        area: area,
        population: population,
        gdp: gdp,
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newcity),
        url: "http://localhost:8080/city/create",
        success: successHandler
    })
    event.preventDefault();
}

listNation('nation')
listNation('nationEdit')
function listNation(a){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/nation/list",
        success:function (data){
            let content;
            for (let i = 0; i < data.length; i++) {
                content+=getNation(data[i])
            }
            document.getElementById(a).innerHTML=content;
        }
    })
}
function getNation(nation){
    return `<option  value="${nation.id}">${nation.name}</option>`
};
function showEdit(a) {
    let id = a.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/find/" + id,
        success: function (city) {
            $('#idEdit').val(city.id);
            $('#nameEdit').val(city.name);
            $('#areaEdit').val(city.area);
            $('#populationEdit').val(city.population);
            $('#gdpEdit').val(city.gdp);
            $('#descriptionEdit').val(city.description);
        }
    })
    event.preventDefault();
}
function updateCity() {
    let id = $('#idEdit').val();
    let name = $('#nameEdit').val();
    let nation = $('#nationEdit').val();
    let area = $('#areaEdit').val();
    let population = $('#populationEdit').val();
    let gdp = $('#gdpEdit').val();
    let city = {
        id: id,
        name: name,
        nation: {id: nation},
        area: area,
        population: population,
        gdp:gdp
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/city/update",
        data: JSON.stringify(city),
        success: successHandler
    })
    event.preventDefault();
}
function showinfo(a){
    let id = a.getAttribute("id");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/find/" + id,
        success: function (city) {
            $('#nameinfo').val(city.name);
            $('#nameinfo').val(city.nation.name);
            $('#areainfo').val(city.area);
            $('#populationinfo').val(city.population);
            $('#gdpinfo').val(city.gdp);
            $('#descriptioninfo').val(city.description);
        }
    })
    event.preventDefault();
}

function showdelete(a){
    let id = a.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/find/" + id,
        success: function (city) {
            $('#cityDelete').val(city.name);
            $('#idDelete').val(city.id);
        }
    })
    event.preventDefault();
}
function deletecity(){
    let id = $('#idDelete').val();
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/city/delete/"+id,
        success:successHandler
    })
    event.preventDefault();

}