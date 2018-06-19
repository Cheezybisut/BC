var C012_AfterClass_Sidney_CurrentStage = 0;
var C012_AfterClass_Sidney_IntroText = "";

// In her shorts, Sidney can have many poses when she talks
function C012_AfterClass_Sidney_SetPose() {
	if (ActorGetValue(ActorCloth) == "Shorts") {
		var Love = ActorGetValue(ActorLove);
		var Sub = ActorGetValue(ActorSubmission);	
		if ((Sub <= -10) && (Math.abs(Sub) >= Math.abs(Love))) ActorSetPose("Point");
		if ((Sub >= 10) && (Math.abs(Sub) >= Math.abs(Love))) ActorSetPose("Shy");
		if ((Love >= 10) && (Math.abs(Love) >= Math.abs(Sub))) ActorSetPose("Happy");
		if ((Love <= -10) && (Math.abs(Love) >= Math.abs(Sub))) ActorSetPose("Mad");
	} else ActorSetPose("");
}

// Chapter 12 After Class - Sidney Load
function C012_AfterClass_Sidney_Load() {
	
	// Loads the scene to search in the wardrobe
	LoadInteractions();
	ActorLoad("Sidney", "Leave");
	LeaveScreen = "Dorm";
	C012_AfterClass_Sidney_CurrentStage = 0;
	C012_AfterClass_Sidney_SetPose();
	
	// Loads the previous text if needed
	if (C012_AfterClass_Sidney_IntroText != "") {
		OverridenIntroText = C012_AfterClass_Sidney_IntroText;
		C012_AfterClass_Sidney_IntroText = "";
	}

}

// Chapter 12 After Class - Sidney Run
function C012_AfterClass_Sidney_Run() {
	BuildInteraction(C012_AfterClass_Sidney_CurrentStage);
	DrawInteractionActor();
	if ((C012_AfterClass_Sidney_CurrentStage >= 340) && (C012_AfterClass_Sidney_CurrentStage < 400)) DrawActor("Player", 600, 100, 1);
}

// Chapter 12 After Class - Sidney Click
function C012_AfterClass_Sidney_Click() {

	// Regular interactions
	ClickInteraction(C012_AfterClass_Sidney_CurrentStage);

	// The player can click on herself in most stages
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C012_AfterClass_Sidney_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

}

// Chapter 12 After Class - Sidney can make love with the player if (Love + seduction * 2) >= 12 or >= 25 on the next time or Sidney is the player girlfriend/submissive
function C012_AfterClass_Sidney_GaggedAnswer() {
	var GagTalk = Math.floor(Math.random() * 5) + 1;
	OverridenIntroText = GetText("GaggedAnswer" + GagTalk.toString());
}

// Chapter 12 After Class - Sidney can make love with the player if (Love + seduction * 2) >= 12 or >= 25 on the next time or Sidney is the player girlfriend/submissive
function C012_AfterClass_Sidney_TestLove() {
	if (!ActorIsGagged()) {
		var LoveChance = ActorGetValue(ActorLove) + PlayerGetSkillLevel("Seduction") * 2;
		if (((LoveChance >= 12) && !GameLogQuery(CurrentChapter, "Sidney", "EnterDormFromPub")) || (LoveChance >= 25) || Common_ActorIsLover || Common_ActorIsOwned) {
			C012_AfterClass_Sidney_CurrentStage = 100;
		}		
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Sidney can be dominated at +20 submission
function C012_AfterClass_Sidney_TestDomme() {
	if (!ActorIsGagged()) {
		if (ActorGetValue(ActorSubmission) >= 20) {
			C012_AfterClass_Sidney_CurrentStage = 200;
		}
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Sidney can become the player Mistress at -20 submission
function C012_AfterClass_Sidney_TestSub() {
	if (!ActorIsGagged()) {
		if (ActorGetValue(ActorSubmission) <= -20) {
			C012_AfterClass_Sidney_CurrentStage = 300;
			OverridenIntroText = "";
		}
	} else C012_AfterClass_Sidney_GaggedAnswer();
}

// Chapter 12 After Class - Tests if the player can submit (no restrains first)
function C012_AfterClass_Sidney_TestSubmit() {
	if (Common_PlayerOwner != "") {
		OverridenIntroText = GetText("AlreadyOwned");
	} else {
		if (ActorIsRestrained()) {
			OverridenIntroText = GetText("UnrestrainFirst");
		} else {
			if (ActorIsChaste()) {
				OverridenIntroText = GetText("UnchasteFirst");
			} else {
				if (PlayerHasLockedInventory("Collar")) {
					OverridenIntroText = GetText("PlayerUncollarFirst");					
				} else {					
					if (Common_PlayerRestrained) {
						OverridenIntroText = GetText("PlayerUnrestrainFirst");
					} else {
						if (Common_PlayerNaked) {
							OverridenIntroText = GetText("GetOnYourKnees");
							C012_AfterClass_Sidney_PlayerStrip();
							C012_AfterClass_Sidney_CurrentStage = 340;
						} else {
							C012_AfterClass_Sidney_CurrentStage = 330;						
						}
					}					
				}
			}
		}
	}
}

// Chapter 12 After Class - The player can strip for Sidney
function C012_AfterClass_Sidney_PlayerStrip() {
	ActorSetPose("");
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
}

// Chapter 12 After Class - The player can strip for Sidney
function C012_AfterClass_Sidney_KneelForSidney() {
	Common_PlayerPose = "BackKneel";
}

// Chapter 12 After Class - When the player gets collared
function C012_AfterClass_Sidney_PlayerCollared() {
	LeaveIcon = "";
	Common_PlayerOwner = CurrentActor;
	Common_ActorIsOwner = true;
	PlayerLockInventory("Collar");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 12 After Class - When the player gets collared
function C012_AfterClass_Sidney_PlayerStandUp() {
	Common_PlayerPose = "";
	LeaveIcon = "Leave";
}