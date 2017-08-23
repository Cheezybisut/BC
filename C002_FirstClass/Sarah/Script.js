var C002_FirstClass_Sarah_CurrentStage = 0;
var C002_FirstClass_Sarah_BackupStage = 0;
var C002_FirstClass_Sarah_SubdueSuccess = false;
var C002_FirstClass_Sarah_SubdueNotDone = true;
var C002_FirstClass_Sarah_CropDone = false;
var C002_FirstClass_Sarah_BondageHugReady = false;
var C002_FirstClass_Sarah_BondageHugDone = false;
var C002_FirstClass_Sarah_BondageDuoDone = false;

// Calculate the current Sarah stage
function C002_FirstClass_Sarah_CalcStage() {

	// Keep the backup stage to resume conversation
	var EntryStage = C002_FirstClass_Sarah_CurrentStage;
	if (C002_FirstClass_Sarah_CurrentStage < 100) C002_FirstClass_Sarah_BackupStage = C002_FirstClass_Sarah_CurrentStage;
	
	// Calculate the correct stage (100 comes back to the previous conversation)
	if (C002_FirstClass_Sarah_CurrentStage <= 150) {
		C002_FirstClass_Sarah_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		if (C002_FirstClass_Sarah_CurrentStage == 100) C002_FirstClass_Sarah_CurrentStage = C002_FirstClass_Sarah_BackupStage;
	}

	// If the stage changed, we scrap the overiden image
	if (EntryStage != C002_FirstClass_Sarah_CurrentStage) OveridenIntroImage = "";
	
	// The bondage hug is only available if Amanda and Sarah are in ropes
	C002_FirstClass_Sarah_BondageHugReady = ((C002_FirstClass_Sarah_CurrentStage > 100) && (C002_FirstClass_Sarah_CurrentStage < 200) && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (ActorSpecificHasInventory("Amanda", "Rope")) && (ActorSpecificHasInventory("Sarah", "Rope")));

	// In bondage hug, the image can vary
	if ((C002_FirstClass_Sarah_CurrentStage == 160) || (C002_FirstClass_Sarah_CurrentStage == 170)) {
		OveridenIntroImage = "";
		if ((ActorSpecificHasInventory("Amanda", "Ballgag")) && (ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Ballgag_Sarah_Rope_Ballgag.jpg";
		if ((ActorSpecificHasInventory("Amanda", "Ballgag")) && (!ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Ballgag_Sarah_Rope.jpg";
		if ((!ActorSpecificHasInventory("Amanda", "Ballgag")) && (ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Sarah_Rope_Ballgag.jpg";
		if ((!ActorSpecificHasInventory("Amanda", "Ballgag")) && (!ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Sarah_Rope.jpg";
	}
	
}

// Chapter 2 - Sarah Load
function C002_FirstClass_Sarah_Load() {

	// Load the scene parameters	
	ActorLoad("Sarah", "Classroom");
	LoadInteractions();

	// Jumps to the correct stage
	C002_FirstClass_Sarah_SubdueSuccess = ((C002_FirstClass_Classroom_MildredSubdueSuccess) && !C002_FirstClass_Classroom_MildredSubdueFailed && Common_PlayerNotGagged);
	C002_FirstClass_Sarah_SubdueNotDone = (!C002_FirstClass_Sarah_SubdueSuccess && Common_PlayerNotGagged);
	if ((C002_FirstClass_Classroom_MildredSubdueFailed) && (C002_FirstClass_Sarah_CurrentStage == 0)) C002_FirstClass_Sarah_CurrentStage = 200;
	if ((C002_FirstClass_Classroom_MildredSubdueFailed) && !ActorHasInventory("Ballgag") && (C002_FirstClass_Sarah_CurrentStage > 0) && (C002_FirstClass_Sarah_CurrentStage < 100)) C002_FirstClass_Sarah_CurrentStage = 240;
	if ((C002_FirstClass_Classroom_MildredSubdueFailed) && ActorHasInventory("Ballgag") && (C002_FirstClass_Sarah_CurrentStage > 0) && (C002_FirstClass_Sarah_CurrentStage < 100)) C002_FirstClass_Sarah_CurrentStage = 260;

	// The bondage hug is only available if Amanda and Sarah are in ropes
	if (C002_FirstClass_Sarah_CurrentStage == 160) { C002_FirstClass_Sarah_CurrentStage = 140; C002_FirstClass_Sarah_CalcStage(); }
	if (C002_FirstClass_Sarah_CurrentStage == 170) { C002_FirstClass_Sarah_CurrentStage = 150; C002_FirstClass_Sarah_CalcStage(); }
	C002_FirstClass_Sarah_BondageHugReady = ((C002_FirstClass_Sarah_CurrentStage > 100) && (C002_FirstClass_Sarah_CurrentStage < 200) && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (ActorSpecificHasInventory("Amanda", "Rope")) && (ActorSpecificHasInventory("Sarah", "Rope")));

}

// Chapter 2 - Sarah Run
function C002_FirstClass_Sarah_Run() {
	BuildInteraction(C002_FirstClass_Sarah_CurrentStage);
}

// Chapter 2 - Sarah Click
function C002_FirstClass_Sarah_Click() {	

	// Regular interactions
	ClickInteraction(C002_FirstClass_Sarah_CurrentStage);
	var ClickedInv = GetClickedInventory();

	// If the player wants to gag Sarah
	if ((ClickedInv == "Ballgag") && (ActorHasInventory("Ballgag") == false) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (Common_PlayerNotRestrained)) {
		OveridenIntroText = GetText("Ballgag");
		PlayerRemoveInventory("Ballgag", 1);
		ActorAddInventory("Ballgag");
		if (C002_FirstClass_Sarah_CurrentStage == 160) C002_FirstClass_Sarah_CurrentStage = 170;
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to cuff Sarah
	if ((ClickedInv == "Cuffs") && (ActorHasInventory("Cuffs") == false) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (Common_PlayerNotRestrained)) {
		if (ActorHasInventory("Rope")) { OveridenIntroText = GetText("CuffsReplaceRope"); PlayerAddInventory("Rope", 1); ActorRemoveInventory("Rope"); }
		else OveridenIntroText = GetText("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		ActorAddInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to uncuff Sarah
	if ((ClickedInv == "CuffsKey") && (ActorHasInventory("Cuffs") == true) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (Common_PlayerNotRestrained)) {
		OveridenIntroText = GetText("Unlock");
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to rope Sarah
	if ((ClickedInv == "Rope") && (ActorHasInventory("Rope") == false) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (Common_PlayerNotRestrained)) {
		if (ActorHasInventory("Cuffs")) { OveridenIntroText = GetText("RopeReplaceCuffs"); PlayerAddInventory("Cuffs", 1); ActorRemoveInventory("Cuffs"); }
		else OveridenIntroText = GetText("Rope");
		PlayerRemoveInventory("Rope", 1);
		ActorAddInventory("Rope");
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to crop Sarah
	if ((ClickedInv == "Crop") && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (Common_PlayerNotRestrained)) {
		if (ActorHasInventory("Ballgag")) OveridenIntroText = GetText("CropGagged");
		else OveridenIntroText = GetText("Crop");
		if (C002_FirstClass_Sarah_CropDone == false) { C002_FirstClass_Sarah_CropDone = true; ActorChangeAttitude(1, 1); }
		CurrentTime = CurrentTime + 60000;
	}

	// Recalculate the stage
	C002_FirstClass_Sarah_CalcStage();
	
}

// Chapter 2 - Sarah Ungag
function C002_FirstClass_Sarah_Ungag() {
	PlayerAddInventory("Ballgag", 1);
	ActorRemoveInventory("Ballgag");
}

// Chapter 2 - Sarah Untie
function C002_FirstClass_Sarah_Untie() {
	PlayerAddInventory("Rope", 1);
	ActorRemoveInventory("Rope");
}

// Chapter 2 - Sarah Agrees to Help
function C002_FirstClass_Sarah_AgreeHelp() {
	C002_FirstClass_Classroom_SarahAgree = true;
}

// Chapter 2 - Sarah AnnoyMildred to Help
function C002_FirstClass_Sarah_AnnoyMildred() {
	ActorAddInventory("Cuffs");
	ActorAddInventory("Ballgag");
}

// Chapter 2 - Sarah Bondage Hug 
function C002_FirstClass_Sarah_BondageHug() {
	C002_FirstClass_Sarah_CalcStage();
	if (C002_FirstClass_Sarah_BondageHugDone == false) { C002_FirstClass_Sarah_BondageHugDone = true; ActorChangeAttitude(1, 0); }
}

// Chapter 2 - Sarah Separate from Amanda hug
function C002_FirstClass_Sarah_Separate() {
	OveridenIntroImage = "";
}

// Chapter 2 - Sarah Bondage Duo Comment
function C002_FirstClass_Sarah_BondageDuo() {
	if (C002_FirstClass_Sarah_BondageDuoDone == false) { C002_FirstClass_Sarah_BondageDuoDone = true; ActorChangeAttitude(0, 1); }
}
