//TODO: take into account if a user reviews the card to early - e.g. a user shouldn't be able to click "All the way baby" 5 times
function calculateMinutesTilNextReview(interactionsList){
    var minutesTilNextReview;
    const numInteractions = interactionsList.length

    const mostRecentInteraction = interactionsList[numInteractions - 1]
    switch (getProficiencyCategory(mostRecentInteraction.proficiency)){
        case USER_SUCKS:
            minutesTilNextReview = 2;
            break;
        case USER_OK:
            minutesTilNextReview = 10;
            break;
        case USERS_AIGHT:
            minutesTilNextReview = 30 ;
            break;
        case DAYYYAAAMN:
            minutesTilNextReview = 60 * 24; // 1 day
            for (let i = numInteractions - 1 - 1; i > 0; i--){ // for every DAYYYAAAMN in a row the user got, multiply the time til next review by 5
                var interaction = interactionsList[i]
                var proficiencyCategory = getProficiencyCategory(interaction.proficiency);
                if (proficiencyCategory === DAYYYAAAMN){
                    minutesTilNextReview *= 5; //hot diggity
                } else {
                    break;
                }

            }
    }
    return minutesTilNextReview;
}
export function calculateMillisecondsTilNextReview(interactionsList){
   return calculateMinutesTilNextReview(interactionsList) * 60 * 1000
}
const USER_SUCKS = 1
const USER_OK = 2
const USERS_AIGHT = 3
const DAYYYAAAMN = 4

function getProficiencyCategory(proficiency){
    //0 to 32
    if (proficiency < 33) {
        return USER_SUCKS
    }
    //33 to 65
    else if (proficiency < 66) {
        return USER_OK
    }
    //66 to 94
    else if (proficiency < 95){
        return USERS_AIGHT
    }
    //95 to 100
    else {
        return DAYYYAAAMN
    }
}