var C101_KinbakuClub_Slaves_CurrentStage = 0;
var C101_KinbakuClub_Slaves_ReadyForSlaves = false;
var C101_KinbakuClub_Slaves_Manacles = false;
var C101_KinbakuClub_Slaves_Padlocks = false;
var C101_KinbakuClub_Slaves_Rings = false;
var C101_KinbakuClub_Slaves_SelfSlaveAvailable = false;
var C101_KinbakuClub_Slaves_ReadyMessageDone = false;
var C101_KinbakuClub_Slaves_ChastityWarning = false;
var C101_KinbakuClub_Slaves_ManacleWarning = false;
var C101_KinbakuClub_Slaves_ManacleTime = 0;




// Calculates the scene parameters
function C101_KinbakuClub_Slaves_CalcParams() {
	C101_KinbakuClub_Slaves_PlayerIsRestrained = Common_PlayerRestrained;
	C101_KinbakuClub_Slaves_PlayerIsGagged = Common_PlayerGagged;
	C101_KinbakuClub_Slaves_SelfSlaveAvailable = Common_PlayerNotRestrained && C101_KinbakuClub_Slaves_ReadyForSlaves;
}


// Chapter 101 - Slaves Load
function C101_KinbakuClub_Slaves_Load() {

	// Bag stage starts at 0
	if (C101_KinbakuClub_Slaves_CurrentStage < 100) {
		C101_KinbakuClub_Slaves_CurrentStage = 0;
		ActorLoad("", "ClubRoom4");
		LeaveIcon = "";
	}

	// Player when a slave
	if ((C101_KinbakuClub_Slaves_CurrentStage > 100) && (C101_KinbakuClub_Slaves_CurrentStage < 200)) {
		ActorLoad("", "ClubRoom4");
		LeaveIcon = "Leave";
	}

	LoadInteractions();

	C101_KinbakuClub_Slaves_CalcParams()
}

