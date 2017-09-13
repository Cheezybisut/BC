var C007_LunchBreak_Jennifer_CurrentStage = 0;
var C007_LunchBreak_Jennifer_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Jennifer_IntroText = "";
var C007_LunchBreak_Jennifer_LeaveIcon = "";
var C007_LunchBreak_Jennifer_NoOption = false;
var C007_LunchBreak_Jennifer_HasEgg = false;
var C007_LunchBreak_Jennifer_EggRemarkAvail = false;
var C007_LunchBreak_Jennifer_EggRemarkDone = false;
var C007_LunchBreak_Jennifer_TennisDifficulty = "";
var C007_LunchBreak_Jennifer_TennisVictory = false;

// Calculates the screen parameters
function C007_LunchBreak_Jennifer_CalcParams() {

	// No special images by default
	OveridenIntroImage = "";

	// Between 100 and 199, the image evolves with the number of matches
	if ((C007_LunchBreak_Jennifer_CurrentStage >= 100) && (C007_LunchBreak_Jennifer_CurrentStage <= 199)) {
		var Img = "0";
		if ((C007_LunchBreak_Jennifer_MatchCount == 2) || (C007_LunchBreak_Jennifer_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Jennifer_MatchCount >= 4) Img = "2";
		OveridenIntroImage = "JenniferPlayerLunch" + Img + ".jpg";
	}
	
	// If love and submission are below 4, there's no option for lunch
	C007_LunchBreak_Jennifer_NoOption = ((ActorGetValue(ActorLove) <= 3) && (ActorGetValue(ActorSubmission) <= 3));
	C007_LunchBreak_Jennifer_HasEgg = ActorHasInventory("VibratingEgg");

}

// Chapter 7 - Jennifer Load
function C007_LunchBreak_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Jennifer_CalcParams();
	
	// If Jennifer doesn't like the player, she will run away from the start
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 3)) {
		OveridenIntroText = GetText("SkipIntro");
		C007_LunchBreak_Jennifer_CurrentStage = 90;
		C007_LunchBreak_ActorSelect_JenniferAvail = false;
	}

	// If Jennifer had the egg from before chapter 7, there's a special intro
	if ((C007_LunchBreak_Jennifer_CurrentStage == 0) && ActorHasInventory("VibratingEgg")) {
		OveridenIntroText = GetText("IntroEgg");
		C007_LunchBreak_Jennifer_EggRemarkAvail = !C007_LunchBreak_Jennifer_EggRemarkDone;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Jennifer_IntroText != "") && (C007_LunchBreak_Jennifer_CurrentStage > 0)) {
		OveridenIntroText = C007_LunchBreak_Jennifer_IntroText;
		LeaveIcon = C007_LunchBreak_Jennifer_LeaveIcon;
	}

	// From lunch an up, the player cannot leave directly
	if (C007_LunchBreak_Jennifer_CurrentStage >= 100) {
		LeaveIcon = "";		
	}

}

// Chapter 7 - Jennifer Run
function C007_LunchBreak_Jennifer_Run() {
	BuildInteraction(C007_LunchBreak_Jennifer_CurrentStage);
}

// Chapter 7 - Jennifer Click
function C007_LunchBreak_Jennifer_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Jennifer_IntroText = OveridenIntroText;
		C007_LunchBreak_Jennifer_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
		
	// Recalculates the scene parameters
	C007_LunchBreak_Jennifer_CalcParams();

}

// Chapter 7 - Jennifer Egg Remark
function C007_LunchBreak_Jennifer_EggRemark() {
	C007_LunchBreak_Jennifer_EggRemarkDone = true;
	C007_LunchBreak_Jennifer_EggRemarkAvail = false;
}

// Chapter 7 - Jennifer End Lunch
function C007_LunchBreak_Jennifer_EndLunch() {
	C007_LunchBreak_ActorSelect_JenniferAvail = false;
}

// Chapter 7 - Jennifer Play Tennis (adds 5 minutes)
function C007_LunchBreak_Jennifer_PlayTennis(Difficulty) {
	CurrentTime = CurrentTime + 300000;
	C007_LunchBreak_Jennifer_IntroText = "";
	C007_LunchBreak_Jennifer_LeaveIcon = "";
	PlayerClothes("Tennis");
	C007_LunchBreak_Jennifer_TennisDifficulty = Difficulty;
	SetScene(CurrentChapter, "JenniferTennis");
}

// Chapter 7 - Jennifer Good Match
function C007_LunchBreak_Jennifer_GoodMatch() {
	C007_LunchBreak_Jennifer_MatchCount++;
	C007_LunchBreak_Jennifer_CalcParams();
}

// Chapter 7 - Jennifer Bad Match
function C007_LunchBreak_Jennifer_BadMatch() {
	C007_LunchBreak_Jennifer_MatchCount--;
	C007_LunchBreak_Jennifer_CalcParams();
}
