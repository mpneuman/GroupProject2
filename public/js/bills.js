var newAmount
getBills();
$(document).on("click", "button.changeAmt", update);
function update() {
    var currentBill = $(this)
        .parent()
    $(currentBill).text("");
    currentBill.append('<label>');
    currentBill.attr("for", "updateBills");
    currentBill.text("What is the new amount?");
    currentBill.addClass("updateBills");
    currentBill.append("<br>");
    currentBill.append("<input name='updateBills' id='newBillAmt' type='text'></input>");
    currentBill.append("<br>");
    var submitButton = $('<button>');
    submitButton.addClass('updateSubmit');
    submitButton.text('Change Amount');
    currentBill.append(submitButton);
}

$(document).on('click', 'button.updateSubmit', ajaxPut);
$(document).on('click', 'button.deleteButton', ajaxDel);

function ajaxDel() {
    var id = $(this)
        .parent()
        .parent().attr('data-id')
    console.log(id);
    delAjax(id);
}

function ajaxPut() {
    var id = $(this)
        .parent()
        .parent().attr('data-id')
    newAmount = $("#newBillAmt").val()
    updateAjax(newAmount, id);
}



function updateAjax(newAmount, id) {
    $.ajax({
        method: "PUT",
        url: "/updateBills",
        data: {
            "amountDue": newAmount,
            "id": id
        }
    }).then(function (result) {
        // console.log('changed');
        location.reload();
    })
}

function delAjax(id) {
    $.ajax({
        method: "DELETE",
        url: "/deleteBills",
        data: {
            "id": id
        }
    }).then(function (deleted) {
        // console.log('deleted');
        // console.log(deleted)
        location.reload();
    })
}
function getBills() {
    $.get('/getBills', getBillList);
};

function getBillList(data) {

    for (var i = 0; i < data.length; i++) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        //get the date of this months bill to do maths

        var recurrence;
        var nextDates;
        var thisMonthBill = new Date();
        var dd = data[i].dateDue;
        var mm = thisMonthBill.getMonth() + 1; //January is 0!
        var yyyy = thisMonthBill.getFullYear();
        if (dd.length < 1) {//because people could input 05 or 5 for the date I am checking the length to make sure it is at least two characters
            // i.e. 31 is two characters and 01 is two characters but 5 is one so 5 -> 05
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        thisMonthBill = mm + '/' + dd + '/' + yyyy;

        recurrence = moment(thisMonthBill).recur().every(1).months();//set the recur to every one month
        nextDates = recurrence.next(1)// show next recur
        var whenDue;

        if (moment(thisMonthBill, "MM-DD-YY").diff(moment(today, "MM-DD-YY"), 'days') < 0) {//if one is not negative store in variable
            whenDue = moment(nextDates[0]).diff(moment(today), 'days');//show how many days till
            whenDue++
        } else {
            whenDue = moment(thisMonthBill).diff(moment(today), 'days');
        }



        $('#dynamicBills').append(
            `<div class ="bills" data-id='${data[i].id}'>
    <p class='billName'>Bill Name: ${data[i].payee} </p>
    <p class='billAmount' id='amount'>Amount Due: ${data[i].amountDue}</p>
    <p class='empty1'></p>
    <p class='billDate'> Days till due: ${whenDue}</p> 
    <p class='billCategory'> Category: ${data[i].category}</p>
    <p class='billWebsite'> Website for Bill: ${data[i].websiteAccess}</p>
    <p class='billNotes'> Notes for Bill: ${data[i].notes}</p>  
    <p class='empty2'></p>  
    </br>
    </div>
`);

    }
    var updateButton = $("<button>");
    updateButton.text("Update Bills");
    updateButton.addClass(`changeAmt`)
    // updateButton.setAttribute=("id",`${data[i].id}`)
    $(".empty1").append(updateButton);
    var deleteButton = $("<button>");
    deleteButton.text("Delete this bill");
    deleteButton.addClass('deleteButton');
    $('.empty2').append(deleteButton);





    var houseVar = 0;
    var otherultVar = 0;
    var carVar = 0;
    var healthVar = 0;
    var creditVar = 0;
    var entVar = 0;
    var otherVar = 0;
    for (var i = 0; i < data.length; i++) {

        switch (data[i].category) {
            case "Housing":
                houseVar += parseInt(data[i].amountDue)
                break;
            case "OtherUlt":
                otherultVar += parseInt(data[i].amountDue)
                break;
            case "Car":
                carVar += parseInt(data[i].amountDue)
                break;
            case "HealthIns":
                healthVar += parseInt(data[i].amountDue)
                break;
            case "Credit":
                creditVar += parseInt(data[i].amountDue)
                break;
            case "Entertainment":
                entVar += parseInt(data[i].amountDue)
                break;
            case "Other":
                otherVar += parseInt(data[i].amountDue)
                break;
        }
    }
    var catData = [houseVar, otherultVar, carVar, healthVar, creditVar, entVar, otherVar];

    var ctx = document.getElementById("myChart").getContext('2d');
    cData = {
        datasets: [{
            data: catData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 255, 255, 0.7)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 255, 255, 1)'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            "Housing",
            "OtherUlt",
            "Car",
            "HealthIns",
            "Credit",
            "Entertainment",
            "Other"
        ]

    };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: cData,
        options: {
            legend: {
                labels: {
                    fontColor: "white"
                }
            },
            responsive: false
        }
    });

}