// Chapter 101 - Slaves Run
function C101_KinbakuClub_Slaves_Run() {
	BuildInteraction(C101_KinbakuClub_Slaves_CurrentStage);
	
	if (C101_KinbakuClub_Slaves_CurrentStage == 100) {
		if (PlayerHasLockedInventory("BallGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/UnlockedCollarBallGag.jpg", 780, 130);
		if (PlayerHasLockedInventory("ClothGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/UnlockedCollarClothGag.jpg", 780, 130);
		if (PlayerHasLockedInventory("TapeGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/UnlockedCollarTapeGag.jpg", 780, 130);
	}
	if (C101_KinbakuClub_Slaves_CurrentStage == 110) {
		if (PlayerHasLockedInventory("BallGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/HalfwayBallGag.jpg", 840, 35);
		if (PlayerHasLockedInventory("ClothGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/HalfwayClothGag.jpg", 840, 35);
		if (PlayerHasLockedInventory("TapeGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/HalfwayTapeGag.jpg", 840, 35);
		if (PlayerHasLockedInventory("ChastityBelt")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/HalfwayChastityBelt.jpg", 825, 250);
	}
	if ((C101_KinbakuClub_Slaves_CurrentStage >= 120) && (C101_KinbakuClub_Slaves_CurrentStage < 200)) {
		if (C101_KinbakuClub_Slaves_CurrentStage >= 130) {
			DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesJennaNeutral.png", 870, 81);
			if (ActorGetValue(ActorSubmission) > 0) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesJennaDom.png", 870, 81);
			if (ActorGetValue(ActorSubmission) < -1) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesJennaSub.png", 870, 81);
		}
		if (PlayerHasLockedInventory("BallGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesBallGag.png", 875, 60);
		if (PlayerHasLockedInventory("ClothGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesClothGag.png", 870, 128);
		if (PlayerHasLockedInventory("TapeGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesTapeGag.png", 887, 130);
		if (PlayerHasLockedInventory("ChastityBelt")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesChastityBelt.png", 850, 330);
		if (C101_KinbakuClub_Slaves_CurrentStage >= 130) DrawImage(CurrentChapter + "/" + CurrentScreen + "/PlayerManaclesJenna.png", 945, 0);
	}
}

// Chapter 101 - Slaves Click
function C101_KinbakuClub_Slaves_Click() {

	// Regular and inventory interactions
	ClickInteraction(C101_KinbakuClub_Slaves_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	if ((C101_KinbakuClub_Slaves_CurrentStage == 100) || (C101_KinbakuClub_Slaves_CurrentStage == 110)) {
		if ((ClickInv == "BallGag") && !PlayerHasLockedInventory("BallGag")) {
			PlayerUngag();
			PlayerRemoveInventory("BallGag", 1);
			PlayerLockInventory("BallGag");
			OverridenIntroText = GetText("PlayerBallGag");
			CurrentTime = CurrentTime + 60000;
		}
		if ((ClickInv == "ClothGag") && !PlayerHasLockedInventory("ClothGag")) {
			PlayerUngag();
			PlayerRemoveInventory("ClothGag", 1);
			PlayerLockInventory("ClothGag");
			OverridenIntroText = GetText("PlayerClothGag");
			CurrentTime = CurrentTime + 60000;
		}
		if ((ClickInv == "TapeGag") && !PlayerHasLockedInventory("TapeGag")) {
			PlayerUngag();
			PlayerRemoveInventory("TapeGag", 1);
			PlayerLockInventory("TapeGag");
			OverridenIntroText = GetText("PlayerTapeGag");
			CurrentTime = CurrentTime + 60000;
		}
		if ((C101_KinbakuClub_Slaves_CurrentStage == 110) && (ClickInv == "ChastityBelt") && !PlayerHasLockedInventory("ChastityBelt")) {
			if (C101_KinbakuClub_Slaves_ChastityWarning) {
				PlayerRemoveInventory("ChastityBelt", 1);
				PlayerLockInventory("ChastityBelt");
				OverridenIntroText = GetText("PlayerChastityBelt2");
				CurrentTime = CurrentTime + 60000;
			} else {
				C101_KinbakuClub_Slaves_ChastityWarning = true;
				OverridenIntroText = GetText("PlayerChastityBelt1");
			}
		}
	}


	C101_KinbakuClub_Slaves_CalcParams();

}




// Chapter 101 - Slaves - Leaviing the bag stage
function C101_KinbakuClub_Slaves_Leave() {
	if (C101_KinbakuClub_Slaves_ReadyForSlaves && !C101_KinbakuClub_Slaves_ReadyMessageDone) {
		C101_KinbakuClub_Slaves_ReadyMessageDone = true;
		C101_KinbakuClub_Slaves_CurrentStage = 40
	}
	else SetScene(CurrentChapter, "ClubRoom4");
}

// Chapter 101 - Slaves - Player has inspected the manacles
function C101_KinbakuClub_Slaves_ManaclesCheck() {
	C101_KinbakuClub_Slaves_Manacles = true;
	if (C101_KinbakuClub_Slaves_Manacles && C101_KinbakuClub_Slaves_Padlocks && C101_KinbakuClub_Slaves_Rings) C101_KinbakuClub_Slaves_ReadyForSlaves = true;
}

// Chapter 101 - Slaves - Player has inspected the padlocks
function C101_KinbakuClub_Slaves_PadlocksCheck() {
	C101_KinbakuClub_Slaves_Padlocks = true;
	if (C101_KinbakuClub_Slaves_Manacles && C101_KinbakuClub_Slaves_Padlocks && C101_KinbakuClub_Slaves_Rings) C101_KinbakuClub_Slaves_ReadyForSlaves = true;
}

// Chapter 101 - Slaves - Player has inspected the wall rings
function C101_KinbakuClub_Slaves_RingsCheck() {
	C101_KinbakuClub_Slaves_Rings = true;
	if (C101_KinbakuClub_Slaves_Manacles && C101_KinbakuClub_Slaves_Padlocks && C101_KinbakuClub_Slaves_Rings) C101_KinbakuClub_Slaves_ReadyForSlaves = true;
}

// Chapter 101 - Slaves - Player padlocks the neck manacle on and to the wall.
function C101_KinbakuClub_Slaves_NeckManacle() {
	PlayerLockInventory("Manacles");
}

// Chapter 101 - Slaves - Player removes their gag.
function C101_KinbakuClub_Slaves_PlayerRemoveGag() {
	PlayerUngag();
}

// Chapter 101 - Slaves - Player padlocks the ankle and wrist manacles.
function C101_KinbakuClub_Slaves_FullManacle() {
	if (C101_KinbakuClub_Slaves_ManacleWarning) {
		C101_KinbakuClub_Slaves_CurrentStage = 120;
		OverridenIntroText = GetText("LockAllManacles");
		LeaveIcon = "Leave";
	}
	C101_KinbakuClub_Slaves_ManacleWarning = true;
}

// Chapter 101 - Slaves - Player spends time exploring their predicament.
function C101_KinbakuClub_Slaves_ExploreManacles() {
	C101_KinbakuClub_Slaves_ManacleTime++
	CurrentTime = CurrentTime + 30000;
}

// Chapter 101 - Slaves - Player waits in manacles, Jenna may appear
function C101_KinbakuClub_Slaves_WaitJenna() {
	C101_KinbakuClub_Slaves_ExploreManacles();
	if (C101_KinbakuClub_Slaves_ManacleTime > 4) {
		C101_KinbakuClub_Slaves_CurrentStage = 130;
		ActorLoad("Jenna", "ClubRoom4");
		OverridenIntroText = GetText("JennaAppears");
		LeaveIcon = "";
	}
}