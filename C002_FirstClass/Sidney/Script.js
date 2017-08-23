var C002_FirstClass_Sidney_CurrentStage = 0;
var C002_FirstClass_Sidney_BowRemarkReady = true;
var C002_FirstClass_Sidney_PlayerHasRope = false;
var C002_FirstClass_Sidney_SubdueRemarkReady = false;
var C002_FirstClass_Sidney_BondageBefore = false;
var C002_FirstClass_Sidney_AmandaWhipReady = false;
var C002_FirstClass_Sidney_SarahWhipReady = false;
var C002_FirstClass_Sidney_AmandaWhipDone = false;
var C002_FirstClass_Sidney_SarahWhipDone = false;

// Change the Amanda and Sarah variables
function C002_FirstClass_Sidney_AmandaSarahVariables() {	
	C002_FirstClass_Sidney_AmandaWhipReady = ((C002_FirstClass_Sidney_CurrentStage == 100) && (Common_PlayerNotGagged) && (Common_PlayerNotRestrained) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (C002_FirstClass_Sidney_AmandaWhipDone == false) && (PlayerHasInventory("Crop")) && ((ActorSpecificHasInventory("Amanda", "Rope")) || (ActorSpecificHasInventory("Amanda", "Cuffs"))));
	C002_FirstClass_Sidney_SarahWhipReady = ((C002_FirstClass_Sidney_CurrentStage == 100) && (Common_PlayerNotGagged) && (Common_PlayerNotRestrained) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (C002_FirstClass_Sidney_SarahWhipDone == false) && (PlayerHasInventory("Crop")) && ((ActorSpecificHasInventory("Sarah", "Rope")) || (ActorSpecificHasInventory("Sarah", "Cuffs"))));
}

// Chapter 2 - Sidney Load
function C002_FirstClass_Sidney_Load() {

	// Load the scene parameters	
	ActorLoad("Sidney", "Classroom");
	LoadInteractions();
	C002_FirstClass_Sidney_PlayerHasRope = PlayerHasInventory("Rope");
	if (C002_FirstClass_Classroom_MildredSubdueSuccess) C002_FirstClass_Sidney_BowRemarkReady = false;
	C002_FirstClass_Sidney_BondageBefore = (ActorGetValue(ActorBondageCount) > 0);
	
	// Stage jumps depending on actor bondage if subdue was tried
	if ((C002_FirstClass_Classroom_MildredSubdueFailed) || (C002_FirstClass_Classroom_MildredSubdueSuccess)) {
		if ((parseInt(C002_FirstClass_Sidney_CurrentStage) < 100) && (Common_PlayerNotGagged) && (C002_FirstClass_Classroom_MildredSubdueSuccess)) C002_FirstClass_Sidney_SubdueRemarkReady = true;
		C002_FirstClass_Sidney_CurrentStage = C002_FirstClass_Classroom_CalcStage();
	}

	// The remark cannot be done if the player is gagged, also check for Amanda and Sarah variables
	if (Common_PlayerGagged) C002_FirstClass_Sidney_SubdueRemarkReady = false;
	C002_FirstClass_Sidney_AmandaSarahVariables();

	// Sidney can steal the key from the player
	if ((C002_FirstClass_Sidney_CurrentStage == 100) && (PlayerHasLockedInventory("Cuffs")) && (PlayerHasInventory("CuffsKey")) && (C002_FirstClass_Classroom_MildredSubdueSuccess)) {
		OveridenIntroText = GetText("StealKeys");
		PlayerRemoveInventory("CuffsKey", 1);
		ActorChangeAttitude(0, -2);
		C002_FirstClass_Sidney_SubdueRemarkReady = false;
	}

}

// Chapter 2 - Sidney Run
function C002_FirstClass_Sidney_Run() {
	BuildInteraction(C002_FirstClass_Sidney_CurrentStage);
}

