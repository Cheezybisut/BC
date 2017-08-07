var C002_FirstClass_Amanda_CurrentStage = 0;
var C002_FirstClass_Amanda_BowRemarkReady = true;
var C002_FirstClass_Amanda_SubdueRemarkReady = false;
var C002_FirstClass_Amanda_CropDone = false;
var C002_FirstClass_Amanda_BondageHugReady = false;
var C002_FirstClass_Amanda_BondageHugDone = false;
var C002_FirstClass_Amanda_BondageBefore = false;
var C002_FirstClass_Amanda_TickleDone = false;
var C002_FirstClass_Amanda_KissSarahDone = false;

// Chapter 2 - Amanda Load
function C002_FirstClass_Amanda_Load() {

	// Load the scene parameters	
	ActorLoad("Amanda", "Classroom");
	LoadInteractions();
	if (C002_FirstClass_Classroom_MildredSubdueSuccess) C002_FirstClass_Amanda_BowRemarkReady = false;
	C002_FirstClass_Amanda_BondageBefore = (ActorGetValue(ActorBondageCount) > 0);

	// Stage jumps depending on actor bondage if subdue was tried
	if ((C002_FirstClass_Classroom_MildredSubdueFailed) || (C002_FirstClass_Classroom_MildredSubdueSuccess)) {
		if ((parseInt(C002_FirstClass_Amanda_CurrentStage) < 100) && (C002_FirstClass_Classroom_MildredSubdueSuccess)) C002_FirstClass_Amanda_SubdueRemarkReady = true;
		C002_FirstClass_Amanda_CurrentStage = C002_FirstClass_Classroom_CalcStage();
	}
	
	// The remark cannot be done if the player is gagged, also calculate the bondage hug
	if (Common_PlayerGagged) C002_FirstClass_Amanda_SubdueRemarkReady = false;
	C002_FirstClass_Amanda_BondageHugReady = ((C002_FirstClass_Amanda_CurrentStage > 100) && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (ActorSpecificHasInventory("Amanda", "Rope")) && (ActorSpecificHasInventory("Sarah", "Rope")));

}

