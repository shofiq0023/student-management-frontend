const GET_ALL_URL = "http://localhost:8080/api/get/all";
const GET_ALL_DESC_URL = "http://localhost:8080/api/get/all/desc";
const GET_ALL_NAME_URL = "http://localhost:8080/api/get/all/name";
const GET_ALL_NAME_DESC_URL = "http://localhost:8080/api/get/all/name/desc";
const GET_SINGLE_URL = "http://localhost:8080/api/get/";
const ADD_URL = "http://localhost:8080/api/add";
const DELETE_URL = "http://localhost:8080/api/delete/";


// function to dynamically append result html to dom
function htmlTemplate(result) {
    template =
    `
        <li class="my-3 student-list">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-lg-2 col-md-2 col-2">
                        <p><span class="dark">Id:</span> ${result.id}</p>
                    </div>
                    <div class="col-lg-4 col-md-4 col-4">
                        <p><span class="dark">Name:</span> <span class="names">${result.name}</span></p>
                    </div>
                    <div class="col-lg-4 col-md-5 col-4">
                        <p><span class="dark">Email:</span> ${result.email}</p>
                    </div>
                    <div class="col-lg-1 col-md-2 col-1">
                        <button onclick="updateFunction(${result.id},'${result.name}','${result.email}');" class="btn btn-success btn-sm">Update</button>
                    </div>
                    <div class="col-lg-1 col-md-2 col-1">
                        <button onclick="deleteFunction(${result.id});" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>
        </li>
    `;
    return template;
}

// for generating multiple html to dom
function generateHtml(data) {
    let html = '';
    data.map((result) => {
        html += htmlTemplate(result);
    });
    return html;
}

// for generating single html to dom
function generateSingleHtml(data) {
    let html = '';
    if(data == null) {
        html += 'Not found';
    } else {
        html = htmlTemplate(data);
    }
    return html;
}


//==== [Get ALL] get all student from database ====//
//================================================//
function getAllStudent() {
    $.get(GET_ALL_URL, function(response) {
        $("#output").html(generateHtml(response));
    });
}

// [Get ALL Desc] get all student from database in descending
//================================================//
function getAllStudentDesc() {
    $.get(GET_ALL_DESC_URL, function(response) {
        $("#output").html(generateHtml(response));
    });
}

// [Get SINGLE] get single student from database
//================================================//
function getStudent(id) {
    if(id != 0) {
        $.get(GET_SINGLE_URL + id, function(response) {
            console.log(response);
            $("#output").html(generateSingleHtml(response));
        });
    } else {
        getAllStudent();
    }
    
}

// [GET ALL NAME] get all student from database by name
//================================================//
function getAllStudentName() {
    $.get(GET_ALL_NAME_URL, function(response) {
        $("#output").html(generateHtml(response));
    });
}

// [GET ALL NAME Desc] get all student from database by name descending
//================================================//
function getAllStudentNameDesc() {
    $.get(GET_ALL_NAME_DESC_URL, function(response) {
        $("#output").html(generateHtml(response));
    });
}

// [Post] adds a new student in database
//======================================//
$("#form").on("submit", function(e) {
    // creating a data object using form field
    let data = {
        id: $("#studentId").val(),
        name: $("#studentName").val(),
        email: $("#studentEmail").val()
    }
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        url: ADD_URL,
        data: JSON.stringify(data),
    });
});

// [Delete] deletes a student from database
//======================================//
function deleteFunction(id) {
    $.ajax({
        type: "DELETE",
        url: DELETE_URL + id,
        success: function() {
            getAllStudent();
        }
    });
}


// update button click function
function updateFunction(id, name, email) {
    console.log(id, name, email);
    $("#studentId").val(id).prop('disabled', true);
    $("#studentName").val(name);
    $("#studentEmail").val(email);
}

// search button cilck function 
$("#searchBtn").on("click", function(e) {
    e.preventDefault();
    getStudent($("#searchId").val());
    console.log($("#searchId").val());
});

// form reset
$("#resetBtn").on('click', function() {
    $("#form").trigger("reset");
    $("#studentId").prop('disabled', false);
});

// filter form submit
$("#filter-form").on("submit", function(e) {
    e.preventDefault();
    switch($("#filter").val()) {
        case "id_asc":
            getAllStudent();
            break;
        case "id_desc":
            getAllStudentDesc();
            break;
        case "name_asc":
            getAllStudentName();
            break;
        case "name_desc":
            getAllStudentNameDesc();
            break;
    }
});

// calls all student api after dom load
getAllStudent();