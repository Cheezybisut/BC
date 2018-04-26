var C101_KinbakuClub_RopeGroup_CurrentStage = 0;
var C101_KinbakuClub_RopeGroup_Random = 0;
var C101_KinbakuClub_RopeGroup_LucyOnRight = true;
var C101_KinbakuClub_RopeGroup_Kidnapper = false;
var C101_KinbakuClub_RopeGroup_PlayerIsGagged = false;
var C101_KinbakuClub_RopeGroup_IntroDone = false;
var C101_KinbakuClub_RopeGroup_LeftTwinReleased = false;
var C101_KinbakuClub_RopeGroup_RightTwinReleased = false;
var C101_KinbakuClub_RopeGroup_RightTwinKidnapped = false;
var C101_KinbakuClub_RopeGroup_2Twins = true;
var C101_KinbakuClub_RopeGroup_LucyFree = false;



// Calculates the scene parameters
function C101_KinbakuClub_RopeGroup_CalcParams() {
	C101_KinbakuClub_RopeGroup_PlayerIsGagged = Common_PlayerGagged;
	C101_KinbakuClub_RopeGroup_Kidnapper = C101_KinbakuClub_Erica_Kidnapper;
}


// Chapter 101 - RopeGroup Load
function C101_KinbakuClub_RopeGroup_Load() {

	// After intro player has a choice each time she goes to the group, until a twin is released
	if (C101_KinbakuClub_RopeGroup_CurrentStage > 100 && C101_KinbakuClub_RopeGroup_CurrentStage < 700) {
		C101_KinbakuClub_RopeGroup_CurrentStage = 100;
	}

	// Load the scene parameters
	if (C101_KinbakuClub_RopeGroup_CurrentStage < 100) {
		ActorLoad("Amelia", "ClubRoom1");
	} else ActorLoad("", "ClubRoom1");
	LoadInteractions();
	C101_KinbakuClub_RopeGroup_CalcParams();

	// Load correct CurrentStage if player is bound, gagged or not
	if (Common_PlayerGagged || Common_PlayerRestrained) {
		C101_KinbakuClub_RopeGroup_CurrentStage = 50;
	}
	if (C101_KinbakuClub_RopeGroup_CurrentStage == 50 && !Common_PlayerGagged && !Common_PlayerRestrained) {
		if (C101_KinbakuClub_RopeGroup_IntroDone) C101_KinbakuClub_RopeGroup_CurrentStage = 100;
		else C101_KinbakuClub_RopeGroup_CurrentStage = 10;
	}

	// Determine which twin is Lucy
	C101_KinbakuClub_RopeGroup_Random = Math.floor(Math.random() * 2);
	if (C101_KinbakuClub_RopeGroup_Random == 0)	C101_KinbakuClub_RopeGroup_LucyOnRight = false;

}

// Chapter 101 - RopeGroup Run
function C101_KinbakuClub_RopeGroup_Run() {
	BuildInteraction(C101_KinbakuClub_RopeGroup_CurrentStage);
	

	// changing images

	if (C101_KinbakuClub_RopeGroup_CurrentStage == 400) {
		//if (C101_KinbakuClub_RopeGroup_LeftTwinReleased) DrawImage(CurrentChapter + "/" + CurrentScreen + "/LeftFree.jpg", 600, 0);
		if (!C101_KinbakuClub_RopeGroup_LeftTwinReleased) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinLeftTied.jpg", 600, 0);
		//if (C101_KinbakuClub_RopeGroup_RightTwinReleased) DrawImage(CurrentChapter + "/" + CurrentScreen + "/RightFree.jpg", 890, 0);
		if (!C101_KinbakuClub_RopeGroup_RightTwinReleased && !C101_KinbakuClub_RopeGroup_RightTwinKidnapped) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinRightTied.jpg", 890, 0);
	}

	
}

// Chapter 101 - RopeGroup Click
function C101_KinbakuClub_RopeGroup_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C101_KinbakuClub_RopeGroup_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	C101_KinbakuClub_RopeGroup_CalcParams();

}




// Chapter 101 - RopeGroup - Introduction done
function C101_KinbakuClub_RopeGroup_Introduced() {
	C101_KinbakuClub_RopeGroup_IntroDone = true;
}

// Chapter 101 - RopeGroup - set actor to Amelia
function C101_KinbakuClub_RopeGroup_Amelia() {
	ActorLoad("Amelia", "ClubRoom1");
}

// Chapter 101 - RopeGroup - set actor to Charlotte
function C101_KinbakuClub_RopeGroup_Charlotte() {
	ActorLoad("Charlotte", "ClubRoom1");
}

// Chapter 101 - RopeGroup - set actor to Charlotte
function C101_KinbakuClub_RopeGroup_NoActor() {
	ActorLoad("", "ClubRoom1");
}

// Chapter 101 - RopeGroup - set actor to Charlotte
function C101_KinbakuClub_RopeGroup_Lucy() {
	ActorLoad("Lucy", "ClubRoom1");
}




// Chapter 101 - RopeGroup - kidnap the nearest twin
function C101_KinbakuClub_RopeGroup_Kidnap() {
	C101_KinbakuClub_RopeGroup_2Twins = false;
}

// Chapter 101 - RopeGroup - Release the twin on the left
function C101_KinbakuClub_RopeGroup_LeftTwinFree() {
	C101_KinbakuClub_RopeGroup_LeftTwinReleased = true;
	C101_KinbakuClub_RopeGroup_LeftTwinFree()
	C101_KinbakuClub_RopeGroup_2Twins = false;
	PlayerAddInventory("Blindfold", 1);
}

// Chapter 101 - RopeGroup - Release the twin on the right
function C101_KinbakuClub_RopeGroup_RightTwinFree() {
	C101_KinbakuClub_RopeGroup_RightTwinReleased = true;
	C101_KinbakuClub_RopeGroup_2Twins = false;
}

// Chapter 101 - RopeGroup - Released twin common
function C101_KinbakuClub_RopeGroup_RightTwin() {
	OverridenIntroImage = "RightTwin.jpg";
}

// Chapter 101 - RopeGroup - Talking to twin on the right
function C101_KinbakuClub_RopeGroup_RightTwin() {
	OverridenIntroImage = "RightTwin.jpg";
}

// Chapter 101 - RopeGroup - Finish talking to twin on the right
function C101_KinbakuClub_RopeGroup_CancelOverride() {
	OverridenIntroImage = "";
}