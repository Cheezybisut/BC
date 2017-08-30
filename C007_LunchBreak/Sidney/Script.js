var C007_LunchBreak_Sidney_CurrentStage = 0;
var C007_LunchBreak_Sidney_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Sidney_IntroText = "";
var C007_LunchBreak_Sidney_LeaveIcon = "";

// Calculates the screen parameters
function C007_LunchBreak_Sidney_CalcParams() {

	// No special images by default
	OveridenIntroImage = "";
	
	// Between 200 and 299, the image evolves with the number of matches
	if ((C007_LunchBreak_Sidney_CurrentStage >= 200) && (C007_LunchBreak_Sidney_CurrentStage <= 299)) {
		var Img = "0";
		if ((C007_LunchBreak_Sidney_MatchCount == 2) || (C007_LunchBreak_Sidney_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Sidney_MatchCount >= 4) Img = "2";
		OveridenIntroImage = "SidneyPlayerLunch" + Img + ".jpg";
	}

}

// Chapter 7 - Sidney Load
function C007_LunchBreak_Sidney_Load() {

	// Load the scene parameters
	ActorLoad("Sidney", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Sidney_CalcParams();
	
	// If the player is submissive toward Sidney, she will get bullied
	if ((ActorGetValue(ActorLove) <= 4) && (ActorGetValue(ActorSubmission) <= -2)) C007_LunchBreak_Sidney_CurrentStage = 100;

	// If we must put the previous text back
	if ((C007_LunchBreak_Sidney_IntroText != "") && (C007_LunchBreak_Sidney_CurrentStage > 0)) {
		OveridenIntroText = C007_LunchBreak_Sidney_IntroText;
		LeaveIcon = C007_LunchBreak_Sidney_LeaveIcon;
	}

}

// Chapter 7 - Sidney Run
function C007_LunchBreak_Sidney_Run() {
	BuildInteraction(C007_LunchBreak_Sidney_CurrentStage);
}

// Chapter 7 - Sidney Click
function C007_LunchBreak_Sidney_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Sidney_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Sidney_IntroText = OveridenIntroText;
		C007_LunchBreak_Sidney_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

	// Recalculates the scene parameters
	C007_LunchBreak_Sidney_CalcParams();

}

// Chapter 7 - Sidney No Leave
function C007_LunchBreak_Sidney_NoLeave() {
	LeaveIcon = "";
}

// Chapter 7 - Sidney End Lunch
function C007_LunchBreak_Sidney_EndLunch() {
	C007_LunchBreak_ActorSelect_SidneyAvail = false;
	LeaveIcon = "Leave";
}

// Chapter 7 - Sidney - The player is stuck in the pillory
function C007_LunchBreak_Sidney_Pillory() {
	C007_LunchBreak_ActorSelect_NoFood = true;
	C007_LunchBreak_ActorSelect_Actor = "Sidney";
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
}

// Chapter 7 - Sidney Pillory Wait - She comes back at 12:40
function C007_LunchBreak_Sidney_PilloryWait() {
	CurrentTime = CurrentTime + 120000;
	if (CurrentTime >= 12.66667 * 60 * 60 * 1000) {
		OveridenIntroText = GetText("Extortion");
		C007_LunchBreak_Sidney_CurrentStage = 170;
	}	
}

// Chapter 7 - Sidney - The player is free from the pillory
function C007_LunchBreak_Sidney_PilloryFree() {
	PlayerRestoreAllInventory();
}

// Chapter 7 - Sidney Start Lunch
function C007_LunchBreak_Sidney_StartLunch() {	
	CurrentTime = CurrentTime + 480000;
	LeaveIcon = "";
}

// Chapter 7 - Sidney Good Match
function C007_LunchBreak_Sidney_GoodMatch() {
	C007_LunchBreak_Sidney_MatchCount++;
	C007_LunchBreak_Sidney_CalcParams();
}

// Chapter 7 - Sidney Bad Match
function C007_LunchBreak_Sidney_BadMatch() {
	C007_LunchBreak_Sidney_MatchCount--;
	C007_LunchBreak_Sidney_CalcParams();
}

// Chapter 7 - Sidney Evil End Chapter (Leave her bound and gagged)
function C007_LunchBreak_Sidney_EvilEnd() {
	if (C007_LunchBreak_Sidney_ConfirmEvil) {
		C007_LunchBreak_ActorSelect_EvilEnding = true;
		Common_PlayerCrime = "SidneyStranded";
		ActorChangeAttitude(-5, 1);
		SetScene(CurrentChapter, "Outro");
	} else {
		OveridenIntroText = GetText("LeaveBoundAndGagged");
		C007_LunchBreak_Sidney_ConfirmEvil = true;
	}
}

// Chapter 7 - Sidney End Chapter
function C007_LunchBreak_Sidney_EndChapter() {
	SetScene(CurrentChapter, "Outro");
}