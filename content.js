let IsBet = 0
let countYellow = 0
let countBlack = 0
let countWhite = 0
let IsIncreased = 0
let LostSteakYY = -1
let LostSteakBB = -1
let LostSteakYB = -1
let LostSteakBY = -1
let PreviousRes = ""

function total() {
    return countBlack + countWhite + countYellow
}

function bet() {
    console.log("betted")
}

function calculateLostSteak(res) {
    if (res == "yellow") {
        if (PreviousRes == "yellow") {
            LostSteakYY = 0
            LostSteakBY += 1
            LostSteakBB += 1
            LostSteakYB += 1
        }
        if (PreviousRes == "black")
    }
    if (res == "black") {
        if (LastY != -1) {
            LostSteakYB = 0
            LostSteakYY = total() - LastY
        }
        if (LastB != -1) {
            LostSteakBB = 0
            LostSteakBY = total() - LastB
        }

    }
    PreviousRes = res
    if (res == "yellow") LastY = total()
    if (res == "black") LastB = total()
    console.log("-------------------")
    console.log("BY: ", LostSteakBY)
    console.log("YY: ", LostSteakYY)
    console.log("YB: ", LostSteakYB)
    console.log("BB: ", LostSteakBB)
    console.log("-------------------")
}


function filterContent() {
    let rollingTime = document.getElementsByClassName("text-2xl font-bold font-numeric")
    let t
    if (rollingTime.length > 0) {
        t = rollingTime[0].innerHTML
        if (1 < parseFloat(t) && parseFloat(t) < 5 && IsBet == 0) {
            IsBet = 1
            bet()
        }
    }

    if (t && t != "0.00") {
        IsIncreased = 0
    }

    if (t && t == "0.00") {
        console.log("data: ", countBlack, countWhite, countYellow)
        IsBet = 0
        let betValues = document.getElementsByClassName("whitespace-nowrap font-numeric")
        if (betValues.length > 0) {
            for (let i = 2; i < betValues.length; i++) {
                let bv = betValues[i]
                if (bv.parentElement.innerHTML.includes('+')) {
                    if (IsIncreased == 0) {
                        let res = ""
                        IsIncreased = 1
                        if (i == 2) {
                            res = "black"
                            countBlack = countBlack + 1
                        }
                        if (i == 3) {
                            res = "white"
                            countWhite = countWhite + 1
                        }
                        if (i == 4) {
                            res = "yellow"
                            countYellow = countYellow + 1
                        }
                        calculateLostSteak(res)
                    }
                }
            }
        }
    }
}

setInterval(filterContent, 1500)