function limitDays(element)
{
    const dayErrorMessage = document.getElementById("day-message");

    checkDay(element.value, dayErrorMessage);
}

function showDayInvalid()
{
    const dayLabel = document.getElementById("day-label");
    const dayInput = document.forms["date-form"]["day"];

    dayLabel.classList.add("label-red");
    dayInput.classList.add("input-red"); 
}

function hideDayInvalid()
{
    const dayLabel = document.getElementById("day-label");
    const dayInput = document.forms["date-form"]["day"];

    dayLabel.classList.remove("label-red");
    dayInput.classList.remove("input-red"); 
}

function showMonthInvalid()
{
    const monthLabel = document.getElementById("month-label");
    const monthInput = document.forms["date-form"]["month"];

    monthLabel.classList.add("label-red");
    monthInput.classList.add("input-red"); 
}

function hideMonthInvalid()
{
    const monthLabel = document.getElementById("month-label");
    const monthInput = document.forms["date-form"]["month"];

    monthLabel.classList.remove("label-red");
    monthInput.classList.remove("input-red"); 
}

function showYearInvalid()
{
    const yearLabel = document.getElementById("year-label");
    const yearInput = document.forms["date-form"]["year"];

    yearLabel.classList.add("label-red");
    yearInput.classList.add("input-red"); 
}

function hideYearInvalid()
{
    const yearLabel = document.getElementById("year-label");
    const yearInput = document.forms["date-form"]["year"];

    yearLabel.classList.remove("label-red");
    yearInput.classList.remove("input-red"); 
}

function checkDay(day, dayErrorMessage) {
    if (day.length >= 1) {
        // Check if it is a number
        if (isNaN(day)) { // is not a number

            dayErrorMessage.innerText = "Must enter valid day";
            showDayInvalid()
            return false;
        }

        else { // is a number

            if (day >= 1 && day <= 31) {
                dayErrorMessage.innerText = "";
                hideDayInvalid();
            }

            else {
                dayErrorMessage.innerText = "Must enter valid day";
                showDayInvalid()
                return false
            }

        }
    }
    else {
        dayErrorMessage.innerText = "";
        hideDayInvalid();
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
            showMonthInvalid();
            return false;
        }

        else { // is a number

            if (month >= 1 && month <= 12) {
                monthErrorMessage.innerText = "";
                hideMonthInvalid()
            }

            else {
                monthErrorMessage.innerText = "Must enter valid month";
                showMonthInvalid();
                return false;
            }

        }
    }

    else {
        monthErrorMessage.innerText = "";
        hideMonthInvalid()
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
            showYearInvalid()
            return false;
        }

        else { // is a number
            const now = new Date();
            
            if (year > now.getFullYear()) {
                yearErrorMessage.innerText = "Must be in the past";
                showYearInvalid()
                return false;
            }

            else if (year >= 1 && year <= now.getFullYear()) {
                yearErrorMessage.innerText = "";
                hideYearInvalid()
            }

            else {
                yearErrorMessage.innerText = "Must enter valid year";
                showYearInvalid()
                return false;
            }

        }
    }

    else {
        yearErrorMessage.innerText = "";
        hideYearInvalid()
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
        showDayInvalid();
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
        showMonthInvalid();
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
        showYearInvalid();
        canCalculate = false;
    }

    if(canCalculate)
    {
        const dob = new Date(dobYear, dobMonth-1, dobDay);

        // check if the day is valid 
        if(dobDay <= daysInMonth(dobMonth-1, dobYear) )
        {
            // check if year is atleast 1900
            if(dobYear < 1900)
            {
                yearErrorMessage.innerText = "minimum year is 1900";
                showYearInvalid();
                return false;
            }
            else
            {
                yearElement.innerText = "--";
                monthElement.innerText = "--";
                dayElement.innerText = "--";

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
                
                // yearElement.innerText = year;
                // monthElement.innerText = monthDiff;
                // dayElement.innerText = days;


                animateValue(yearElement, 0, year, 1000);
                animateValue(monthElement, 0, monthDiff, 2000);
                animateValue(dayElement, 0, days, 2000);
                // animateValue(monthElement, 0, monthDiff, 1000);

            }
        }
        else
        {
            dayErrorMessage.innerText = "must enter valid day";
            showDayInvalid();
            showMonthInvalid();
            showYearInvalid();
            return;
        }
    }

}

function animateValue(obj, start, end, duration) 
{
    let startTimestamp = null;
    const step = (timestamp) => 
    {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
        if(progress < 1)
        {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}



// function animateValue(obj, start, end, duration, callback) 
// {
//     let startTimestamp = null;
//     const step = (timestamp) => 
//     {
//       if (!startTimestamp) startTimestamp = timestamp;
//       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//       obj.innerHTML = Math.floor(progress * (end - start) + start);
//         if(progress < 1)
//         {
//             window.requestAnimationFrame(step);
//         }
//         else if(callback)
//         {
//             callback();
//         }
//     };

//     window.requestAnimationFrame(step);
// }
