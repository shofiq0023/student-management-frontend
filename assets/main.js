const GET_ALL_URL = "http://localhost:8080/api/get/all";
const ADD_URL = "http://localhost:8080/api/add";
const DELETE_URL = "http://localhost:8080/api/delete/";

// for generating html to dom
function generateHtml(data) {
    let html = '';
    data.map((result) => {
        html +=
        `
            <li class="my-3 student-list">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-2 col-md-2 col-2">
                            <p><span class="dark">Id:</span> ${result.id}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4">
                            <p><span class="dark">Name:</span> ${result.name}</p>
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
    });
    return html;
}

// [Get] get all student from database
function getAllStudent() {
    $.get(GET_ALL_URL, function(response) {
        console.log("The retured data: ", response);
        $("#output").html(generateHtml(response));
    });
}

// [Post] adds a new student in database
$("#form").on("submit", function() {

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
        data: JSON.stringify(data)
    });
});

// [Delete] deletes a student from database
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

// form reset
$("#resetBtn").on('click', function() {
    $("#form").trigger("reset");
    $("#studentId").prop('disabled', false);
})

// calls all student api after dom load
getAllStudent();