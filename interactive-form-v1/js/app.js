// On page load, the focus will be on the first input on the page. It will also hide the Select Theme 
// option in the design section, as well as the color choices until the user selects a T-Shirt. 

var newOption = new Option('Please select a T-Shirt Theme','new-option', true); 
const selectTheme = $("#design").find("option:contains('Select Theme')");

// creating the activities section error message as a global variable
var errorMessage = document.createElement('p'); 
    errorMessage.textContent = "You need to check at least one activity."; 
    errorMessage.style.color = 'red'; 

// creating variables out of the t-shirt color selections 
var cornflowerBlue= $('#color').find("option:contains('Cornflower Blue')"); 
var darkSlateGrey = $('#color').find("option:contains('Dark Slate Grey')"); 
var gold = $('#color').find("option:contains('Gold')"); 
var tomato = $('#color').find("option:contains('Tomato')"); 
var steelBlue = $('#color').find("option:contains('Steel Blue')"); 
var dimGrey = $('#color').find("option:contains('Dim Grey')"); 

// setting some default characteristics
window.onload = () => {
    $("#name").focus();
    selectTheme.hide(); 
    cornflowerBlue.hide(); 
    darkSlateGrey.hide(); 
    gold.hide(); 
    tomato.hide(); 
    steelBlue.hide(); 
    dimGrey.hide(); 
    $('#color').hide(); 

    // setting default payment states
    $('#credit-card').show();  
    $("#payment").val("credit card");
    $("p:contains(PayPal)").hide(); 
    $( "p:contains(Bitcoin)").hide(); 

    // appending and hiding the default error message for the activities section.
    $('.activities').append(errorMessage);  
    errorMessage.style.display = "none"; 

  };

// Below is the function to dynamically show the "other" field when the "other" is selected in the job role dropdown box.

$("#other-title").hide();
      $("#title").change (function(){
          if($(this).val() == "other") {
              $("#other-title").show();
            }
            else {
                $("#other-title").hide();  
            }
      });

// filtering the t-shirt color selections based on the design chosen

$('#design').change(function(){

  if ($(this).val()==='js puns') {
    $('#color').show(); 
    $('#color').val('cornflowerblue'); 
    cornflowerBlue.show(); 
    darkSlateGrey.show(); 
    gold.show(); 

    tomato.hide(); 
    steelBlue.hide(); 
    dimGrey.hide(); 
    selectTheme.hide(); 
    // newOption.style.display= "none";
  }
   else if ($(this).val()==='heart js') {
    $('#color').show(); 
    $('#color').val('tomato'); 
    tomato.show(); 
    steelBlue.show(); 
    dimGrey.show(); 

    cornflowerBlue.hide(); 
    darkSlateGrey.hide(); 
    gold.hide(); 
    selectTheme.hide();
    // newOption.style.display = "none"; 
}
});  

// The activity section that restricts the user from booking multiple activities at the same time
// The section also adds together the totals of the costs of the events

var totalCostElement = document.createElement('p'); 
let totalActivityCost = 0; 
$('.activities').append(totalCostElement);

