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

$('.activities').change (function(event){
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

    
    if (activityTime == currentActivityTime && parentText != currentClick) {
      $(this).prop('disabled', true);
    }
  
    else {
      $(this).prop('disabled', false);
        }
      })
    }); 