function limitDays(element)
{
    const dayErrorMessage = document.getElementById("day-message");

    if(element.value.length >= 1)
    {
        // Check if it is a number
        if(isNaN(element.value))
        { // is not a number
            
            dayErrorMessage.innerText = "Must enter valid day";
        }
        else
        { // is a number

            if(element.value >= 1 && element.value <= 31)
            {
                dayErrorMessage.innerText = "";
            }
            else
            {
                dayErrorMessage.innerText = "Must enter valid day";
            }
            
        }
    }
    else
    {
        dayErrorMessage.innerText = "";
    }
}

function limitMonths(element)
{
    const monthErrorMessage = document.getElementById("month-message");

    if(element.value.length >= 1)
    {
        // Check if it is a number
        if(isNaN(element.value))
        { // is not a number
            
            monthErrorMessage.innerText = "Must enter valid month";
        }
        else
        { // is a number

            if(element.value >= 1 && element.value <= 12)
            {
                monthErrorMessage.innerText = "";
            }
            else
            {
                monthErrorMessage.innerText = "Must enter valid month";
            }
            
        }
    }
    else
    {
        monthErrorMessage.innerText = "";
    }
}