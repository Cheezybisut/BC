var C101_KinbakuClub_SlaveTwin_CurrentStage = 0;
var C101_KinbakuClub_SlaveTwin_KidnappedTwin = false;			// The Right Twin has been kidnapped and chained.

// Calculates the scene parameters
function C101_KinbakuClub_SlaveTwin_CalcParams() {
}

// Chapter 101 - SlaveTwin Load
function C101_KinbakuClub_SlaveTwin_Load() {
	ActorLoad(C101_KinbakuClub_RopeGroup_RightTwin, "ClubRoom4");

	LoadInteractions();

	if (C101_KinbakuClub_RopeGroup_RightTwinKidnapped && !C101_KinbakuClub_SlaveTwin_KidnappedTwin) {
		C101_KinbakuClub_SlaveTwin_KidnappedTwin = true;
		ActorAddInventory("Rope");
		ActorAddInventory("BallGag");
		LeaveIcon = "";
	}
	C101_KinbakuClub_SlaveTwin_CalcParams();
}

// Chapter 101 - SlaveTwin Run
function C101_KinbakuClub_SlaveTwin_Run() {
	BuildInteraction(C101_KinbakuClub_SlaveTwin_CurrentStage);

	// images overlays when slave is tied with aysmetric kinbaku
	if (C101_KinbakuClub_SlaveTwin_CurrentStage >= 10 && C101_KinbakuClub_SlaveTwin_CurrentStage <= 99) {
		if (ActorHasInventory("BallGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinRopeBallGag.png", 852, 59);
		if (ActorHasInventory("ClothGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinRopeClothGag.png", 830, 135);
		if (ActorHasInventory("TapeGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinRopeTapeGag.png", 865, 150);
	}
}

// Chapter 101 - SlaveTwin Click
function C101_KinbakuClub_SlaveTwin_Click() {

	// Regular and inventory interactions
	ClickInteraction(C101_KinbakuClub_SlaveTwin_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	ActorApplyRestrain(ClickInv);
	if (ActorIsGagged() && C101_KinbakuClub_SlaveTwin_CurrentStage == 20) C101_KinbakuClub_SlaveTwin_CurrentStage = 10;
	
	C101_KinbakuClub_SlaveTwin_CalcParams();
}

// Chapter 101 - SlaveTwin - Player can leave after twin is leashed.
function C101_KinbakuClub_SlaveTwin_CanLeave() {
	LeaveIcon = "Leave";
}

// Chapter 101 - SlaveTwin - remove the current slaves gag
function C101_KinbakuClub_SlaveTwin_RemoveGag() {
	ActorUngag();
}





// Chapter 101 - SlaveTwin - 
function C101_KinbakuClub_SlaveTwin_template() {
}