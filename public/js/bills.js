var moment = require('moment');
require('moment-recur');
var newAmount
getBills();
$(document).on("click", "button.changeAmt", update);
function update(){
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
    // submitButton.onClick = updateAjax(newAmount)
    currentBill.append(submitButton);


}
$(document).on('click', 'button.updateSubmit', ajaxPut);
$(document).on('click', 'button.deleteButton', ajaxDel);

function ajaxDel(){
    // e.preventDefault();
    var id = $(this)
    .parent()
    .parent().attr('data-id')
    // var id = $(currentBill).getAttribute('data-id');
    console.log(id);
    // newAmount = $("#newBillAmt").val()
    delAjax(id);
}
function ajaxPut(){
    // e.preventDefault();
    var id = $(this)
    .parent()
    .parent().attr('data-id')
    // var id = $(currentBill).getAttribute('data-id');
    console.log(id);
    newAmount = $("#newBillAmt").val()
    updateAjax(newAmount,id);
}



function updateAjax(newAmount, id){
    $.ajax({
        method: "PUT",
        url:"/updateBills",
        data: { "amountDue" : newAmount,
    "id": id}
        // ,
        //         "id":  updateButton.id}
    }).then(function(result) {
        console.log('changed');
        location.reload();
    })
}

function delAjax(id){
    $.ajax({
        method: "DELETE",
        url:"/deleteBills",
        data: { 
    "id": id}
        // ,
        //         "id":  updateButton.id}
    }).then(function(deleted) {
        console.log('deleted');
        console.log(deleted)
        // location.reload();
    })
}









function getBills() {
    $.get('/getBills', getBillList);
};

function getBillList(data) {


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





    for (var i = 0; i < data.length; i++) {

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
        nextDates = recurrence.next(1, "L")// show next recur
        var whenDue;
        console.log("This"+moment(thisMonthBill));
        console.log("today"+moment(today));
        console.log(moment(thisMonthBill).diff(moment(today)));
        // console.log("math"+thisMonthBill-today)
        if (moment(thisMonthBill, "MM-DD-YY").diff(moment(today, "MM-DD-YY"), 'days') < 0) {//if one is not negative store in variable
            whenDue = moment(nextDates[i]).diff(today, 'days');//show how many days till
            // whenDue = parseInt(whenDue) + 1;
            console.log("next month date")

        } else {
            whenDue = moment(thisMonthBill).diff(today, 'days');
            // moment(whenDue).format('d')
            console.log("this months date")
            // whenDue++;

        }



        $('#dynamicBills').append(
            `<div class ="bills" data-id='${data[i].id}'>
    <p class='billName'>Bill Name: ${data[i].payee} </p>
    <p class='billAmount' id='amount'>Amount Due: ${data[i].amountDue}</p>
    <p class='empty1'></p>
    <p class='billDate'> Days till due: ${whenDue}</p> 

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

}