$('.activities').change(function(event){
  let inputClick = $(event.target); 
  let parentText = $(inputClick).parent().text(); 
  let dollarSignIndex = parentText.indexOf('$'); 
  let priceOne = parseInt(parentText.slice(dollarSignIndex+1)); 
  
  if (inputClick.prop('checked')) {
    totalActivityCost += priceOne; 
  }
  else {
    totalActivityCost-=priceOne;
  }
  totalCostElement.textContent = 'Total: $'+totalActivityCost; 
  let emDash = parseInt(parentText.indexOf('—')+2); 
  let comma = parseInt(parentText.indexOf(',')); 
  let activityTime = parentText.slice(emDash, comma); 

  let checkboxes = $(":checkbox"); 
  checkboxes.each(function(i) {
    let currentClick = $(checkboxes[i]).parent().text(); 
    let currentClickDash = parseInt(currentClick.indexOf('—')+2);
    let currentClickComma = parseInt(currentClick.indexOf(',')); 
    let currentActivityTime = currentClick.slice(currentClickDash, currentClickComma); 

    // grabbing inputs as variables to set conditionals based on clicks
    var jsFrameworks = $("input[name='js-frameworks']"); 
    var jsLibs = $("input[name='js-libs']"); 
    var express = $("input[name='express']"); 
    var node = $("input[name='node']"); 
    var buildTools = $("input[name='build-tools']"); 
    var npm = $("input[name='npm']"); 

    // setting conditionals that disable conflicting activity times
    if (jsFrameworks.is(':checked')){
      express.prop('disabled', true)
    }
    else {
      express.prop('disabled', false)
    }
    if (jsLibs.is(':checked')){
      node.prop('disabled', true)
    }
    else {
      node.prop('disabled', false)
    }
    if (jsLibs.is(':checked')){
      node.prop('disabled', true)
    }
    else {
      node.prop('disabled', false)
    }
    if (express.is(':checked')){
      jsFrameworks.prop('disabled', true)
    }
    else {
      jsFrameworks.prop('disabled', false)
    }
    if (node.is(':checked')){
      jsLibs.prop('disabled', true)
    }
    else {
      jsLibs.prop('disabled', false)
    }
      })
    }); 

  // The payment section filters the payment methods not selected by the user.  
  $('#payment').find("option:contains('Select Payment Method')").hide(); 

  $('#payment').change(function(){
    let paymentSelection = $('#payment :selected').text(); 
    if (paymentSelection == 'Credit Card') {
      $('#credit-card').show(); 
    }
    else {
      $('#credit-card').hide();  
    }
    if (paymentSelection == 'PayPal') {
      $( "p:contains(PayPal)").show(); 
    }
    else {
      $( "p:contains(PayPal)").hide(); 
    }if (paymentSelection == 'Bitcoin') {
      $( "p:contains(Bitcoin)").show(); 
    }
    else {
      $( "p:contains(Bitcoin)").hide(); 
    }
    })
  
  // This section validates the data entered into each input. 
  // the first function validates the name input
  $(':submit').click(function(){
   if ($('#name').val().length===0) {
    $('#name').css('border-color', 'red'); 
    event.preventDefault(); 
  }
   else {
      $('#name').css('border-color',""); 
    }
  }
  )

//  this section validates the email input 
  $(':submit').click(function(){
    let mailTest = new RegExp (/^[^@]+@[^@]+\.[^@]+$/); 
    let testResult = mailTest.test($('#mail').val());
    if (testResult == false) {
      $('#mail').css('border-color', 'red'); 
    event.preventDefault(); 
    }

    else {
      $('#mail').css('border-color',""); 

    }
  })

// this function confirms that at least one activity (checkbox) was checked before allowing the form to be submitted
  $(':submit').click(function(){
        if ($("input:checkbox:checked").length==0) {
        errorMessage.style.display=""; 
        event.preventDefault(); 
    }
        else {

    }
  })
// This function validates the credit card payment information. 

  $(':submit').click(function(){
      if ($('#payment :selected').text() =='Credit Card'){
        let creditTest = new RegExp (/^([0-9]{4}[\s-]?){3}([0-9]{4})$/); 
        let ccNum = $('#cc-num').val();
        let zipTest = new RegExp (/(^\d{5}$)|(^\d{5}-\d{4}$)/); 
        let zipCode = $('#zip').val(); 
        let cvvTest = new RegExp (/^[0-9]{3}/); 
        let cvvNum = $('#cvv').val(); 

        if (creditTest.test(ccNum)==false) {
          event.preventDefault();
          $('#cc-num').css('border-color', 'red');
        }
        else {
        
        }
        if (zipTest.test(zipCode)==false) {
          event.preventDefault(); 
          $('#zip').css('border-color', 'red');
        }
        else {
        }
        if (cvvTest.test(cvvNum)==false) {
          $('#cvv').css('border-color', 'red');
          event.preventDefault();
        }
      }
      else {
        
  }
})
  
