var C007_LunchBreak_Sidney_CurrentStage = 0;
var C007_LunchBreak_Sidney_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Sidney_IntroText = "";
var C007_LunchBreak_Sidney_LeaveIcon = "";
var C007_LunchBreak_Sidney_AllowSmoke = false;
var C007_LunchBreak_Sidney_CuteRemarkDone = false;
var C007_LunchBreak_Sidney_IsRoped = false;
var C007_LunchBreak_Sidney_IsGagged = false;
var C007_LunchBreak_Sidney_IsBoundAndGagged = false;
var C007_LunchBreak_Sidney_TwoRopes = false;
var C007_LunchBreak_Sidney_ConfirmEvil = false;
var C007_LunchBreak_Sidney_MasturbateCount = 0;
var C007_LunchBreak_Sidney_HateAmanda = false;
var C007_LunchBreak_Sidney_HateSarah = false;

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

	// At 340 & 350 the player can restrain Sidney while she's stoned
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) || (C007_LunchBreak_Sidney_CurrentStage == 350)) {
		var Img = "";
		if (ActorHasInventory("Rope") && !C007_LunchBreak_Sidney_TwoRopes) Img = Img + "Rope";
		if (ActorHasInventory("Rope") && C007_LunchBreak_Sidney_TwoRopes) Img = Img + "TwoRopes";
		if (ActorHasInventory("Cuffs")) Img = Img + "Cuffs";
		if (ActorHasInventory("Ballgag")) Img = Img + "Ballgag";
		if (ActorHasInventory("TapeGag")) Img = Img + "TapeGag";
		OveridenIntroImage = "SidneySit" + Img + ".jpg";
	}
	
	// Keep the status of Sindey
	C007_LunchBreak_Sidney_IsBoundAndGagged = ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("Ballgag") || ActorHasInventory("TapeGag")));
	
}

// Chapter 7 - Sidney Load
function C007_LunchBreak_Sidney_Load() {

	// Load the scene parameters
	ActorLoad("Sidney", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Sidney_CalcParams();
	
	// If the player is submissive toward Sidney, she will get bullied
	if ((ActorGetValue(ActorLove) <= 4) && (ActorGetValue(ActorSubmission) <= -2)) C007_LunchBreak_Sidney_CurrentStage = 100;

	// If Sidney had the egg from before chapter 7, there's a special intro
	if ((C007_LunchBreak_Sidney_CurrentStage == 0) && ActorHasInventory("VibratingEgg"))
		OveridenIntroText = GetText("IntroEgg");

	// If we must put the previous text back
	if ((C007_LunchBreak_Sidney_IntroText != "") && (C007_LunchBreak_Sidney_CurrentStage > 0)) {
		OveridenIntroText = C007_LunchBreak_Sidney_IntroText;
		LeaveIcon = C007_LunchBreak_Sidney_LeaveIcon;
	}

	// Special events if the player doesn't like Amanda or Sarah
	C007_LunchBreak_Sidney_HateAmanda = (ActorSpecificGetValue("Amanda", ActorLove) < 0);
	C007_LunchBreak_Sidney_HateSarah = (ActorSpecificGetValue("Sarah", ActorLove) < 0);

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

	// When the user wants to use a second rope
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Rope") && ActorHasInventory("Rope") && !ActorHasInventory("Cuffs") && !C007_LunchBreak_Sidney_TwoRopes) {
		OveridenIntroText = GetText("SecondRope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sidney_TwoRopes = true;
	}
	
	// When the user wants to use the rope
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OveridenIntroText = GetText("FirstRope");
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sidney_IsRoped = true;
	}
	
	// When the user wants to use the cuffs
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Cuffs") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OveridenIntroText = GetText("Cuffs");
		ActorAddInventory("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the ballgag
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Ballgag") && !ActorHasInventory("Ballgag")) {
		OveridenIntroText = GetText("Ballgag");
		ActorRemoveInventory("TapeGag");
		ActorAddInventory("Ballgag");
		PlayerRemoveInventory("Ballgag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sidney_IsGagged = true;
	}
	
	// When the user wants to use the tape gag
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "TapeGag") && !ActorHasInventory("TapeGag")) {
		OveridenIntroText = GetText("TapeGag");		
		C007_LunchBreak_Sidney_Ungag();
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sidney_IsGagged = true;
	}
	
	// When the user wants to use the cuffs keys
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
		OveridenIntroText = GetText("Uncuff");
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the crop
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Crop")) {
		OveridenIntroText = GetText("Crop");
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the egg
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg")) {
		OveridenIntroText = GetText("VibratingEgg");
		ActorAddInventory("VibratingEgg");
		PlayerRemoveInventory("VibratingEgg", 1);
		CurrentTime = CurrentTime + 60000;
	}	

	// When the user wants to use the collar (+20 submission and a ceremony is required)
	if ((C007_LunchBreak_Sidney_CurrentStage == 340) && (ClickInv == "Collar") && !ActorHasInventory("Collar"))
		OveridenIntroText = GetText("Collar");
		
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

