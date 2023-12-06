function limitDays(element)
{
    const dayErrorMessage = document.getElementById("day-message");

    checkDay(element.value, dayErrorMessage);
}

function checkDay(day, dayErrorMessage) {
    if (day.length >= 1) {
        // Check if it is a number
        if (isNaN(day)) { // is not a number

            dayErrorMessage.innerText = "Must enter valid day";
            return false;
        }

        else { // is a number

            if (day >= 1 && day <= 31) {
                dayErrorMessage.innerText = "";
            }

            else {
                dayErrorMessage.innerText = "Must enter valid day";
                return false
            }

        }
    }
    else {
        dayErrorMessage.innerText = "";
    }

    return true;
}

function limitMonths(element)
{
    const monthErrorMessage = document.getElementById("month-message");

    checkMonth(element.value, monthErrorMessage);
}

function checkMonth(month, monthErrorMessage) {
    if (month.length >= 1) {
        // Check if it is a number
        if (isNaN(month)) { // is not a number

            monthErrorMessage.innerText = "Must enter valid month";
            return false;
        }

        else { // is a number

            if (month >= 1 && month <= 12) {
                monthErrorMessage.innerText = "";
            }

            else {
                monthErrorMessage.innerText = "Must enter valid month";
                return false;
            }

        }
    }

    else {
        monthErrorMessage.innerText = "";
    }

    return true;
}

function limitYear(element)
{
    const yearErrorMessage = document.getElementById("year-message");

    checkYear(element.value, yearErrorMessage);
}


function checkYear(year, yearErrorMessage) {
    if (year.length >= 1) {
        // Check if it is a number
        if (isNaN(year)) { // is not a number

            yearErrorMessage.innerText = "Must enter valid year";
            return false;
        }

        else { // is a number
            const now = new Date();
            
            if (year > now.getFullYear()) {
                yearErrorMessage.innerText = "Must be in the past";
                return false;
            }

            else if (year >= 1 && year <= now.getFullYear()) {
                yearErrorMessage.innerText = "";
            }

            else {
                yearErrorMessage.innerText = "Must enter valid year";
                return false;
            }

        }
    }

    else {
        yearErrorMessage.innerText = "";
    }

    return true;
}


  
function daysInMonth(month, year) 
{
    return new Date(year, month + 1, 0).getDate();
}
  


function calculateAge()
{
    // Elements to display age
    const yearElement = document.getElementById("year-age");
    const monthElement = document.getElementById("month-age");
    const dayElement = document.getElementById("day-age");

    // message elements
    const dayErrorMessage = document.getElementById("day-message");
    const monthErrorMessage = document.getElementById("month-message");
    const yearErrorMessage = document.getElementById("year-message");

    // Get day, month, and year of date of birth
    const dobDay = document.forms["date-form"]["day"].value;
    const dobMonth = document.forms["date-form"]["month"].value;
    const dobYear = document.forms["date-form"]["year"].value;

    // Date
    const now = new Date();
    
    let canCalculate = true;

    // check if user entered input in day
    if(dobDay.length >= 1)
    { 
       canCalculate = canCalculate && checkDay(dobDay, dayErrorMessage);
    //    console.log(canCalculate)
    }
    else
    {
        dayErrorMessage.innerText = "field is required";
        canCalculate = false;
    }

    //check if user entered input in month
    if(dobMonth.length >= 1)
    {   
        canCalculate = canCalculate && checkMonth(dobMonth, monthErrorMessage);
        // console.log(canCalculate)
    }
    else
    {
        monthErrorMessage.innerText = "field is required";
        canCalculate = false;
    }

    //check if user entered input in year
    if(dobYear.length >= 1)
    {   
        canCalculate = canCalculate && checkYear(dobYear, yearErrorMessage);
        // console.log(canCalculate)
    }
    else
    {
        yearErrorMessage.innerText = "field is required";
        canCalculate = false;
    }

    if(canCalculate)
    {
        const dob = new Date(dobYear, dobMonth-1, dobDay);
        
        // check if the day is valid 
        if(dob.getDate() <= new Date(dobYear, dobMonth, 0).getDate())
        {
            // check if year is atleast 1900
            if(dobYear < 1900)
            {
                yearErrorMessage.innerText = "minimum year is 1900";
                return false;
            }
            else
            {
                // yearAge.innerText = now.getFullYear() - oldDate.getFullYear();
                // // const now2 = new Date(2024, 0, 1);

                let year = now.getFullYear() - dob.getFullYear();
                let monthDiff = (now.getMonth()) - dob.getMonth();

                // const monthDiff  = (now.getMonth()) - oldDate.getMonth();

                if(monthDiff < 0)
                { 
                    // current month is less than birth month
                    // Not yet birthday
                    // reduce year 
                    monthDiff += 12;
                    year -= 1;
                }

                let days = now.getDate() - dob.getDate();
                if(days < 0)
                {
                    // current day is less than birth day
                    // find how many days old
                    // reduce year
                    days += daysInMonth(dob.getMonth(), dob.getFullYear());
                    monthDiff -= 1;
                    if(monthDiff < 0)
                    {
                        // Not yet birth month reduce year to 11 and reduce year by 1
                        monthDiff = 11
                        year -= 1;
                    }
                }

                console.log(`Age: ${year} years, ${monthDiff} months, ${days} days`);
                
                yearElement.innerText = year;
                monthElement.innerText = monthDiff;
                dayElement.innerText = days;

            }
        }
        else
        {
            dayErrorMessage = "must enter valid day";
            return;
        }
    }

}