// Chapter 2 - Sidney Click
function C002_FirstClass_Sidney_Click() {	

	// Keep the stage on entry
	var EntryStage = C002_FirstClass_Sidney_CurrentStage;

	// Regular interactions
	ClickInteraction(C002_FirstClass_Sidney_CurrentStage);	
	var ClickedInv = GetClickedInventory();
	
	// If the player wants to gag Sidney
	if ((C002_FirstClass_Sidney_CurrentStage >= 100) && (ClickedInv == "Ballgag") && (ActorHasInventory("Ballgag") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Rope")) || (ActorHasInventory("Cuffs"))) {
			if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = GetText("BallgagWilling");
			else OveridenIntroText = GetText("BallgagReluctant");
			PlayerRemoveInventory("Ballgag", 1);
			ActorAddInventory("Ballgag");
			C002_FirstClass_Sidney_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = GetText("BallgagRefuse");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to cuff Sidney
	if ((C002_FirstClass_Sidney_CurrentStage >= 100) && (ClickedInv == "Cuffs") && (ActorHasInventory("Cuffs") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Rope"))) {
			if (ActorHasInventory("Rope")) { OveridenIntroText = GetText("CuffsReplaceRope"); PlayerAddInventory("Rope", 1); ActorRemoveInventory("Rope"); }
			else if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = GetText("CuffsWilling");
			else OveridenIntroText = GetText("CuffsReluctant");
			PlayerRemoveInventory("Cuffs", 1);
			ActorAddInventory("Cuffs");
			C002_FirstClass_Sidney_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = GetText("CuffsRefuse");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to uncuff Sidney
	if ((C002_FirstClass_Sidney_CurrentStage >= 100) && (ClickedInv == "CuffsKey") && (ActorHasInventory("Cuffs") == true) && (Common_PlayerNotRestrained)) {
		OveridenIntroText = GetText("CuffsUnlock");
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		C002_FirstClass_Sidney_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to rope Sidney
	if ((C002_FirstClass_Sidney_CurrentStage >= 100) && (ClickedInv == "Rope") && (ActorHasInventory("Rope") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Cuffs"))) {
			if (ActorHasInventory("Cuffs")) { OveridenIntroText = GetText("RopeReplaceCuffs"); PlayerAddInventory("Cuffs", 1); ActorRemoveInventory("Cuffs"); }
			else if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = GetText("RopeWilling");
			else OveridenIntroText = GetText("RopeReluctant");
			PlayerRemoveInventory("Rope", 1);
			ActorAddInventory("Rope");
			C002_FirstClass_Sidney_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = GetText("RopeRefuse");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to crop Sidney
	if ((C002_FirstClass_Sidney_CurrentStage >= 100) && (ClickedInv == "Crop") && (Common_PlayerNotRestrained)) {
		if (ActorHasInventory("Ballgag")) OveridenIntroText = GetText("CropGagged");
		else OveridenIntroText = GetText("Crop");
		CurrentTime = CurrentTime + 60000;
	}

	// If the stage changed, we remove the overiden image, also recalculates the Amanda and Sarah variables
	if (EntryStage != C002_FirstClass_Sidney_CurrentStage) OveridenIntroImage = "";
	C002_FirstClass_Sidney_AmandaSarahVariables();

}

// Chapter 2 - Sidney Ungag
function C002_FirstClass_Sidney_Ungag() {
	PlayerAddInventory("Ballgag", 1);
	ActorRemoveInventory("Ballgag");
}

// Chapter 2 - Sidney Untie
function C002_FirstClass_Sidney_Untie() {
	PlayerAddInventory("Rope", 1);
	ActorRemoveInventory("Rope");
}

// Chapter 2 - Sidney Bow Remark
function C002_FirstClass_Sidney_BowRemark() {
	C002_FirstClass_Sidney_BowRemarkReady = false;
}

// Chapter 2 - Sidney Subdue Remark
function C002_FirstClass_Sidney_SubdueRemark() {
	C002_FirstClass_Sidney_SubdueRemarkReady = false;
}

// Chapter 2 - Sidney Agrees to Help
function C002_FirstClass_Sidney_AgreeHelp() {
	C002_FirstClass_Classroom_SidneyAgree = true;
	if (C002_FirstClass_Sidney_PlayerHasRope == false) PlayerAddInventory("Rope", 2);
}

// Chapter 2 - Sidney Whip Amanda
function C002_FirstClass_Sidney_AmandaWhip() {
	OveridenIntroImage = "Sidney_Crop.jpg";
	C002_FirstClass_Sidney_AmandaWhipDone = true;
	C002_FirstClass_Sidney_AmandaSarahVariables();
}

// Chapter 2 - Sidney Whip Sarah
function C002_FirstClass_Sidney_SarahWhip() {
	OveridenIntroImage = "Sidney_Crop.jpg";
	C002_FirstClass_Sidney_SarahWhipDone = true;
	C002_FirstClass_Sidney_AmandaSarahVariables();	
}