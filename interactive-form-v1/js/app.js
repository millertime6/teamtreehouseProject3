window.onload = () => {
    $("#name").focus();
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

const selectTheme = $("#design").find("option:contains('Select Theme')");
selectTheme.hide(); 

$('#design').change (function(){
  if ($(this).val()== "js puns") {
    $('#color').find("option:contains('Cornflower Blue')").show(); 
    $('#color').find("option:contains('Dark Slate Grey')").show(); 
    $('#color').find("option:contains('Gold')").show(); 
    
    $('#color').find("option:contains('Tomato')").hide(); 
    $('#color').find("option:contains('Steel Blue')").hide(); 
    $('#color').find("option:contains('Dim Grey')").hide(); 
  }
  else if ($(this).val()== "heart js") {
    $('#color').find("option:contains('Tomato')").show(); 
    $('#color').find("option:contains('Steel Blue')").show(); 
    $('#color').find("option:contains('Dim Grey')").show(); 
    
    $('#color').find("option:contains('Cornflower Blue')").hide(); 
    $('#color').find("option:contains('Dark Slate Grey')").hide(); 
    $('#color').find("option:contains('Gold')").hide(); 
}

});  

// The activity section that restricts the user from booking multiple activities at the same time
// I left the logs in as comments so I can go back and edit if needed
// The section also adds together the totals of the costs of the events

var totalCostElement = document.createElement('p'); 
let totalActivityCost = 0; 
$('.activities').append(totalCostElement);

$('.activities').change(function(event){
  let inputClick = $(event.target); 
  console.log(inputClick); 
  let parentText = $(inputClick).parent().text(); 
  console.log(parentText); 
  let dollarSignIndex = parentText.indexOf('$'); 
  console.log(dollarSignIndex); 
  let priceOne = parseInt(parentText.slice(dollarSignIndex+1)); 
  console.log(priceOne);
  
  if (inputClick.prop('checked')) {
    totalActivityCost += priceOne; 
  }
  else {
    totalActivityCost-=priceOne;
  }
  totalCostElement.textContent = 'Total: $'+totalActivityCost; 
  console.log(totalActivityCost); 
  let emDash = parseInt(parentText.indexOf('—')+2); 
  console.log(emDash); 
  let comma = parseInt(parentText.indexOf(',')); 
  console.log(comma); 
  let activityTime = parentText.slice(emDash, comma); 
  console.log(activityTime);

  let checkboxes = $(":checkbox"); 
  checkboxes.each(function(i) {
    let currentClick = $(checkboxes[i]).parent().text(); 
    let currentClickDash = parseInt(currentClick.indexOf('—')+2);
    let currentClickComma = parseInt(currentClick.indexOf(',')); 
    let currentActivityTime = currentClick.slice(currentClickDash, currentClickComma); 
    console.log(currentActivityTime);
    console.log(currentClick); 

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
    console.log('call the police'); 
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
    console.log('just for the test'); 
    }

    else {
      $('#mail').css('border-color',""); 

    }
  })

// this function confirms that at least one activity (checkbox) was checked before allowing the form to be submitted
  $(':submit').click(function(){
        if ($("input:checkbox:checked").length==0) {
        let errorMessage = document.createElement('p'); 
        errorMessage.textContent = "You need to check at least one activity."; 
        errorMessage.style.color = 'red'; 
        $('.activities').append(errorMessage);  
        console.log('nothing has been clicked'); 
    }
        else {
          event.preventDefault(); 
          console.log('checkbox is checked'); 

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
          console.log('credit number failed') 
        }
        else {
          console.log('credit number worked!'); 
        
        }
        if (zipTest.test(zipCode)==false) {
          event.preventDefault(); 
          console.log('zip code is wrong'); 
        }
        else {
          console.log('zip code worked!'); 
        }
        if (cvvTest.test(cvvNum)==false) {
          console.log('cvv number is wrong friend!'); 
        }
          console.log('credit card was selected'); 
      }
      else {
          console.log('credit card not selected');
        
  }
})
  
