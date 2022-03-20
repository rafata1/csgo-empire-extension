
let IsBet = 0
let countYellow = 0
let countBlack = 0
let countWhite = 0
let IsIncreased = 0
let previous = 0
let myChoice = -1
let myMoney = 150
let myChoiceRule2 = -1
let myMoneyRule2 = 150
let myMoneyRule3 = 300
let myChoiceRule3 = -1
let betAmountRule3 = 1
let previousRule3 = -1

function filterContent() {
    let rollingTime = document.getElementsByClassName("text-2xl font-bold font-numeric")
    let t
    if (rollingTime.length > 0) {
        t = rollingTime[0].innerHTML
        console.log("rolling", t)
        // const inputAmount = document.getElementsByClassName("bg-transparent w-full h-full relative z-10")[0]
        if (1 < parseFloat(t) && parseFloat(t) < 5 && IsBet == 0) {
            IsBet = 1
            white_interval = countBlack + countWhite + countYellow - previous
            // rule 1
            if ((20 <= white_interval && white_interval <= 25) || (1 <= white_interval && white_interval <= 3)) {
                bet_white()
            } else {
                myChoice = -1
            }
            //rule 2
            if ((20 <= white_interval && white_interval <= 29) || (1 <= white_interval && white_interval <= 3)) {
                bet_white_rule2()
            } else {
                myChoiceRule2 = -1
            }
            // rule 3
            bet_rule_3()
        }
    }
    if (t && t != "0.00") {
        IsIncreased = 0
    }
    if (t && t == "0.00") {
        console.log("data: ", countYellow, countBlack, countWhite)
        IsBet = 0
        let betValues = document.getElementsByClassName("whitespace-nowrap font-numeric")
        if (betValues.length > 0) {
            console.log("betValues----------------")
            for (let i = 2; i < betValues.length; i++) {
                let bv = betValues[i]
                if (bv.parentElement.innerHTML.includes('+')) {
                    if (i == 2) {
                        console.log("black win!!")
                        if (IsIncreased == 0) {
                            previousRule3 = 1
                            countBlack = countBlack + 1
                            IsIncreased = 1
                            if (myChoiceRule3 == 1) {
                                myMoneyRule3 += betAmountRule3 * 2
                                betAmountRule3 = 1
                                console.log("rule3 eat money", myMoneyRule3)
                            } else {
                                betAmountRule3 *= 2
                            }
                        }
                    }
                    if (i == 3) {
                        console.log("white win!!")
                        if (IsIncreased == 0) {
                            previousRule3 = 2
                            countWhite = countWhite + 1
                            IsIncreased = 1
                            interval = countBlack + countYellow + countWhite - previous
                            console.log("Interval: ", interval)
                            previous = countBlack + countYellow + countWhite
                            if (myChoice == 2) {
                                myMoney = myMoney + 14
                                console.log("eat money", myMoney)
                            }
                            if (myChoiceRule2 == 2) {
                                myMoneyRule2 += 14
                                console.log("rule2 eat money", myMoneyRule2)
                            }
                        }
                    }
                    if (i == 4) {
                        console.log("yellow win!!")
                        if (IsIncreased == 0) {
                            previousRule3 = 3
                            countYellow = countYellow + 1
                            IsIncreased = 1
                            if (myChoiceRule3 == 3) {
                                myMoneyRule3 += betAmountRule3 * 2
                                betAmountRule3 = 1
                                console.log("rule3 eat money", myMoneyRule3)
                            } else {
                                betAmountRule3 *= 2
                            }
                        }
                    }
                }
            }
            console.log("-------------------------")
        }
    }
}

function bet_rule_3() {
    myMoneyRule3 -= betAmountRule3
    if (previousRule3 == 1) {
        myChoiceRule3 = 1
    }
    if (previousRule3 == 3) {
        myChoiceRule3 = 3
    }
    let g = Math.floor(Math.random() * 2);
    if (g == 0) { myChoiceRule3 = 1 } else { myChoiceRule3 = 3 }
    console.log("rule3, bet:", betAmountRule3, "money left", myMoneyRule3, "choice: ", myChoiceRule3)
}

function bet_white() {
    myMoney = myMoney - 1
    myChoice = 2
    interval = countBlack + countYellow + countWhite - previous
    console.log("bet 1, money", myMoney, "interval", interval)
    // let placeBetButtons = document.getElementsByClassName("bet-btn")
    // if (choice == 2) {
    //     placeBetButtons[1].click()
    // }
    // console.log("betting ...", placeBetButtons.length, placeBetButtons)
}

function bet_white_rule2() {
    myMoneyRule2 = myMoneyRule2 - 1
    myChoiceRule2 = 2
    interval = countBlack + countYellow + countWhite - previous
    console.log("rule2, money", myMoneyRule2, "interval", interval)
}

setInterval(filterContent, 1500)