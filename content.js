
let IsBet = 0
function filterContent() {
    let rollingTime = document.getElementsByClassName("text-2xl font-bold font-numeric")
    let t
    if (rollingTime.length > 0) {
        t = rollingTime[0].innerHTML
        console.log("rolling", t)
        // const inputAmount = document.getElementsByClassName("bg-transparent w-full h-full relative z-10")[0]
        if (1 < parseFloat(t) && parseFloat(t) < 5 && IsBet == 0) {
            IsBet = 1
            bet(2)
        }
    }

    if (t && t == "0.00") {
        IsBet = 0
        IsEnterAmount = 0
        let betValues = document.getElementsByClassName("whitespace-nowrap font-numeric")
        if (betValues.length > 0) {
            console.log("betValues----------------")
            for (let i = 2; i < betValues.length; i++) {
                let bv = betValues[i]
                if (bv.parentElement.innerHTML.includes('+')) {
                    if (i == 2) {
                        console.log("black win!!")
                    }
                    if (i == 3) {
                        console.log("white win!!")
                    }
                    if (i == 4) {
                        console.log("yellow win!!")
                    }
                }
            }
            console.log("-------------------------")
        }
    }
}

function bet(choice) {
    let placeBetButtons = document.getElementsByClassName("bet-btn")
    if (choice == 2) {
        placeBetButtons[1].click()
    }
    console.log("betting ...", placeBetButtons.length, placeBetButtons)
}

setInterval(filterContent, 1500)