// Chapter 7 - Sidney Eat Meal (Spend 20 minutes)
function C007_LunchBreak_Sidney_EatMeal() {
	CurrentTime = CurrentTime + 1200000;
}

// Chapter 7 - Sidney - Check for smoking with her
function C007_LunchBreak_Sidney_CheckForSmoke() {
	if (C007_LunchBreak_Sidney_MatchCount >= 4) {
		C007_LunchBreak_Sidney_AllowSmoke = true;
		OveridenIntroText = GetText("InviteWeed");
	}
}

// Chapter 7 - Sidney Smoke (1 minute)
function C007_LunchBreak_Sidney_Smoke() {
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sidney Remove Clothes
function C007_LunchBreak_Sidney_RemoveClothes() {
	if (ActorGetValue(ActorLove) >= 8) {
		OveridenIntroText = GetText("StripLove");
		C007_LunchBreak_Sidney_CurrentStage = 340;
	}
	if (ActorGetValue(ActorSubmission) >= 8) {
		OveridenIntroText = GetText("StripSub");
		C007_LunchBreak_Sidney_CurrentStage = 340;
	}
}

// Chapter 7 - Sidney Cute Remark
function C007_LunchBreak_Sidney_CuteRemark() {
	if (C007_LunchBreak_Sidney_CuteRemarkDone == false) {
		C007_LunchBreak_Sidney_CuteRemarkDone = true;
		ActorChangeAttitude(1, 1);
	}
}

// Chapter 7 - Sidney Untie
function C007_LunchBreak_Sidney_Untie() {
	if (ActorHasInventory("Rope")) {
		ActorRemoveInventory("Rope");
		PlayerAddInventory("Rope", 1);		
		if (C007_LunchBreak_Sidney_TwoRopes) {
			PlayerAddInventory("Rope", 1);
			C007_LunchBreak_Sidney_TwoRopes = false;
		}
		C007_LunchBreak_Sidney_IsRoped = false;
	}
}

// Chapter 7 - Sidney Ungag
function C007_LunchBreak_Sidney_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("Ballgag")) {
		ActorRemoveInventory("Ballgag");
		PlayerAddInventory("Ballgag", 1);
	}
	C007_LunchBreak_Sidney_IsGagged = false;
}

// Chapter 7 - Sidney Release
function C007_LunchBreak_Sidney_Release() {
	C007_LunchBreak_Sidney_Untie();
	C007_LunchBreak_Sidney_Ungag();	
	if (ActorHasInventory("Cuffs")) {
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
	}
}

// Chapter 7 - Sidney Masturbate
function C007_LunchBreak_Sidney_Masturbate() {
	C007_LunchBreak_Sidney_MasturbateCount++;
	if (C007_LunchBreak_Sidney_MasturbateCount == 3) {
		C007_LunchBreak_Sidney_CurrentStage = "350";
		OveridenIntroText = GetText("ReadyForOrgasm");		
	} else {
		if (ActorGetValue(ActorLove) >= ActorGetValue(ActorSubmission)) OveridenIntroText = GetText("MasturbateLove");
		else OveridenIntroText = GetText("MasturbateSub");
	}
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

// Chapter 7 - Sidney Orgasm
function C007_LunchBreak_Sidney_Orgasm() {
	ActAddOrgasm();
	C007_LunchBreak_ActorSelect_BonusDone = true;
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sidney No Orgasm
function C007_LunchBreak_Sidney_NoOrgasm() {
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sidney Start Beat Up - adds 5 minutes and cancels the bonus
function C007_LunchBreak_Sidney_StartBeatUp() {
	C007_LunchBreak_ActorSelect_BonusDone = false;
	CurrentTime = CurrentTime + 300000;
}

// Chapter 7 - Tie Up Amanda or Sarah
function C007_LunchBreak_Sidney_TieUp(TieUpActor) {
	ActorSpecificAddBondage(TieUpActor);
}

// Chapter 7 - Beat Up Amanda or Sarah
function C007_LunchBreak_Sidney_BeatUp(BeatUpActor) {
	ActorSpecificChangeAttitude(BeatUpActor, -1, 1);
}

// Chapter 7 - Crime Stranded (When the player leaves Amanda or Sarah bound and gagged in Sidney's chapter)
function C007_LunchBreak_Sidney_CrimeStranded(CrimeActor) {
	Common_PlayerCrime = CrimeActor + "Stranded";
	C007_LunchBreak_ActorSelect_EvilEnding = true;
	ActorSpecificChangeAttitude(CrimeActor, -3, 1);
	C007_LunchBreak_Sidney_EndChapter();
}

// Chapter 7 - Sidney End Chapter
function C007_LunchBreak_Sidney_EndChapter() {
	C007_LunchBreak_Sidney_Release();
	SetScene(CurrentChapter, "Outro");
}