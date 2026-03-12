// ================= GET PAGE ELEMENTS =================

// Get all reels
const reels = document.querySelectorAll(".reel");

// Get result display
const result = document.getElementById("result");



// Generates many numbers inside a reel so it can scroll
function createNumbers(reel){

    // Clear existing numbers
    reel.innerHTML = "";

    // Create numbers from -1 to 39
    for(let i=-1;i<40;i++){

        let div = document.createElement("div");

        div.className = "number";

        // Creates repeating digits 0-9
        div.textContent = (i+10)%10;

        reel.appendChild(div);
    }

}



// Fill every reel with numbers
reels.forEach(reel=>{

    createNumbers(reel);

    // Set starting position (0 in middle)
    reel.style.transform = "translateY(0px)";

});


// GET SPIN BUTTON 
const spinButton = document.querySelector("button");


// SPIN FUNCTION
function spin() {

    // Disable button immediately so user can't spam click
    spinButton.disabled = true;
    spinButton.style.opacity = 0.6;

    // Stores final 6-digit result
    let answer = "";

    // Loop through each reel
    reels.forEach((reel, index) => {

        // Delay each reel spin (slot machine effect)
        setTimeout(() => {

            let numbers = reel.children;

            // Pick a random number from middle section
            let middleIndex = Math.floor(Math.random() * 20) + 10;

            // Add number to result string
            answer += numbers[middleIndex].textContent;

            // Remove previous highlights
            Array.from(numbers).forEach(num => num.classList.remove("middle"));

            // Highlight the selected middle number
            numbers[middleIndex].classList.add("middle");

            // Calculate scroll offset
            let offset = (middleIndex * 100) - 100;

            // Reset position without animation
            reel.style.transition = "none";
            reel.style.transform = "translateY(0px)";

            // Force browser to apply reset
            reel.offsetHeight;

            // Animate reel spin
            reel.style.transition = "transform 1.8s cubic-bezier(0.25,0.8,0.25,1)";
            reel.style.transform = `translateY(-${offset}px)`;

            // When the LAST reel stops
            if(index === reels.length - 1){

                setTimeout(() => {

                    // Show final result
                    result.textContent = answer;

                    // Enable spin button again
                    spinButton.disabled = false;
                    spinButton.style.opacity = 1;

                }, 1800); // same as animation duration
            }

        }, index * 500); // delay between reels
    });

}