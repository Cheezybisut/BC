var C007_LunchBreak_Sarah_CurrentStage = 0;
var C007_LunchBreak_Sarah_NoOption = false; // NoOption means that there's no options to go eat with her
var C007_LunchBreak_Sarah_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Sarah_IntroText = "";
var C007_LunchBreak_Sarah_LeaveIcon = "";

// Calculates the screen parameters
function C007_LunchBreak_Sarah_CalcParams() {

	// Check if there's no options to go eat
	C007_LunchBreak_Sarah_NoOption = ((ActorGetValue(ActorLove) < 5) && (ActorGetValue(ActorSubmission) < 5));

	// No special images by default
	OveridenIntroImage = "";
	
	// Between 100 and 200, the image evolves with the number of matches
	if ((C007_LunchBreak_Sarah_CurrentStage >= 100) && (C007_LunchBreak_Sarah_CurrentStage < 160)) {
		var Img = "0";
		if ((C007_LunchBreak_Sarah_MatchCount == 2) || (C007_LunchBreak_Sarah_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Sarah_MatchCount >= 4) Img = "2";
		OveridenIntroImage = "SarahPlayerLunch" + Img + ".jpg";
	}

}

// Chapter 7 - Sarah Load
function C007_LunchBreak_Sarah_Load() {

	// Load the scene parameters
	ActorLoad("Sarah", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Sarah_CalcParams();
	
	// If Sarah doesn't like the player and isn't subbie enough, she leaves and don't talk
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 2)) {
		C007_LunchBreak_Sarah_CurrentStage = 5;
		C007_LunchBreak_ActorSelect_SarahAvail = false;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Sarah_IntroText != "") && (C007_LunchBreak_Sarah_CurrentStage > 0)) {
		OveridenIntroText = C007_LunchBreak_Sarah_IntroText;
		LeaveIcon = C007_LunchBreak_Sarah_LeaveIcon;
	}

}

// Chapter 7 - Sarah Run
function C007_LunchBreak_Sarah_Run() {
	BuildInteraction(C007_LunchBreak_Sarah_CurrentStage);
}

// Chapter 7 - Sarah Click
function C007_LunchBreak_Sarah_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Sarah_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Sarah_IntroText = OveridenIntroText;
		C007_LunchBreak_Sarah_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

	// Recalculates the scene parameters
	C007_LunchBreak_Sarah_CalcParams();

}

// Chapter 7 - Sarah No Leave
function C007_LunchBreak_Sarah_NoLeave() {
	LeaveIcon = "";
}

// Chapter 7 - Sarah Start Lunch
function C007_LunchBreak_Sarah_StartLunch() {	
	CurrentTime = CurrentTime + 480000;
	LeaveIcon = "";
}

// Chapter 7 - Sarah End Lunch
function C007_LunchBreak_Sarah_EndLunch() {
	C007_LunchBreak_ActorSelect_SarahAvail = false;
}

// Chapter 7 - Sarah Good Match
function C007_LunchBreak_Sarah_GoodMatch() {
	C007_LunchBreak_Sarah_MatchCount++;
	C007_LunchBreak_Sarah_CalcParams();
}

// Chapter 7 - Sarah Bad Match
function C007_LunchBreak_Sarah_BadMatch() {
	C007_LunchBreak_Sarah_MatchCount--;
	C007_LunchBreak_Sarah_CalcParams();
}