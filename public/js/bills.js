// var moment = require('moment');
// var recur = require('moment-recur');

getBills();


function getBills() {
    $.get('/getBills', getBillList);
};

function getBillList(data) {


    var interval;



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

        recurrence = moment(thisMonthBill).recur().every(1).months();
        nextDates = recurrence.next(1, "L")
        // console.log(nextDates[0])
        console.log(moment(thisMonthBill).fromNow())
        var whenDue;
        if(moment(thisMonthBill).diff(moment(nextDates[i]), 'days') ){
            whenDue= nextDates[i];
        }else{
            whenDue= thisMonthBill;
        }
        $('#dynamicBills').append(
            `<div class ="bills" data-id=${data[i].id}>
            <p class='billName'>Bill Name: ${data[i].payee} </p>
            <p class='billAmount'>Amount Due: ${data[i].amountDue}</p>
            <p class='billDate'> Date Due: ${moment(whenDue).fromNow('days')}</p>
        </div>
    `);
    }
}