// Chapter 2 - Amanda Run
function C002_FirstClass_Amanda_Run() {
	
	// Regular interactions
	BuildInteraction(C002_FirstClass_Amanda_CurrentStage);
	
	// Bondage hug
	if ((C002_FirstClass_Amanda_CurrentStage == 160) || (C002_FirstClass_Amanda_CurrentStage == 170)) {
		OveridenIntroImage = "";
		if ((ActorSpecificHasInventory("Amanda", "Ballgag")) && (ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Ballgag_Sarah_Rope_Ballgag.jpg";
		if ((ActorSpecificHasInventory("Amanda", "Ballgag")) && (!ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Ballgag_Sarah_Rope.jpg";
		if ((!ActorSpecificHasInventory("Amanda", "Ballgag")) && (ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Sarah_Rope_Ballgag.jpg";
		if ((!ActorSpecificHasInventory("Amanda", "Ballgag")) && (!ActorSpecificHasInventory("Sarah", "Ballgag"))) OveridenIntroImage = "Hug_Amanda_Rope_Sarah_Rope.jpg";		
	}
	
}

// Chapter 2 - Amanda Click
function C002_FirstClass_Amanda_Click() {	

	// Keep the stage on entry
	var EntryStage = C002_FirstClass_Amanda_CurrentStage;

	// Regular interactions
	ClickInteraction(C002_FirstClass_Amanda_CurrentStage);
	var ClickedInv = GetClickedInventory();
	
	// If the player wants to gag Amanda
	if ((C002_FirstClass_Amanda_CurrentStage >= 100) && (ClickedInv == "Ballgag") && (ActorHasInventory("Ballgag") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Rope")) || (ActorHasInventory("Cuffs"))) {
			if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = "(She opens wide for you to push|the ball in her mouth and strap the gag.)";
			else OveridenIntroText = "(She shuts her mouth to stop you but|you're able to push it and buckle it.)";
			PlayerRemoveInventory("Ballgag", 1);
			ActorAddInventory("Ballgag");
			if (C002_FirstClass_Amanda_CurrentStage == 160) C002_FirstClass_Amanda_CurrentStage = 170;
			else C002_FirstClass_Amanda_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = "She steps back and refuse to be gagged.|(You need 2 submission or more to gag Amanda.)";
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to cuff Amanda
	if ((C002_FirstClass_Amanda_CurrentStage >= 100) && (ClickedInv == "Cuffs") && (ActorHasInventory("Cuffs") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Rope"))) {
			if (ActorHasInventory("Rope")) { OveridenIntroText = "(You undo the ropes so she can get|dressed but you cuff her right after.)"; PlayerAddInventory("Rope", 1); ActorRemoveInventory("Rope"); }
			else if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = "(She bows her head, sits down and put|her arms behind her back to be cuffed.)";
			else OveridenIntroText = "(She pushes you but you're able|to pin her down to cuff her.)";
			PlayerRemoveInventory("Cuffs", 1);
			ActorAddInventory("Cuffs");
			C002_FirstClass_Amanda_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = "She pushes you back and refuses to be cuffed.|(You need 2 submission or more to cuff Amanda.)";
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to uncuff Amanda
	if ((C002_FirstClass_Amanda_CurrentStage >= 100) && (ClickedInv == "CuffsKey") && (ActorHasInventory("Cuffs") == true) && (Common_PlayerNotRestrained)) {
		OveridenIntroText = "(You unlock her cuffs|and she seems grateful.)";
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		C002_FirstClass_Amanda_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to rope Amanda
	if ((C002_FirstClass_Amanda_CurrentStage >= 100) && (ClickedInv == "Rope") && (ActorHasInventory("Rope") == false) && (Common_PlayerNotRestrained)) {
		if ((ActorGetValue(ActorSubmission) >= 2) || (ActorHasInventory("Cuffs"))) {
			if (ActorHasInventory("Cuffs")) { OveridenIntroText = "(You unlock the cuff, she strips,|and you do a full rope harness on her.)"; PlayerAddInventory("Cuffs", 1); ActorRemoveInventory("Cuffs"); }
			else if (ActorGetValue(ActorSubmission) >= 4) OveridenIntroText = "(She bows her head and strip, you|do a rope harness while she shivers.)";
			else OveridenIntroText = "(You fight with her to remove her clothes|then do a rope harness while she resists.)";
			PlayerRemoveInventory("Rope", 1);
			ActorAddInventory("Rope");
			C002_FirstClass_Amanda_CurrentStage = C002_FirstClass_Classroom_CalcStage();
		} else OveridenIntroText = "She pushes you back and refuses to be tied.|(You need 2 submission or more to tie up Amanda.)";
		CurrentTime = CurrentTime + 60000;
	}

	// If the player wants to crop Amanda
	if ((C002_FirstClass_Amanda_CurrentStage >= 100) && (ClickedInv == "Crop") && (Common_PlayerNotRestrained)) {
		if (ActorHasInventory("Ballgag")) OveridenIntroText = "(You hit Amanda a few times with your crop.|She starts to cry and seems to hate it.)";
		else OveridenIntroText = "(You hit Amanda a few times with your crop.)|Ow!  It hurts!  Why are you so mean?";
		if (C002_FirstClass_Amanda_CropDone == false) { C002_FirstClass_Amanda_CropDone = true; ActorChangeAttitude(-2, 0); }
		CurrentTime = CurrentTime + 60000;
	}
	
	// If the stage changed, we remove the overiden image, also check for the bondage hug
	if (EntryStage != C002_FirstClass_Amanda_CurrentStage) OveridenIntroImage = "";
	C002_FirstClass_Amanda_BondageHugReady = ((C002_FirstClass_Amanda_CurrentStage > 100) && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged) && (C002_FirstClass_Classroom_MildredSubdueSuccess) && (ActorSpecificHasInventory("Amanda", "Rope")) && (ActorSpecificHasInventory("Sarah", "Rope")));

}

// Chapter 2 - Amanda Ungag
function C002_FirstClass_Amanda_Ungag() {
	PlayerAddInventory("Ballgag", 1);
	ActorRemoveInventory("Ballgag");
}

// Chapter 2 - Amanda Untie
function C002_FirstClass_Amanda_Untie() {
	PlayerAddInventory("Rope", 1);
	ActorRemoveInventory("Rope");
}

// Chapter 2 - Amanda Tickle
function C002_FirstClass_Amanda_Tickle() {
	if (C002_FirstClass_Amanda_TickleDone == false) {
		C002_FirstClass_Amanda_TickleDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 2 - Amanda Bow Remark
function C002_FirstClass_Amanda_BowRemark() {
	C002_FirstClass_Amanda_BowRemarkReady = false;
}

// Chapter 2 - Amanda Subdue Remark
function C002_FirstClass_Amanda_SubdueRemark() {
	C002_FirstClass_Amanda_SubdueRemarkReady = false;
}

// Chapter 2 - Amanda Agrees to Help
function C002_FirstClass_Amanda_AgreeHelp() {
	C002_FirstClass_Classroom_AmandaAgree = true;
}

// Chapter 2 - Amanda Bondage Hug 
function C002_FirstClass_Amanda_BondageHug() {
	if (C002_FirstClass_Amanda_BondageHugDone == false) { C002_FirstClass_Amanda_BondageHugDone = true; ActorChangeAttitude(1, 0); }
}

// Chapter 2 - Amanda Separate from Sarah hug
function C002_FirstClass_Amanda_Separate() {
	OveridenIntroImage = "";
}

// Chapter 2 - Amanda Kiss Sarah
function C002_FirstClass_Amanda_KissSarah() {
	if (C002_FirstClass_Amanda_KissSarahDone == false) { C002_FirstClass_Amanda_KissSarahDone = true; ActorChangeAttitude(1, 0); }
}
