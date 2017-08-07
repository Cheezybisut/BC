var C006_Isolation_Mildred_CurrentStage = 0;
var C006_Isolation_Mildred_CropCount = 0;
var C006_Isolation_Mildred_CropMaxCount = 0;

// Chapter 6 - Mildred Load
function C006_Isolation_Mildred_Load() {

	// Load the scene parameters
	StartTimer(11.5 * 60 * 60 * 1000, CurrentChapter, "Outro");
	ActorLoad("Mildred", "IsolationRoom");
	LoadInteractions();
	LeaveIcon = "";

}

// Chapter 6 - Mildred Run
function C006_Isolation_Mildred_Run() {
	BuildInteraction(C006_Isolation_Mildred_CurrentStage);
}

// Chapter 6 - Mildred Click
function C006_Isolation_Mildred_Click() {	
	ClickInteraction(C006_Isolation_Mildred_CurrentStage);
}

// Chapter 6 - Mildred Steal Items
function C006_Isolation_Mildred_StealItems() {
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
}

// Chapter 6 - Mildred Add Collar
function C006_Isolation_Mildred_AddCollar() {
	PlayerLockInventory("Collar");
}

// Chapter 6 - Mildred Add Rope
function C006_Isolation_Mildred_AddRope() {
	PlayerClothes("Underwear");
	PlayerLockInventory("Rope");
}

// Chapter 6 - Mildred Add Gag
function C006_Isolation_Mildred_AddGag() {
	PlayerLockInventory("Ballgag");
}

// Chapter 6 - Mildred Release
function C006_Isolation_Mildred_Release() {
	PlayerUnlockInventory("Collar");
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("Ballgag");
}

// Chapter 6 - Mildred Leave Isolation
function C006_Isolation_Mildred_LeaveIsolation() {
	C006_Isolation_Outro_EarlyRelease = true;
	SetScene(CurrentChapter, "Outro");	
}

// Chapter 6 - Mildred Allow Leave
function C006_Isolation_Mildred_AllowLeave() {
	LeaveIcon = "Leave";
}

// Chapter 6 - Mildred, if she doesn't like the player, she crops
function C006_Isolation_Mildred_CheckForCrop() {	
	if (ActorGetValue(ActorLove) <= -3) {
		OveridenIntroText = "If isolation doesn't teach you, my crop will.|(She pushes you on a triangular wooden frame.)";
		C006_Isolation_Mildred_CurrentStage = 300;
		C006_Isolation_Mildred_CropMaxCount = ActorGetValue(ActorLove) * -2;
		if (C006_Isolation_Mildred_CropMaxCount > 12) C006_Isolation_Mildred_CropMaxCount = 12;
	} else {
		if (ActorGetValue(ActorSubmission) <= -3) {
			OveridenIntroText = "Before isolation, a sub like you should feel pain.|(She pushes you on a triangular wooden frame.)";
			C006_Isolation_Mildred_CurrentStage = 300;
			C006_Isolation_Mildred_CropMaxCount = ActorGetValue(ActorSubmission) * -2;
			if (C006_Isolation_Mildred_CropMaxCount > 12) C006_Isolation_Mildred_CropMaxCount = 12;
		}
	}
}

// Chapter 6 - Mildred, crop the player
function C006_Isolation_Mildred_DoCrop() {
	
	// If there's still cropping to be done
	if (C006_Isolation_Mildred_CropCount < C006_Isolation_Mildred_CropMaxCount) {
		
		// The text is random
		C006_Isolation_Mildred_CropCount++;
		var P = Math.floor(Math.random() * 6);
		if (P == 0)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She does a quick lash|on your back from left to right.)";
		if (P == 1)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She lands a really|strong one right on your butt.)";
		if (P == 2)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She strikes a light one on|your breast, barely hitting a nipple.)";
		if (P == 3)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She hits you on your|bounds arms, making you struggle.)";
		if (P == 4)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She swings right on your|tummy.  Making you lose your breath.)";		
		if (P == 5)	OveridenIntroText = NumberToText(C006_Isolation_Mildred_CropCount) + " !  (She smacks a harsh one|on your thigh.  Making a loud noise.)";

		// The image rotates
		OveridenIntroImage = "MildredPlayerHorseCrop" + (C006_Isolation_Mildred_CropCount % 3).toString() + ".jpg";
		
	} else {
		OveridenIntroText = "That's enough.  (She stops.)|So have you learned a lesson?";
		C006_Isolation_Mildred_CurrentStage = 330;
		OveridenIntroImage = "";
	}
	
}