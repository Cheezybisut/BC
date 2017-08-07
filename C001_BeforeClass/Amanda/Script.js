var C001_BeforeClass_Amanda_CurrentStage = 0;
var C001_BeforeClass_Amanda_BackupStage = 0;
var C001_BeforeClass_Amanda_Kiss_Done = false;
var C001_BeforeClass_Amanda_Spank_Done = false;
var C001_BeforeClass_Amanda_Strip_Done = false;
var C001_BeforeClass_Amanda_ForceKiss_Done = false;
var C001_BeforeClass_Amanda_Tickle_Done = false;
var C001_BeforeClass_Amanda_SidneyInBondage = false;
var C001_BeforeClass_Amanda_BondageNotConfronted = true;
var C001_BeforeClass_Amanda_StopRopeSubAllowed = true;

// Chapter 1 - Amanda Load
function C001_BeforeClass_Amanda_Load() {

	// Load the scene parameters
	ActorLoad("Amanda", "Classroom");
	LoadInteractions();
	C001_BeforeClass_Amanda_SidneyInBondage = ActorSpecificHasInventory("Sidney", "Rope");

	// She dresses back automatically if not tied up, she comes back to face if she's tied up
	if (C001_BeforeClass_Amanda_CurrentStage == 220) C001_BeforeClass_Amanda_CurrentStage = 200;
	if ((C001_BeforeClass_Amanda_CurrentStage >= 240) && (C001_BeforeClass_Amanda_CurrentStage <= 269)) C001_BeforeClass_Amanda_CurrentStage = 230;
	
}

// Chapter 1 - Amanda Run
function C001_BeforeClass_Amanda_Run() {
	BuildInteraction(C001_BeforeClass_Amanda_CurrentStage);
}

// Chapter 1 - Amanda Click
function C001_BeforeClass_Amanda_Click() {	

	// Regular interactions
	ClickInteraction(C001_BeforeClass_Amanda_CurrentStage);
	
	// Special code for when the user wants to use the rope
	if ((C001_BeforeClass_Amanda_CurrentStage < 200) && (GetClickedInventory() == "Rope")) {
		C001_BeforeClass_Amanda_BackupStage = C001_BeforeClass_Amanda_CurrentStage;
		C001_BeforeClass_Amanda_CurrentStage = 200;
		OveridenIntroText = "Why do you carry ropes in a classroom?|(You need +2 submission to dominate Amanda.)"
	}
	
}

// Chapter 1 - Amanda Tie
function C001_BeforeClass_Amanda_Tie() {
	ActorAddInventory("Rope");
	PlayerRemoveInventory("Rope", 1);
}

// Chapter 1 - Amanda Untie
function C001_BeforeClass_Amanda_Untie() {
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
}

// Chapter 1 - Amanda Stop Rope
function C001_BeforeClass_Amanda_StopRope() {
	C001_BeforeClass_Amanda_CurrentStage = C001_BeforeClass_Amanda_BackupStage;
}

// Chapter 1 - Amanda Stop in a submissive fashion
function C001_BeforeClass_Amanda_StopRopeSub() {
	C001_BeforeClass_Amanda_StopRopeSubAllowed = false;
	C001_BeforeClass_Amanda_CurrentStage = C001_BeforeClass_Amanda_BackupStage;
}

// Chapter 1 - Amanda Confront Bondage
function C001_BeforeClass_Amanda_ConfrontBondage() {
	C001_BeforeClass_Amanda_BondageNotConfronted = false;
}

// Chapter 1 - Amanda Kiss
function C001_BeforeClass_Amanda_Kiss() {
	if (C001_BeforeClass_Amanda_Kiss_Done == false) {
		C001_BeforeClass_Amanda_Kiss_Done = true;
		ActorChangeAttitude(1, 0);
		OveridenIntroText = "(You kiss her on the lips and she doesn't resist.)|Ooooh!  You're a good kisser. (She blushes.)";
	}
}

// Chapter 1 - Amanda Force Kiss
function C001_BeforeClass_Amanda_ForceKiss() {
	if (C001_BeforeClass_Amanda_ForceKiss_Done == false) {
		C001_BeforeClass_Amanda_ForceKiss_Done = true;
		ActorChangeAttitude(-1, 0);
		OveridenIntroText = "(You force them to kiss, Amanda seems disguted.)|Eew, piggy breath!  Oops, sorry I said that.";
	}
}

// Chapter 1 - Amanda Spank
function C001_BeforeClass_Amanda_Spank() {
	if (C001_BeforeClass_Amanda_Spank_Done == false) {
		C001_BeforeClass_Amanda_Spank_Done = true;
		ActorChangeAttitude(-1, 1);
		OveridenIntroText = "(You spank her in front of the giggling students.)|Ouch!  Oh god!  This is so humiliating.";
	}
}

// Chapter 1 - Amanda Strip
function C001_BeforeClass_Amanda_Strip() {
	if (C001_BeforeClass_Amanda_Strip_Done == false) {
		C001_BeforeClass_Amanda_Strip_Done = true;
		ActorChangeAttitude(-1, 0);
		OveridenIntroText = "Hey!  Don't do that!  Let me go!|(She tries to defend herself but fails.)";
	}
}

// Chapter 1 - Amanda Tickle
function C001_BeforeClass_Amanda_Tickle() {
	if (C001_BeforeClass_Amanda_Tickle_Done == false) {
		C001_BeforeClass_Amanda_Tickle_Done = true;
		ActorChangeAttitude(1, 0);
	}
}